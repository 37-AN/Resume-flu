
import { Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "Ethan Barnes",
  title: "Computer Technician",
  address: "28 Silvertree Road, Austerville, Durban, 4052, South Africa",
  email: "ethanbarnes17@gmail.com",
  phone: "0615804454",
  links: ["https://ethanbarnes.000webhostapp.com/"],
  profile: "As a computer technician with experience in Programming, I.T, Electrical Engineering, Automation, Instrumentation, and Networking, I have achieved significant accomplishments in troubleshooting and resolving complex technical issues. My expertise lies in ensuring the smooth functioning of computer systems, diagnosing hardware and software problems, and implementing effective solutions."
};

export const EXPERIENCES: Experience[] = [
  {
    period: "2024 — Present",
    role: "IT Infrastructure Technician",
    company: "Dunlop Tyres",
    location: "Durban",
    bullets: [
      "Managed and maintained IT networks and infrastructure.",
      "Provided technical support for Manufacturing Execution Systems (MES) and Plant IT.",
      "Supported and maintained SCADA systems for production monitoring.",
      "Managed SQL databases and data integrity for plant operations."
    ]
  },
  {
    period: "07/2023 — Present",
    role: "Electrical and Instrumentation Learnership",
    company: "Blendcor",
    location: "Durban",
    bullets: [
      "Participated in installations, repair, and preventative maintenance on electrical control systems.",
      "Troubleshoot and perform preventative or scheduled maintenance for all systems.",
      "Provided technical design input and equipment specification recommendations.",
      "Maintained PLC control systems and SCADA systems for lubricant/oil production.",
      "Flowmeter and level meter calibrations."
    ]
  },
  {
    period: "01/2023 — 06/2023",
    role: "I.T Intern",
    company: "Blendcor",
    location: "Durban",
    bullets: [
      "Provided technical assistance on hardware and software-related issues.",
      "Monitored system performance and troubleshot issues.",
      "Followed established procedures for computer maintenance.",
      "Diagnosing and maintaining physical servers and virtual machines."
    ]
  },
  {
    period: "03/2022 — 11/2023",
    role: "In-service Trainee",
    company: "Hybrid Automation",
    location: "Durban",
    bullets: [
      "Help design and create PLC programs, SCADA systems using TIA Portal and PHP.",
      "Analyze and troubleshooting PLC systems.",
      "Assisted in the design, building and wiring of electrical panels using EPLAN."
    ]
  }
];

export const SKILLS: Skill[] = [
  { category: "Programming", name: "Assembly", level: "Intermediate" },
  { category: "Programming", name: "C, C++", level: "Intermediate" },
  { category: "Programming", name: "JavaScript", level: "Intermediate" },
  { category: "Programming", name: "Python", level: "Junior" },
  { category: "Programming", name: "VB Script", level: "Intermediate" },
  { category: "Web Development", name: "React", level: "Junior" },
  { category: "Web Development", name: "PHP", level: "Intermediate" },
  { category: "Web Development", name: "HTML5", level: "Intermediate" },
  { category: "Web Development", name: "CSS", level: "Intermediate" },
  { category: "Automation", name: "Siemens TIA", level: "Junior" },
  { category: "Automation", name: "AVEVA Systems Platform", level: "Intermediate" },
  { category: "Database", name: "MySQL", level: "Intermediate" },
  { category: "Linux O.S.", name: "Kali", level: "Junior" },
  { category: "Linux O.S.", name: "Ubuntu", level: "Intermediate" },
  { category: "Cyber Security", name: "Nmap", level: "Junior" },
  { category: "Cyber Security", name: "Wireshark", level: "Junior" },
  { category: "I.T Management", name: "Microsoft Active Directory", level: "Junior" },
  { category: "I.T Management", name: "PowerShell 3", level: "Intermediate" }
];
