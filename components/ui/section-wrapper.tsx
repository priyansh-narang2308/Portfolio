"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionWrapperProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
    id?: string;
}

export function SectionWrapper({
    children,
    delay = 0,
    direction = "up",
    className = "",
    id,
}: SectionWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            id={id}
            initial={{
                ...directions[direction],
                opacity: 0,
            }}
            animate={
                isInView
                    ? {
                        x: 0,
                        y: 0,
                        opacity: 1,
                    }
                    : {
                        ...directions[direction],
                        opacity: 0,
                    }
            }
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
