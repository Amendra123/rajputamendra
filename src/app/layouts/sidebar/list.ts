export const listDATA: any = [
 
  {
    // name: "Know Your Audience (Consumer 360° view)",
    name: "Package Management",
    icon: "know-your-yudienc",
    showSubList: "false",
    // routerLink: "know-audience/persona",
    id: "knowurAd",
    sublist: [
      {
        // name: "Level 1 - Demographic (Limited Search queries)​",
        name: "Package View",
        routerLink: "dashboard/package-details",
      },
      {
        // name: "Level 2 - Persona and Behaviour (Limited Search Queries)",
        name: "User Package",
        routerLink: "dashboard/user-package-details",
      },
      {
        // name: "Level 3 - Keywords (Unlimited Search Queries)",
        name: "Meta Tags",
        routerLink: "dashboard/metaTags",
      },      
      {
        // name: "Level 3 - Keywords (Unlimited Search Queries)",
        name: "Bulk SMS",
        routerLink: "know-audience/keyword",
      },
    ],
  }
];
