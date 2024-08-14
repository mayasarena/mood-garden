import { getFlowerObjectFromId, getMoodTextColorFromFlowerId } from "../../utils/flowerData";
import { motion, AnimatePresence } from 'framer-motion';
import { RiCoinsFill } from "react-icons/ri";
import { useUser } from "../../contexts/UserContext";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
};

const FlowerModal = ({ isOpen, onClose, flowerId }) => {
    const flowerObject = getFlowerObjectFromId(flowerId);
    const { addPurchasedPlant, removePoints } = useUser();

    const buyPlant = () => {
        addPurchasedPlant(flowerId);
        removePoints(flowerObject.price);
        onClose();
    }

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
                    className={`flex flex-col gap-5 p-12 bg-white rounded-container items-center justify-between w-[450px] h-[400px] z-10 overflow-auto`}
                    variants={modalVariants}
                >
                    <h2 className="small-header text-center text-black">Are you sure you want to buy <br /><span className={getMoodTextColorFromFlowerId(flowerId)}>{flowerObject.label}</span>?</h2>
                    <img src={flowerObject.image} alt={flowerObject.label} className="w-full h-40 object-cover" />
                    <div className="flex flex-row gap-3 w-full">
                        {/** Buy button */}
                        <button
                            className="flex-1 primary-button flex flex-row gap-2 justify-center"
                            onClick={() => buyPlant()}
                        >
                            Buy for
                            <div className="flex flex-row gap-1">
                                <RiCoinsFill className="text-coins-yellow text-[1rem]" />
                                {flowerObject.price}
                            </div>
                        </button>

                        {/** Close button */}
                        <button
                            onClick={onClose}
                            className="flex-1 secondary-button"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);
};

export default FlowerModal;