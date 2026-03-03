"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "../ui/section-wrapper";
import { cn } from "@/lib/utils";

interface Project {
    title: string | null;
    slug: { current: string | null } | null;
    tagline: string | null;
    category: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    coverImage: any;
    featured?: boolean | null;
    technologies: { name: string | null; category: string | null; color: string | null }[] | null;
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
    const [showAll, setShowAll] = useState(false);

    const displayedProjects = showAll ? projects : projects.slice(0, 6);
    const hasMore = projects.length > 6;

    return (
        <div className="space-y-12">
            <div className="@container">
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayedProjects.map((project, idx) => (
                            <motion.div
                                key={project.slug?.current || idx}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.4,
                                    delay: showAll && idx >= 6 ? (idx - 6) * 0.05 : 0
                                }}
                            >
                                <ProjectCard project={project} index={idx} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {hasMore && (
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowAll(!showAll)}
                        className="group cursor-pointer"
                    >
                        <span>{showAll ? "Show Less" : "View All Projects"}</span>
                        <ChevronDown
                            className={cn(
                                "ml-2 h-4 w-4 transition-transform duration-300",
                                showAll ? "rotate-180" : ""
                            )}
                        />
                    </Button>
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <div className="@container/card group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            {project.coverImage && (
                <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                        src={urlFor(project.coverImage)
                            .width(600)
                            .height(400)
                            .url()}
                        alt={project.title || "Project image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] group-hover:opacity-0 transition-opacity duration-300" />
                </div>
            )}

            <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4 flex-1 flex flex-col">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        {project.category && (
                            <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-full bg-primary/10 text-primary">
                                {project.category}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
                        {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-2">
                        {project.tagline}
                    </p>
                </div>

                {/* TECH */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
                        {project.technologies.slice(0, 4).map((tech, idx) => {
                            const techData =
                                tech && typeof tech === "object" && "name" in tech
                                    ? tech
                                    : null;
                            return techData?.name ? (
                                <span
                                    key={`${project.slug?.current}-tech-${idx}`}
                                    className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted"
                                >
                                    {techData.name}
                                </span>
                            ) : null;
                        })}
                        {project.technologies.length > 4 && (
                            <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                )}

                <div className="flex flex-col @xs/card:flex-row gap-2 @xs/card:gap-3 pt-2 mt-auto">
                    {project.liveUrl && (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-3 py-2 @md/card:px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs @md/card:text-sm"
                        >
                            Live Demo
                        </Link>
                    )}
                    {project.githubUrl && (
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 @md/card:px-4 rounded-lg border hover:bg-accent transition-colors text-xs @md/card:text-sm text-center"
                        >
                            GitHub
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
