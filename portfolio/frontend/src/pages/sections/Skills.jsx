import React, { useEffect, useRef, useState } from 'react';
import { Target } from 'lucide-react';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);
    const [fetchedSkills, setFetchedSkills] = useState([]);

    useEffect(() => {
        const getSkills = async () => {
            try {
                const res = await axios.get('/api/skills');
                setFetchedSkills(res.data);
            } catch (err) {
                console.error("Failed to fetch skills:", err);
            }
        };
        getSkills();
    }, []);

    useEffect(() => {
        if (fetchedSkills.length === 0) return;
        const ctx = gsap.context(() => {
            // Staggered cards reveal
            gsap.from(".skill-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Progress bars animation
            gsap.from(".progress-bar", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                width: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "expo.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [fetchedSkills]);

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const getLevelPercent = (level) => {
        switch (level) {
            case 'Beginner': return '25%';
            case 'Intermediate': return '50%';
            case 'Advanced': return '75%';
            case 'Professional': return '100%';
            default: return '50%';
        }
    };

    const skillCategories = chunkArray(fetchedSkills, 4).map((chunk, i) => ({
        title: `Skill Set ${i + 1}`,
        icon: <Target className="text-primary" />,
        skills: chunk.map(s => ({
            name: s.name,
            level: getLevelPercent(s.level)
        }))
    }));

    return (
        <section id="skills" ref={sectionRef} className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Expertise</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        I've mastered a diverse set of technologies to build high-quality web solutions.
                    </p>
                </div>

                {fetchedSkills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skillCategories.map((cat, i) => (
                            <div key={i} className="skill-card bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 opacity-100">
                                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">{cat.title}</h3>
                                <div className="space-y-4">
                                    {cat.skills.map((skill, j) => (
                                        <div key={j}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="progress-bar h-full bg-primary rounded-full transition-none"
                                                    style={{ width: skill.level }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-500 py-10">Loading skills...</div>
                )}
            </div>
        </section>
    );
};

export default Skills;

