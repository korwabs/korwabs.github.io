"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  delay?: number;
}

const ProcessStep = ({
  number,
  title,
  description,
  isLast = false,
  delay = 0,
}: ProcessStepProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg pulse-ring">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-primary-500 to-transparent mt-2" />
        )}
      </div>
      <div className="pb-12">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-dark-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProcessStep;
