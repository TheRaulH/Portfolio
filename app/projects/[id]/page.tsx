/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { useProjectStore } from "@/store/projects";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  ExternalLink,
  Calendar,
  Tag,
  ArrowLeft,
  Figma,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Importar GSAP (descomenta en tu proyecto real)
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjectStore();
  const project = projects.find((p) => p.id === id);

  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const functionalitiesRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!project) return notFound();

  useEffect(() => {
    // Scroll progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer para autoplay de videos
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video) => {
      if (video) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.play();
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(video);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    // Animaciones GSAP - Descomenta en tu proyecto real
    /*
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
    })
      .from(
        descRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        metaRef.current?.children || [],
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.4"
      )
      .from(
        techStackRef.current?.children || [],
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
        },
        "-=0.3"
      );

    // Animaciones de scroll para funcionalidades
    functionalitiesRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
    */
  }, []);

  const statusConfig = {
    completed: {
      label: "Completado",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    "in-progress": {
      label: "En Progreso",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    planned: {
      label: "Planeado",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
  };

  const status =
    statusConfig[project.status as keyof typeof statusConfig] ||
    statusConfig.completed;

  return (
    <div className="min-h-screen">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/projects")}
          className="group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a proyectos
        </Button>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Status badge */}
          <div className="mb-6">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border ${status.color}`}
            >
              <span className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
              {status.label}
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-primary bg-clip-text text-transparent leading-tight"
          >
            {project.title}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
          >
            {project.description}
          </p>

          {/* Meta info */}
          <div ref={metaRef} className="flex flex-wrap gap-6 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(project.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="w-5 h-5" />
              <span>{project.tags.length} etiquetas</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Stack Tecnológico
            </h3>
            <div ref={techStackRef} className="flex flex-wrap gap-3">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 bg-secondary border border-border rounded-lg text-primary font-medium hover:bg-secondary/80 hover:border-primary/50 transition-all cursor-default hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.links.github && (
              <Button variant="outline" asChild className="group">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Ver en GitHub
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button asChild className="group">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Ver Demo
                </a>
              </Button>
            )}
            {project.links.figma && (
              <Button variant="outline" asChild className="group">
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Figma className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Ver Diseño
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Long Description */}
      {project.longDescription && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Sobre el Proyecto
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Functionalities */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Funcionalidades <span className="text-primary">Principales</span>
          </h2>

          <div className="space-y-24">
            {project.functionalities.map((feature, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  functionalitiesRef.current[idx] = el;
                }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text content */}
                <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold mb-4">
                    Funcionalidad {idx + 1}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Media */}
                <div
                  className={
                    idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-card rounded-xl overflow-hidden border border-border shadow-xl">
                      {feature.media.type === "video" ? (
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          src={feature.media.url}
                          loop
                          muted
                          playsInline
                          className="w-full h-auto p-6"
                        />
                      ) : (
                        <img
                          src={feature.media.url}
                          alt={feature.media.alt}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Etiquetas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-secondary border border-border rounded-full text-foreground hover:text-primary hover:border-primary/50 transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Te gustó este proyecto?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Explora más de mis trabajos o contáctame para colaborar
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/projects")}>
              Ver más proyectos
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/contact")}
            >
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
