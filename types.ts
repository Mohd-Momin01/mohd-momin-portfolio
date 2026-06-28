import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string; // Keep as string for flexibility
  link?: string;
  github?: string;
  image?: string;
  caseStudy?: string;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
  level?: string;
  progress?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credential_url?: string;
  image_url?: string;
}