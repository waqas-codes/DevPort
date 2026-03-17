import React, { useRef, useEffect } from 'react';
import { User, Target, Zap, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import profileImg from '../../assets/profile.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    useScrollReveal(sectionRef);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                },
                x: -100,
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 px-6 bg-white dark:bg-slate-950">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 relative group flex justify-center" ref={imageRef}>
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition duration-500 max-w-sm mx-auto w-full"></div>
                        <div className="relative w-full max-w-sm aspect-square md:aspect-video lg:aspect-[4/5] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="w-12 h-1 bg-primary"></span> About Me
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            Hello, I'm Mr. Waqas, a full-stack web developer specializing in creating responsive and user-friendly web applications. I excel at building intuitive interfaces and robust backend solutions, turning ideas into scalable digital experiences.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: <User className="text-primary" />, title: 'Reliable', desc: 'Consistency in every commit.' },
                                { icon: <Target className="text-secondary" />, title: 'Driven', desc: 'Focus on project goals.' },
                                { icon: <Zap className="text-accent" />, title: 'Efficient', desc: 'High performance code.' },
                                { icon: <Sparkles className="text-blue-500" />, title: 'Creative', desc: 'Unique UI solutions.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group">
                                    <div className="w-12 h-12 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
