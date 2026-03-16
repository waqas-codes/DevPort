import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <SEO
                title="Home"
                description="Professional MERN Stack Developer Portfolio showcasing high-quality web applications and technical expertise."
            />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
};

export default Home;
