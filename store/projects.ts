"use client";

import { create } from "zustand";
import projectsData from "../public/projects.json";
import type { Project } from "@/types/projects";

type ProjectStore = {
  projects: Project[];
  techStacks: string[];
  selectedTechs: string[];
  toggleTech: (tech: string) => void;
  clearTechs: () => void;
  filteredProjects: () => Project[];
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: projectsData.projects,
  techStacks: Array.from(
    new Set(projectsData.projects.flatMap((p) => p.techStack))
  ),
  selectedTechs: [],
  toggleTech: (tech) =>
    set((state) => {
      const isActive = state.selectedTechs.includes(tech);
      return {
        selectedTechs: isActive
          ? state.selectedTechs.filter((t) => t !== tech)
          : [...state.selectedTechs, tech],
      };
    }),
  clearTechs: () => set({ selectedTechs: [] }),
  filteredProjects: () => {
    const { projects, selectedTechs } = get();
    if (selectedTechs.length === 0) return projects;
    return projects.filter((p) =>
      selectedTechs.every((tech) => p.techStack.includes(tech))
    );
  },
}));
