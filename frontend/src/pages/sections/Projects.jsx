import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Code, ArrowRight } from 'lucide-react';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/Button';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const [proj, setProj] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProj(res.data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };
        fetchProjects();

        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-24 px-6 bg-white dark:bg-slate-950">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Work</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            A selection of my best projects, combining clean code with intuitive UI/UX design.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex" href="https://github.com/waqas-codes?tab=repositories" target="_blank">
                        View All on Github <Github size={18} />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {proj.map((project, i) => (
                        <div key={project._id || i} className="project-card group flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image && project.image !== 'no-image.jpg' ? project.image : 'https://via.placeholder.com/600x400?text=No+Image'}
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(project.techStack || []).map((t, idx) => (
                                        <span key={idx} className="text-[10px] uppercase tracking-wider font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 truncate">{project.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">{project.description}</p>
                                <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                                    {project.liveLink ? (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary transition-colors group/link">
                                            Live Demo <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    ) : project.githubLink ? (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary transition-colors group/link">
                                            View Code <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    ) : (
                                        <span className="text-slate-400 text-sm">No links available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
