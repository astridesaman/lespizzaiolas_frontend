import { motion, AnimatePresence } from 'framer-motion';

type AnimatedAlertProps = {
  show: boolean;
  text: string;
  type?: 'success' | 'error';
};

const AnimatedAlert = ({ show, text, type = 'success' }: AnimatedAlertProps) => {
  const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white shadow-lg z-50 ${color}`}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedAlert;
