
export enum ProjectCategory {
  SOCIAL_DESIGN = 'تصميم سوشيال ميديا',
  VIDEO_EDITING = 'مونتاج فيديوهات',
  AD_CAMPAIGNS = 'إدارة حملات إعلانية',
}

export type ProjectStatus = 'قيد التنفيذ' | 'مكتمل' | 'مراجعة العميل' | 'مسودة';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  tools: string[];
  status: ProjectStatus;
  clientName?: string;
  budget?: string;
  deadline?: string;
  challenge?: string;
  solution?: string;
  results?: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  iconType: 'design' | 'video' | 'ads';
}

export interface HeroContent {
  title: string;
  description: string;
  imageUrl: string;
  tagline: string;
}

export interface SiteSettings {
  adminPassword: string;
  tiktokUrl: string;
  facebookUrl: string;
  phone: string;
  email: string;
}

export type LeadStatus = 'جديد' | 'تم التواصل' | 'تم الاتفاق' | 'مرفوض';

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: LeadStatus;
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
  trend?: string;
}
