"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

interface Skill {
    name: string | null;
    category: string | null;
    proficiency: string | null;
    percentage: number | null;
    yearsOfExperience: number | null;
    color: string | null;
    iconId?: string | null;
}

interface InfiniteSkillsProps {
    skills: Skill[];
    reverse?: boolean;
}

export function InfiniteSkills({ skills, reverse = false }: InfiniteSkillsProps) {
    // Triple the skills to ensure seamless looping
    const duplicatedSkills = useMemo(() => [...skills, ...skills, ...skills], [skills]);

    return (
        <div className="relative w-full overflow-hidden py-6 mask-gradient">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
                }}
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {duplicatedSkills.map((skill, idx) => {
                    // If no iconId is provided, we use the name in lowercase as a fallback
                    const iconSource = skill.iconId || skill.name?.toLowerCase().replace(/\s+/g, "");
                    const iconUrl = `https://skillicons.dev/icons?i=${iconSource}`;

                    return (
                        <div
                            key={`${skill.name}-${idx}`}
                            className="mx-4 flex items-center justify-center rounded-2xl border bg-card/40 px-6 py-4 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card hover:shadow-2xl group border-white/5"
                        >
                            <div className="relative w-10 h-10 mr-4 transition-transform group-hover:scale-110 duration-300">
                                <img
                                    src={iconUrl}
                                    alt={skill.name || "skill"}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold tracking-tight text-foreground/90 group-hover:text-foreground">
                                    {skill.name}
                                </span>
                                {skill.category && (
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
                                        {skill.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Glossy Overlay */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
        </div>
    );
}
