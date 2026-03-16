import React from 'react';

const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
    const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 active:scale-95 shadow-lg flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-blue-600 shadow-blue-200/50 hover:shadow-blue-300/50 cursor-pointer",
        secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-slate-200/50 cursor-pointer",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-none hover:shadow-blue-200/50 cursor-pointer",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none hover:shadow-none cursor-pointer"
    };

    if (href) {
        return (
            <a
                href={href}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
