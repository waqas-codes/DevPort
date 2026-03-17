import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Code } from 'lucide-react';
import Button from '../../components/Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline();

            tl.from('.line-reveal', {
                width: 0,
                duration: 1.5,
                stagger: 0.8,
                ease: 'power2.inOut',
                clearProps: "width"
            })
                .from(subRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: 'power4.out',
                }, "-=0.5")
                .from('.hero-btn', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                }, "-=0.8");

            // Scroll Paralax for decorative elements
            gsap.to('.hero-blob', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                },
                y: 200,
                rotate: 45
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" ref={sectionRef} className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            {/* Decorative elements */}
            <div className="hero-blob absolute top-1/4 -left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
            <div className="hero-blob absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-[120px] opacity-20 animate-pulse delay-1000 pointer-events-none"></div>

            <div className="container mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6 border border-blue-200 dark:border-blue-800 animate-bounce">
                    <Sparkles size={16} /> Now available for freelance work
                </div>

                <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight mb-8 flex flex-col items-center">
                    <div className="line-reveal overflow-hidden whitespace-nowrap italic px-2 w-fit">
                        Hi, I'm Waqas
                    </div>
                    <div className="line-reveal overflow-hidden whitespace-nowrap text-2xl sm:text-4xl md:text-6xl lg:text-7xl px-2 w-fit">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            A Passionate MERN Stack Dev
                        </span>
                    </div>
                </h1>

                <p ref={subRef} className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12">
                    I'm a Full Stack Developer specialized in building exceptional MERN applications with professional animations and clean architecture.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" className="hero-btn h-14 px-8 text-lg" href="/resume.pdf" download="Resume.pdf">
                        Download Resume <ArrowRight size={20} />
                    </Button>
                    <Button variant="secondary" className="hero-btn h-14 px-8 text-lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        <Code size={20} /> View Projects
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
