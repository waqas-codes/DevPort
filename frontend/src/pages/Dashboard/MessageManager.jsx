import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, Mail, Calendar, User, Eye, X } from 'lucide-react';

const MessageManager = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setError(null);
            const res = await axios.get('/api/messages');
            setMessages(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to fetch messages. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            try {
                setError(null);
                await axios.delete(`/api/messages/${id}`);
                fetchMessages();
                setSelectedMessage(null);
            } catch (err) {
                console.error('Error deleting message:', err);
                setError('Failed to delete message.');
            }
        }
    };

    const handleSelectMessage = async (msg) => {
        setSelectedMessage(msg);
        if (!msg.isRead) {
            try {
                await axios.put(`/api/messages/${msg._id}/read`);
                setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
            } catch (err) {
                console.error('Error marking message as read:', err);
            }
        }
    };

    if (isLoading) return <div className="text-center py-20 text-slate-400 font-bold">Loading Messages...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-slate-900">Inbox</h1>
                <p className="text-slate-500">Feedback and inquiries from your visitors.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-bold">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Message List */}
                <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {messages.length === 0 ? (
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center text-slate-400">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg._id}
                                onClick={() => handleSelectMessage(msg)}
                                className={`
                                    bg-white p-6 rounded-3xl border cursor-pointer transition-all relative
                                    ${selectedMessage?._id === msg._id
                                        ? 'border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/20'
                                        : 'border-slate-100 hover:border-slate-300'}
                                    ${!msg.isRead ? 'bg-blue-50/50' : ''}
                                `}
                            >
                                {!msg.isRead && (
                                    <div className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full"></div>
                                )}
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 truncate pr-4">{msg.name}</h4>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold whitespace-nowrap">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-1">{msg.message}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Content */}
                <div className="lg:col-span-2">
                    {selectedMessage ? (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{selectedMessage.name}</h3>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            <Mail size={14} /> {selectedMessage.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedMessage._id)}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">
                                    <MessageSquare size={14} /> Message Content
                                </div>
                                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap text-lg">
                                    {selectedMessage.message}
                                </p>

                                <div className="mt-auto pt-8 flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar size={14} />
                                    Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center p-20 min-h-[500px]">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                                <Eye size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400">Select a message to read</h3>
                            <p className="text-slate-400 text-center max-w-xs mt-2">
                                Click on any message in the list to view its full content and sender details.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageManager;
