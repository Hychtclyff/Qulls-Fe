// src/lib/api/endpoint.ts
export const API_ENDPOINT = {
  SUMMARY: '/portofolio/summary',
  PROFILE: '/profile',
  PROJECTS: '/projects',
  SOCIALS: '/social',
} as const;
export type ApiEndpointValue = (typeof API_ENDPOINT)[keyof typeof API_ENDPOINT];
