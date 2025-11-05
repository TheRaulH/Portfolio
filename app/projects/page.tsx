"use client";

import { useProjectStore } from "@/store/projects";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const {
    techStacks,
    selectedTechs,
    toggleTech,
    clearTechs,
    filteredProjects,
  } = useProjectStore();

  const projects = filteredProjects();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {techStacks.map((tech) => (
          <Button
            key={tech}
            variant={selectedTechs.includes(tech) ? "default" : "outline"}
            onClick={() => toggleTech(tech)}
            className="rounded-full"
          >
            {tech}
          </Button>
        ))}
        {selectedTechs.length > 0 && (
          <Button variant="destructive" onClick={clearTechs}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
