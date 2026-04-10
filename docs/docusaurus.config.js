const config = {
  title: "React Booking Calendar",
  tagline: "Booking-first calendar components with overbooking protection",
  favicon: "img/favicon.svg",
  url: "https://demark-pro.github.io",
  baseUrl: "/react-booking-calendar/",
  organizationName: "demark-pro",
  projectName: "react-booking-calendar",
  onBrokenLinks: "throw",
  trailingSlash: false,
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "React Booking Calendar",
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        {
          to: "/docs/getting-started",
          position: "left",
          label: "Examples",
        },
        {
          href: "https://www.npmjs.com/package/@demark-pro/react-booking-calendar",
          label: "npm",
          position: "right",
        },
        {
          href: "https://github.com/demark-pro/react-booking-calendar",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started",
            },
            {
              label: "API Reference",
              to: "/docs/api-reference",
            },
          ],
        },
        {
          title: "Examples",
          items: [
            {
              label: "Calendar",
              to: "/docs/calendar",
            },
            {
              label: "Scrollable Calendar",
              to: "/docs/scrollable-calendar",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/demark-pro/react-booking-calendar",
            },
            {
              label: "npm package",
              href: "https://www.npmjs.com/package/@demark-pro/react-booking-calendar",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mark Davydkin.`,
    },
    metadata: [
      {
        name: "description",
        content:
          "Interactive documentation for React Booking Calendar with live examples and API reference.",
      },
    ],
    image: "img/og-card.svg",
  },
  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap",
      type: "text/css",
    },
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          path: "content",
          routeBasePath: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          editUrl:
            "https://github.com/demark-pro/react-booking-calendar/tree/main/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};

module.exports = config;
