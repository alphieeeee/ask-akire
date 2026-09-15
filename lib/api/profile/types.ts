export type ProfileLink = {
  label: string;
  url: string;
};

export type PersonalProfile = {
  identity: {
    name: string;
    title: string;
    location: string;
    email: string;
    links: ProfileLink[];
  };
  summary: string;
  skillCategories: string[];
  skills: string[];
  services: {
    title: string;
    description: string;
    skills: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    responsibilities: string[];
  }[];
  projects: {
    slug: string;
    title: string;
    type: string;
    summary: string;
    tools: string[];
    link?: string;
  }[];
  certifications: {
    issuer: string;
    name: string;
    description: string;
    link?: string;
  }[];
  education: {
    degree: string;
    school: string;
    period: string;
  }[];
  achievements: string[];
  highlights: string[];
};
