import { CircleArrowUp, LucideArrowBigUpDash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ScrollButton = () => {
    const [btnVisible, setBtnVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setBtnVisible(true)
            }else{
                setBtnVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [])

    const goToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
            <>
            {
                btnVisible &&
                <button className="fixed bottom-20 right-4 z-50 p-2 rounded bg-[#000000d3] text-primary border  shadow-lg hover:bg-primary hover:text-black transition-all duration-300" onClick={goToTop}>
                    <LucideArrowBigUpDash size={35}/>
                </button>
            }
            </>
    );
};

export default ScrollButton;