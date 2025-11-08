import React from 'react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProcessStep {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface NavLink {
    name: string;
    href: string;
}

export interface SocialLink {
    name: string;
    initial: string;
    href: string;
}