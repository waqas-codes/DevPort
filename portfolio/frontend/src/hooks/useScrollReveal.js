import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (ref, options = {}) => {
    useEffect(() => {
        const el = ref.current;

        const ctx = gsap.context(() => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    ...options.scrollTrigger
                },
                y: options.y || 50,
                opacity: 0,
                duration: options.duration || 1,
                ease: options.ease || "power3.out",
                delay: options.delay || 0,
                ...options
            });
        }, ref);

        return () => ctx.revert();
    }, [ref, options]);
};
