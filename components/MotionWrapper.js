"use client";
import { motion } from 'framer-motion';

export const MotionContainer = ({ children, className, delay = 0 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export const MotionItem = ({ children, className, index = 0 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export const MotionCard = ({ children, className, href, onClick }) => {
    const Component = href ? motion.a : motion.div;
    const props = href ? { href } : { onClick };

    return (
        <Component
            className={className}
            whileHover={{ y: -5, boxShadow: "0 12px 20px -8px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            {...props}
        >
            {children}
        </Component>
    );
};
