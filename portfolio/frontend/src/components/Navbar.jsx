import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Moon, Sun } from 'lucide-react';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: 'hero' },
        { name: 'About', path: 'about' },
        { name: 'Skills', path: 'skills' },
        { name: 'Projects', path: 'projects' },
        { name: 'Contact', path: 'contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Dev<span className="text-primary italic">Port</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.path)}
                            className="text-slate-600 dark:text-slate-300 hover:text-primary font-bold transition-colors cursor-pointer"
                        >
                            {link.name}
                        </button>
                    ))}
                    <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-8">
                        <ThemeToggle />
                        <a href="https://github.com/waqas-codes" target="_blank" rel="noreferrer">
                            <Button variant="primary" className="!py-2">
                                <Github size={18} /> Github
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button className="text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shadow-xl py-6 px-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.path)}
                            className="text-left text-lg font-bold text-slate-900 dark:text-white hover:text-primary transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                    <Button variant="primary" className="w-full">
                        <Github size={18} /> Github
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
