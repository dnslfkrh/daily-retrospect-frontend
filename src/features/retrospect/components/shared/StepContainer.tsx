"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export const StepContainer = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="w-full h-full flex flex-col items-center justify-center px-2"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    {children}
  </motion.div>
);
