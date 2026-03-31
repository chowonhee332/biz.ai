import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { HOME_FAQ as faqs } from '@/context/home/home-data';

const FAQList = memo(function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            className="border-b border-border-light"
            initial={false}
          >
            <Button
              variant="ghost"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full py-8 flex items-center justify-between text-left group cursor-pointer h-auto px-0 hover:bg-transparent dark:hover:bg-transparent"
            >
              <span className={`text-body-xs md:text-body-md font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                {item.q}
              </span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.div
                  className="absolute w-5 h-[2px] bg-brand-primary"
                  animate={{ rotate: 0 }}
                />
                <motion.div
                  className="absolute w-5 h-[2px] bg-brand-primary"
                  animate={{ rotate: isOpen ? 0 : 90 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </Button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 text-body-sm leading-relaxed font-normal break-keep max-w-2xl text-text-secondary">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
});

export default FAQList;
