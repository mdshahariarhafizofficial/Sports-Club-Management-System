export default function Newsletter() {
  return (
    <section className="w-full bg-primary py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Stay Updated with <span className="text-white">Sportiva</span>
        </h2>
        <p className="text-black/80 mb-8 max-w-2xl mx-auto text-lg">
          Subscribe to our newsletter and never miss updates about new courts,
          special offers, and events from our Sports Club.
        </p>

        {/* Input Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-5 py-3 rounded-2xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-black text-black"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-black text-[#ffe733] font-semibold shadow-lg hover:bg-gray-900 transition-all"
          >
            Subscribe
          </button>
        </form>

        {/* Extra Note */}
        <p className="text-sm text-black/70 mt-6">
          We respect your privacy. No spam, only updates.
        </p>
      </div>
    </section>
  );
}
