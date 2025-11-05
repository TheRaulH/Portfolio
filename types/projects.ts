export type MediaType = "image" | "video" | "gif" | string;

export type ProjectMedia = {
  type: MediaType;
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectFunctionality = {
  title: string;
  description: string;
  media: ProjectMedia;
};

export type ProjectLink = {
  live?: string;
  github?: string;
  figma?: string;
};

export type Project = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  functionalities: ProjectFunctionality[];
  links: ProjectLink;
  tags: string[];
  status: "in-progress" | "completed" | "planned" | string;
  date: string; // ISO format YYYY-MM-DD
};

export type ProjectsData = {
  projects: Project[];
};
