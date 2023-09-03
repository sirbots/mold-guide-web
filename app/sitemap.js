import { prisma } from "./lib/prisma";
import { getArticles } from "./lib/contentful";

// Define the base URL
const URL = "https://themoldguide.com/";

// Get all of the practitioners from MongoDB
const practitionersArray = await prisma.doctor.findMany({
  where: {
    published: {
      equals: true,
    },
  },
});

// Get all the articles from Contentful
const articlesArray = await getArticles();

// Create empty arrays for the doctor and article data
const doctorData = [];
const articleData = [];

// Iterate through the practitionersArray and push an object with the slug and lastModified data for each practitioner
practitionersArray.forEach((practitioner) =>
  doctorData.push({
    url: URL + "practitioners/" + practitioner.slug,
    lastModified: practitioner.lastModified,
  })
);

// Iterate through the articlesArray and push an object with the slug and lastModified data for each practitioner
articlesArray.forEach((article) =>
  articleData.push({
    url: URL + "resources/articles/" + article.fields.slug,
    lastModified: article.sys.updatedAt,
  })
);

// Define the static URLs on the site
const staticUrls = [
  {
    // Homepage
    url: URL,
    lastModified: new Date(),
  },
  {
    // About Page
    url: URL + "about",
    lastModified: new Date(),
  },
  {
    // Practitioners Page
    url: URL + "practitioners",
    lastModified: new Date(),
  },
  {
    // Login Page
    url: URL + "login",
    lastModified: new Date(),
  },
  {
    // Signup Page
    url: URL + "signup",
    lastModified: new Date(),
  },
  {
    // Resources Page
    url: URL + "resources",
    lastModified: new Date(),
  },
  // TO DO: insert other status pages here as you create them
];

const combinedUrls = staticUrls.concat(doctorData, articleData);

export default async function sitemap() {
  // Return the combinedUrls array of objects to Nextjs sitemap() function
  return combinedUrls;
}
