import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-6 bg-slate-950 border-t border-white/5 text-slate-500 text-center">
            <div className="container mx-auto">
                <div className="text-2xl font-black text-white mb-6">
                    Dev<span className="text-primary italic">Port</span>
                </div>

                <div className="flex justify-center gap-6 mb-8">
                    {[
                        { icon: <Github size={20} />, link: 'https://github.com/waqas-codes' },
                        { icon: <Twitter size={20} />, link: '#' },
                        { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/waqas-khan-433a5430b/' },
                        { icon: <Instagram size={20} />, link: '#' },
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <p className="text-sm">
                    © {new Date().getFullYear()} devportfolio. Built with <span className="text-red-500">❤️</span> using MERN stack & GSAP.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
