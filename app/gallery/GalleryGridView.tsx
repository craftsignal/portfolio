"use client";

import { motion } from "framer-motion";
import ProjectGridCard from "./ProjectGridCard";
import { workGridProjects } from "./workGridData";

const instrumentSerif =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";

type GalleryGridViewProps = {
  isLight: boolean;
};

export default function GalleryGridView({ isLight }: GalleryGridViewProps) {
  const workTitleColor = isLight ? "text-neutral-900" : "text-white";

  return (
    <motion.div
      className="gallery-route-grid min-h-0 flex-1 overflow-y-auto px-5 pb-28 pt-4 sm:px-8 sm:pb-32 sm:pt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <h1
        className={`${instrumentSerif} mb-12 text-5xl font-normal tracking-tight sm:mb-16 sm:text-6xl md:text-7xl ${workTitleColor}`}
      >
        WORK
      </h1>

      <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
        {workGridProjects.map((project) => (
          <ProjectGridCard key={project.id} project={project} isLight={isLight} />
        ))}
      </div>
    </motion.div>
  );
}
