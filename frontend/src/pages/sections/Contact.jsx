import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../../components/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import api from '../../utils/api';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all fields.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await api.post('/messages', formData);
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {status.message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-medium">{status.message}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white"
                        placeholder="Steve Jobs"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white"
                        placeholder="steve@apple.com"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors resize-none text-white"
                    placeholder="I want to build the next big thing..."
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message <Send size={20} />
                    </>
                )}
            </button>
        </form>
    );
};

const Contact = () => {
    const sectionRef = useRef(null);
    useScrollReveal(sectionRef);

    return (
        <section id="contact" ref={sectionRef} className="py-24 px-6 bg-slate-950 text-white overflow-hidden relative">
            {/* Decorative spheres */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-5xl font-black mb-6">Let's build <br /><span className="text-primary tracking-tight italic">something great.</span></h2>
                        <p className="text-slate-400 text-xl max-w-md mb-12">
                            Have a project in mind? Reach out and let's discuss how I can help you achieve your digital goals.
                        </p>

                        <div className="space-y-8">
                            {[
                                {
                                    icon: <Mail />,
                                    title: 'Email Me',
                                    value: 'muhammadwaqas96846@gmail.com',
                                    href: 'mailto:muhammadwaqas96846@gmail.com'
                                },
                                {
                                    icon: <Phone />,
                                    title: 'Call Me',
                                    value: '+92 3306791780',
                                    href: 'tel:+923306791780'
                                },
                                {
                                    icon: <MapPin />,
                                    title: 'Location',
                                    value: 'university town peshawar',
                                    href: 'https://www.google.com/maps/search/?api=1&query=university+town+peshawar',
                                    target: '_blank',
                                    rel: 'noopener noreferrer'
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                                        <div className="text-primary">{item.icon}</div>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-500 text-sm font-medium">{item.title}</h4>
                                        <p className="text-xl font-bold">
                                            <a href={item.href} target={item.target} rel={item.rel}>
                                                {item.value}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
