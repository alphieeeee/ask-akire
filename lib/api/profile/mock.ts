import aboutData from "../about/mock";
import certificationsData from "../certifications/mock";
import cvData from "../cv/mock";
import whatIdoData from "../whatido/mock";
import workData from "../work/mock";
import type { PersonalProfile } from "./types";

const unique = (values: string[]) =>
  [...new Set(values.map((value) => value.trim()).filter(Boolean))];

const portfolioWorkUrl = (slug: string) =>
  `https://alpeville-c.vercel.app/work/${slug}`;

const profileData: PersonalProfile = {
  identity: {
    name: cvData.hero?.name ?? aboutData.name,
    title: cvData.hero?.role ?? aboutData.jobTitle,
    location: cvData.hero?.location ?? "",
    email: cvData.hero?.email ?? "",
    links: [
      { label: "Portfolio", url: cvData.hero?.portfolio ?? "" },
      { label: "LinkedIn", url: cvData.hero?.linkedin ?? "" },
      { label: "GitHub / Portfolio", url: cvData.hero?.githubPage ?? "" },
    ].filter((link) => link.url),
  },
  summary: cvData.summary || aboutData.bio,
  skillCategories: unique(aboutData.skills ?? []),
  skills: unique([
    ...cvData.skills.flatMap((skillGroup) => skillGroup.skills.split(",")),
    ...whatIdoData.flatMap((service) => service.skills),
    ...workData.flatMap((project) => project.tools),
  ]),
  services: whatIdoData.map((service) => ({
    title: service.title,
    description: service.description,
    skills: unique(service.skills),
  })),
  // The CV is the canonical source for the complete employment timeline.
  // The shorter experience mock is intentionally not copied here to avoid duplicates.
  experience: cvData.roles.map((role) => ({
    company: role.company,
    role: role.title,
    period: role.dates,
    responsibilities: role.bullets,
  })),
  projects: workData.map((project) => ({
    slug: project.slug,
    title: project.title,
    type: project.type,
    summary: project.summary,
    tools: unique(project.tools),
    link: portfolioWorkUrl(project.slug),
  })),
  certifications: certificationsData,
  education: cvData.education,
  achievements: unique(cvData.achievements),
  highlights: unique(cvData.highlights),
};

export default profileData;
