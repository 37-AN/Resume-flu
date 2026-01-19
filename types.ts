// Import React to fix "Cannot find namespace 'React'" error when using React.ReactNode
import React from 'react';

export interface CommandEntry {
  type: 'input' | 'output';
  content: string | React.ReactNode;
  timestamp: string;
}

export interface Skill {
  category: string;
  name: string;
  level: 'Novice' | 'Junior' | 'Intermediate' | 'Senior' | 'Architect';
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}