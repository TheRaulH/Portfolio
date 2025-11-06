/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Project } from "@/types/projects"; 
import { useProjectStore } from "@/store/projects"; 

 
type Props = {
  project: Project;
};



export function ProjectCard({ project }: Props) {
  const { selectedTechs, toggleTech } = useProjectStore();
 

  return (
    <Card className="hover:scale-105 transition-transform">
      <CardHeader>
        <div className="relative w-full h-60 rounded-lg overflow-hidden bg-muted">
          <img
            src={project.thumbnail || "/images/default-project-thumbnail.webp"}
            alt={project.title}
            width={1200}
            height={675}
            className=" object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = "/images/default-project-thumbnail.webp";
            }}
          />
        </div>
        <CardTitle className="mt-2">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {project.description}
        </p>

        {/* Tech Stack con filtros */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.techStack.map((tech) => {
            const isActive = selectedTechs.includes(tech);
            return (
              <Button
                key={tech}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="rounded-full text-xs px-3 py-1"
                onClick={() => toggleTech(tech)}
              >
                {tech}
              </Button>
            );
          })}
        </div>

        <Button asChild>
          <Link href={`/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
 