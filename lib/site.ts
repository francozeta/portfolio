export const siteConfig = {
  name: "Franco Zeta",
  title: "Franco Zeta - Software Developer and Product Designer",
  description:
    "Portfolio and writing by Franco Zeta, a Lima-based software developer and product-minded designer building Kocteau, Stepper, Anomalyer, and web interfaces with Next.js, React, TypeScript, and Supabase.",
  url: "https://francozeta.vercel.app",
  locale: "en_US",
  language: "en",
  location: "Lima, Peru",
  social: {
    github: "https://www.github.com/francozeta",
    linkedin: "https://www.linkedin.com/in/franco-zeta-496330267",
    x: "https://x.com/frxnco_zeta",
  },
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
