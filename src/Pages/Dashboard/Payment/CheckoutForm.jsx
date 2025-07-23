import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaTag, FaEnvelope, FaCalendarAlt, FaClock, FaMoneyBill } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    axiosSecure.get(`/bookings/${id}`).then(res => {
      setBooking(res.data);
      setDiscountedPrice(res.data.price);
    });
  }, [id, axiosSecure]);

  const handleCouponApply = async () => {
    if (!coupon) return;
    try {
      const res = await axiosSecure.post('/validate-coupon', { code: coupon });

      if (res.data.valid) {
        const percentage = res.data.discountAmount;
        const discountTk = (booking.price * percentage) / 100;

        setDiscountAmount(percentage);
        setDiscountedPrice(booking.price - discountTk);
        setCouponApplied(true);
        toast.success(`Coupon applied! You got ${percentage}% off`);
      } else {
        toast.error('Invalid coupon code');
      }
    } catch (err) {
      toast.error('Failed to apply coupon');
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (discountedPrice <= 0) {
    toast.error('Final price is zero or less due to discount. Payment cannot be processed.');
    return;
    }


    setIsProcessing(true);

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      setIsProcessing(false);
      return;
    }

    try {
      const finalPrice = discountedPrice ?? booking.price; // ✅ fallback to original price
      console.log("Submitting payment for price:", finalPrice);

      const res = await axiosSecure.post('/create-payment-intent', {
        price: finalPrice,
      });

      const confirm = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirm.paymentIntent.status === 'succeeded') {
        const paymentInfo = {
          bookingId: booking._id,
          email: booking.userEmail,
          price: finalPrice,
          transactionId: confirm.paymentIntent.id,
          date: new Date(),
        };

        await axiosSecure.post('/payments', paymentInfo);

        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your booking is now confirmed.',
          confirmButtonColor: '#22c55e',
          timer: 1500,
        });

        navigate('/dashboard/confirmed-bookings');
      }
    } catch (err) {
      console.log(err);
      toast.error('Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!booking) return <p className="text-center py-10 text-gray-400">Loading booking info...</p>;

  return (
    <div className="max-w-xl mx-auto bg-black p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center"><span className='not-italic'>💳</span> Payment Form</h2>
      {couponApplied && (
        <p className="text-green-400 text-sm text-center mb-2">
          You saved {discountAmount}% with this coupon!
        </p>
      )}

      {/* Coupon Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
        <div className="md:col-span-2">
          <label className="label text-gray-300 font-medium flex items-center gap-2">
            <FaTag /> Coupon Code
          </label>
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="input input-bordered w-full"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div>
        <button
          onClick={handleCouponApply}
          className="btn bg-primary text-black"
        >Apply</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label text-gray-300 font-medium flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input type="email" value={booking.userEmail} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
          </div>
          <div>
            <label className="label text-gray-300 font-medium flex items-center gap-2">
              <FaTag /> Court Type
            </label>
            <input type="text" value={booking.courtType} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label text-gray-300 font-medium flex items-center gap-2">
              <FaCalendarAlt /> Booking Date
            </label>
            <input type="text" value={booking.date} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
          </div>
          <div>
            <label className="label text-gray-300 font-medium flex items-center gap-2">
              <FaClock /> Selected Slots
            </label>
            <input type="text" value={booking.slots.join(', ')} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
          </div>
        </div>

        <div>
          <label className="label text-gray-300 font-medium flex items-center gap-2">
            <FaMoneyBill /> Total Price
            {couponApplied && (
              <span className="line-through text-gray-400 ml-2">৳{booking.price}</span>
            )}
          </label>
          <div className="flex items-center gap-4">
            <input type="text" value={`৳${discountedPrice ?? booking.price}`} readOnly className="input input-bordered w-full bg-primary text-black font-bold" />
          </div>
        </div>

        <div>
          <label className="label text-gray-300 font-medium">Card Info</label>
          <div className="border p-3 rounded-md bg-white">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-green-500 hover:bg-green-600 text-white w-full"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
