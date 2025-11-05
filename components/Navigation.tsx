"use client";

import {
  HomeIcon,
  MailIcon,
  UserIcon,
  BriefcaseIcon,
  FolderIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"; 
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";

export function useScreen() {
  const [screen, setScreen] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setScreen({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPortrait = screen.height > screen.width;

  return { ...screen, isPortrait };
}

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  github: (props: IconProps) => <GithubIcon {...props} />,
  linkedin: (props: IconProps) => <LinkedinIcon {...props} />,
  twitter: (props: IconProps) => <TwitterIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
};

const NAVIGATION_DATA = {
  personal: {
    name: "Raul Herrera",
    role: "Systems Engineer",
  },
  navigation: [
    { href: "/", icon: HomeIcon, label: "Start" },
    { href: "/about", icon: UserIcon, label: "About Me" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    { href: "/experience", icon: BriefcaseIcon, label: "Experience" },
    { href: "/contact", icon: MailIcon, label: "Contact" },
  ],
  social: {
    GitHub: {
      name: "GitHub",
      url: "https://github.com/TheRaulH",
      icon: Icons.github,
    },
    LinkedIn: {
      name: "LinkedIn",
      url: "https://linkedin.com/in/raulisraelherreracruz",
      icon: Icons.linkedin,
    },
    Email: {
      name: "Email",
      url: "mailto:raulisraelherreracruz@gmail.com",
      icon: Icons.email,
    },
  },
};

interface NavigationProps {
  children: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const pathname = usePathname();
  const { width } = useScreen();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const compactSidebarRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLAnchorElement[]>([]);
  const socialItemsRef = useRef<HTMLAnchorElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Determinar qué navegación mostrar según el ancho de pantalla
  const showFullSidebar = width >= 1024;
  const showCompactSidebar = width >= 768 && width < 1024;
  const showMobileDock = width < 768;

  // Animaciones de entrada
  useEffect(() => {
    const tl = gsap.timeline();

    if (showFullSidebar && sidebarRef.current) {
      // Animación inicial del sidebar
      gsap.set(sidebarRef.current, { x: -288, opacity: 0 });
      tl.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Animación del header
      if (headerRef.current) {
        gsap.set(headerRef.current, { y: -20, opacity: 0 });
        tl.to(
          headerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Animación de los items de navegación
      navItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, { x: -30, opacity: 0 });
          tl.to(
            item,
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            `-=${0.4 - index * 0.05}`
          );
        }
      });

      // Animación del footer
      if (footerRef.current) {
        gsap.set(footerRef.current, { y: 20, opacity: 0 });
        tl.to(
          footerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }

    if (showCompactSidebar && compactSidebarRef.current) {
      gsap.set(compactSidebarRef.current, { x: -80, opacity: 0 });
      gsap.to(compactSidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (showMobileDock && dockRef.current) {
      gsap.set(dockRef.current, { y: 100, opacity: 0, scale: 0.8 });
      gsap.to(dockRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    }
  }, [showFullSidebar, showCompactSidebar, showMobileDock]);

  // Efectos hover para items de navegación
  const handleNavHover = (element: HTMLElement, isEntering: boolean) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.02,
        x: 4,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(element.querySelector("svg"), {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        x: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(element.querySelector("svg"), {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  // Efectos hover para redes sociales
  const handleSocialHover = (element: HTMLElement, isEntering: boolean) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.1,
        rotation: 5,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(element.querySelector("svg"), {
        scale: 1.2,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(element.querySelector("svg"), {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  // Efecto de click/tap
  const handleItemClick = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  // Animación de cambio de ruta activa
  useEffect(() => {
    navItemsRef.current.forEach((item) => {
      if (item) {
        const isActive = item.getAttribute("data-href") === pathname;
        if (isActive) {
          gsap.fromTo(
            item,
            { scale: 1 },
            {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            }
          );
        }
      }
    });
  }, [pathname]);

  const Sidebar = () => (
    <div
      ref={sidebarRef}
      className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-40"
    >
      <div className="flex flex-col flex-grow bg-background/95 backdrop-blur-sm border-r border-border/50 shadow-lg">
        {/* Header del sidebar */}
        <div
          ref={headerRef}
          className="flex items-center flex-shrink-0 px-6 pt-8 pb-6 border-b border-border/50"
        >
          <div className="flex flex-col w-full">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {NAVIGATION_DATA.personal.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              {NAVIGATION_DATA.personal.role}
            </p>
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {NAVIGATION_DATA.navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                data-href={item.href}
                ref={(el) => {
                  if (el) navItemsRef.current[index] = el;
                }}
                onMouseEnter={(e) => handleNavHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleNavHover(e.currentTarget, false)}
                onClick={(e) => handleItemClick(e.currentTarget)}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:border-accent-foreground/10 border border-transparent"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse" />
                )}
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors relative z-10",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="truncate relative z-10">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full opacity-60 relative z-10 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div
          ref={footerRef}
          className="flex-shrink-0 px-4 py-6 border-t border-border/50 bg-muted/20"
        >
          <div className="space-y-4">
            {/* Redes sociales */}
            <div className="flex justify-center gap-2">
              {Object.entries(NAVIGATION_DATA.social).map(
                ([key, social], index) => (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={(el) => {
                          if (el) socialItemsRef.current[index] = el;
                        }}
                        onMouseEnter={(e) =>
                          handleSocialHover(e.currentTarget, true)
                        }
                        onMouseLeave={(e) =>
                          handleSocialHover(e.currentTarget, false)
                        }
                        onClick={(e) => handleItemClick(e.currentTarget)}
                        className={cn(
                          "flex items-center justify-center h-10 w-full rounded-lg transition-all duration-200 relative overflow-hidden",
                          "bg-muted/50 hover:bg-accent text-muted-foreground hover:text-foreground border border-border/30 hover:border-accent-foreground/20"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <social.icon className="h-4 w-4 relative z-10" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              )}
            </div>

            {/* Toggle de tema */}
            <div className="flex justify-center">
              <div className="pt-2 px-2 bg-muted/50 rounded-lg border border-border/30">
                <AnimatedThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompactSidebar = () => (
    <div
      ref={compactSidebarRef}
      className="hidden md:flex lg:hidden md:w-20 md:flex-col md:fixed md:inset-y-0 z-40"
    >
      <div className="flex flex-col flex-grow bg-background/95 backdrop-blur-sm border-r border-border/50 shadow-lg">
        {/* Navegación con solo iconos */}
        <nav className="flex-1 flex flex-col items-center py-4 space-y-4">
          {NAVIGATION_DATA.navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.2,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.2,
                        ease: "power2.out",
                      });
                    }}
                    onClick={(e) => handleItemClick(e.currentTarget)}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 relative overflow-hidden",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60 border border-transparent"
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
                    )}
                    <item.icon className="h-5 w-5 relative z-10" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer con solo redes + toggle */}
        <div className="flex flex-col items-center space-y-4 p-4 border-t border-border/50 bg-muted/20">
          {Object.entries(NAVIGATION_DATA.social).map(([key, social]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                  onMouseLeave={(e) =>
                    handleSocialHover(e.currentTarget, false)
                  }
                  onClick={(e) => handleItemClick(e.currentTarget)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 hover:bg-accent text-muted-foreground hover:text-foreground relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  <social.icon className="h-4 w-4 relative z-10" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{social.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <div
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                rotation: 10,
                duration: 0.2,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                rotation: 0,
                duration: 0.2,
                ease: "power2.out",
              });
            }}
            className="pt-1.5 px-2 border"
          >
            <AnimatedThemeToggler></AnimatedThemeToggler>
          </div>
        </div>
      </div>
    </div>
  );

  // Dock para móvil
  const MobileDock = () => {
    const { width, isPortrait } = useScreen();
    const showSocial = width > 480 && !isPortrait;

    return (
      <div
        ref={dockRef}
        className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <TooltipProvider>
          <Dock direction="middle">
            {NAVIGATION_DATA.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <DockIcon key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1.2,
                            y: -8,
                            duration: 0.2,
                            ease: "power2.out",
                          });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1,
                            y: 0,
                            duration: 0.2,
                            ease: "power2.out",
                          });
                        }}
                        onTouchStart={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 0.9,
                            duration: 0.1,
                            ease: "power2.out",
                          });
                        }}
                        onTouchEnd={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1,
                            duration: 0.1,
                            ease: "power2.out",
                          });
                        }}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full relative overflow-hidden",
                          isActive &&
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse" />
                        )}
                        <item.icon className="size-4 relative z-10" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              );
            })}

            {showSocial && (
              <>
                <Separator orientation="vertical" className="h-full" />
                {Object.entries(NAVIGATION_DATA.social).map(
                  ([name, social]) => (
                    <DockIcon key={name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => {
                              gsap.to(e.currentTarget, {
                                scale: 1.2,
                                y: -8,
                                rotation: 10,
                                duration: 0.2,
                                ease: "power2.out",
                              });
                            }}
                            onMouseLeave={(e) => {
                              gsap.to(e.currentTarget, {
                                scale: 1,
                                y: 0,
                                rotation: 0,
                                duration: 0.2,
                                ease: "power2.out",
                              });
                            }}
                            onTouchStart={(e) => {
                              gsap.to(e.currentTarget, {
                                scale: 0.9,
                                duration: 0.1,
                                ease: "power2.out",
                              });
                            }}
                            onTouchEnd={(e) => {
                              gsap.to(e.currentTarget, {
                                scale: 1,
                                duration: 0.1,
                                ease: "power2.out",
                              });
                            }}
                            className={cn(
                              buttonVariants({
                                variant: "ghost",
                                size: "icon",
                              }),
                              "size-12 rounded-full relative overflow-hidden"
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <social.icon className="size-4 relative z-10" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </DockIcon>
                  )
                )}
              </>
            )}

            <Separator orientation="vertical" className="h-full py-2" />

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.1,
                        y: -4,
                        rotation: 15,
                        duration: 0.2,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        y: 0,
                        rotation: 0,
                        duration: 0.2,
                        ease: "power2.out",
                      });
                    }}
                  >
                     
                    <AnimatedThemeToggler className=" p-3 rounded-full shadow " />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cambiar tema</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <TooltipProvider>
        {showFullSidebar && <Sidebar />}
        {showCompactSidebar && <CompactSidebar />}

        <div
          className={cn(
            "flex-1 flex flex-col min-h-0",
            showFullSidebar && "lg:ml-72",
            showCompactSidebar && "md:ml-20"
          )}
        >
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="h-full">{children}</div>
          </main>
        </div>

        {showMobileDock && <MobileDock />}
      </TooltipProvider>
    </div>
  );
}
