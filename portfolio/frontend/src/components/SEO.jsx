import React, { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
    useEffect(() => {
        document.title = title ? `${title} | DevPort Portfolio` : 'DevPort | Full Stack Developer';

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Professional MERN Stack Developer Portfolio');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description || 'Professional MERN Stack Developer Portfolio';
            document.head.appendChild(meta);
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords || 'MERN, React, Node.js, Web Development, Portfolio');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = keywords || 'MERN, React, Node.js, Web Development, Portfolio';
            document.head.appendChild(meta);
        }
    }, [title, description, keywords]);

    return null;
};

export default SEO;
