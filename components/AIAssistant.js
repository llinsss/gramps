"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import styles from './AIAssistant.module.css';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Hi! I am Gramps AI. How can I help you manage care today?' }
    ]);
    const [input, setInput] = useState('');

    const toggleOpen = () => setIsOpen(!isOpen);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages([...messages, userMsg]);
        setInput('');

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'system',
                content: "I've noted that down. Would you like me to add a reminder to the task list?"
            }]);
        }, 1000);
    };

    return (
        <>
            <div className={styles.fabContainer}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.chatWindow}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        >
                            <div className={styles.header}>
                                <div className={styles.headerTitle}>
                                    <Sparkles size={18} className="text-yellow-400" />
                                    <span>Gramps AI</span>
                                </div>
                                <button onClick={toggleOpen} className={styles.closeBtn}>
                                    <X size={18} />
                                </button>
                            </div>

                            <div className={styles.chatBody}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.system}`}>
                                        {msg.content}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={sendMessage} className={styles.inputArea}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className={styles.input}
                                />
                                <button type="submit" className={styles.sendBtn}>
                                    <Send size={16} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleOpen}
                    className={styles.fab}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X size={24} color="white" /> : <Sparkles size={24} color="white" />}
                </motion.button>
            </div>
        </>
    );
}
