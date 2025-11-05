"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { LucideIcon, Phone, ToolCase } from "lucide-react";
import React from "react";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const experiences: ExperienceItem[] = [
   
  {
    company: "Freelance",
    position: "Development Consultant",
    period: "2023 - 2024",
    description:
      "Technical consulting and development of custom solutions for various clients. Specialized in progressive web applications.",
    icon: ToolCase,
    color: "#FFB800",
  }, 
  {
    company: "SoftyNext",
    position: "Mobile Developer with Flutter",
    period: "2025 - Present",
    description:
      "Development of mapping application for UGRM. Implementation of advanced geolocation features and performance optimization.",
    icon: Phone,
    color: "#1E86FF",
  },
];

const ExperienceCard = ({
  company,
  position,
  period,
  description,
  icon,
  color,
}: ExperienceItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-6 mb-6",
        "transition-all duration-200 ease-in-out hover:scale-[101%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-start gap-4">
        <div
          className="flex size-12 items-center justify-center rounded-2xl mt-1"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-xl">{React.createElement(icon)}</span>
        </div>
        <div className="flex flex-col overflow-hidden flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <figcaption className="text-xl font-semibold dark:text-white">
              {company}
            </figcaption>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {period}
            </span>
          </div>
          <h3 className="text-lg font-medium text-primary mt-1">{position}</h3>
          <p className="mt-3 text-muted-foreground">{description}</p>
        </div>
      </div>
    </figure>
  );
};

export default function ExperiencePage() {
  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <div className="flex-shrink-0 p-8 pb-4">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-4xl md:text-3xl sm:text-2xl font-bold tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm lg:text-lg md:text-base sm:text-sm text-muted-foreground max-w-2xl">
            Throughout my career I have worked in different environments and
            teams, contributing to software development, architecture and
            technical leadership.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-8 pb-8">
        <div
          className="h-full overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <AnimatedList>
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} {...exp} />
            ))}
          </AnimatedList>

          {/* Spacer to ensure last item is visible */}
          <div className="h-4"></div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </div>
  );
}
