
import React from 'react';
import { Palette, Video, BarChart3, Users, Zap, Award } from 'lucide-react';
import { ProjectCategory, Project, Stat } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'تصميم هوية بصرية كاملة',
    description: 'مشروع متكامل لتصميم العلامة التجارية وهوية السوشيال ميديا لمطعم فاخر.',
    category: ProjectCategory.SOCIAL_DESIGN,
    imageUrl: 'https://picsum.photos/seed/design1/800/600',
    // Fix: Added missing required status property
    status: 'مكتمل',
    // Added required tools property
    tools: ['Adobe Photoshop', 'Illustrator', 'Figma'],
  },
  {
    id: '2',
    title: 'مونتاج فيديو ترويجي',
    description: 'مونتاج احترافي لفيديو إعلاني مدته 60 ثانية باستخدام مؤثرات بصرية متقدمة.',
    category: ProjectCategory.VIDEO_EDITING,
    imageUrl: 'https://picsum.photos/seed/video1/800/600',
    // Fix: Added missing required status property
    status: 'مكتمل',
    // Added required tools property
    tools: ['Adobe Premiere Pro', 'After Effects'],
  },
  {
    id: '3',
    title: 'حملة إعلانية عقارية',
    description: 'إدارة حملة ممولة على فيسبوك وانستجرام حققت عائداً استثمارياً بنسبة 300%.',
    category: ProjectCategory.AD_CAMPAIGNS,
    imageUrl: 'https://picsum.photos/seed/ads1/800/600',
    // Fix: Added missing required status property
    status: 'مكتمل',
    // Added required tools property
    tools: ['Meta Ads Manager', 'Google Analytics'],
  },
];

export const SERVICES = [
  {
    title: 'تصميم الإعلانات',
    desc: 'تصميمات بصرية تخطف الأنظار تزيد من نسبة النقر والتفاعل.',
    icon: <Palette className="w-8 h-8 text-indigo-400" />,
  },
  {
    title: 'مونتاج الفيديو',
    desc: 'تحويل لقطاتك العادية إلى قصة سينمائية ملهمة ومؤثرة.',
    icon: <Video className="w-8 h-8 text-purple-400" />,
  },
  {
    title: 'إدارة الحملات',
    desc: 'تحليل دقيق واستهداف ذكي لضمان أفضل وصول لجمهورك المستهدف.',
    icon: <BarChart3 className="w-8 h-8 text-pink-400" />,
  },
];

export const STATS: Stat[] = [
  { label: 'عملاء سعداء', value: '150', suffix: '+' },
  { label: 'مشروع مكتمل', value: '300', suffix: '+' },
  { label: 'حملات إعلانية', value: '50', suffix: '' },
  { label: 'سنوات خبرة', value: '5', suffix: '+' },
];
