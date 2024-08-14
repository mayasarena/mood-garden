import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
};

const Modal = ({ isOpen, onClose, width, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 flex items-center justify-center z-50"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Background overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={onClose}
                        variants={backdropVariants}
                    ></motion.div>

                    {/* Modal container */}
                    <motion.div 
                        className={`flex p-12 bg-white rounded-container ${width} h-[600px] z-10 overflow-hidden`}
                        variants={modalVariants}
                    >
                        {/* Modal content */}
                        <div className="h-full w-full">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;