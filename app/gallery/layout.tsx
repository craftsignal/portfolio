import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gallery — Grid & 3D World",
  description:
    "Interactive 3D portfolio gallery: grid of projects and a spherical world of artwork.",
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
