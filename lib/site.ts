export const siteConfig = {
  name: "Franco Zeta",
  title: "Franco Zeta | Software Developer and Product Designer",
  description:
    "Franco Zeta is a Lima-based software developer and product designer building Kocteau and helping teams turn product ideas into thoughtful web interfaces.",
  url: "https://francozeta.com",
  locale: "en_US",
  language: "en",
  location: "Lima, Peru",
  email: "francozeta2011@gmail.com",
  social: {
    github: "https://www.github.com/francozeta",
    linkedin: "https://www.linkedin.com/in/franco-zeta-496330267",
    x: "https://x.com/frxnco_zeta",
  },
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
