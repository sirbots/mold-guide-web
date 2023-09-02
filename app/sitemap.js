import { prisma } from "./lib/prisma";

// Define the base URL
const URL = "https://themoldguide.com/";

// Get all of the practitioners
const practitionersArray = await prisma.doctor.findMany({
  where: {
    published: {
      equals: true,
    },
  },
});

// Create an empty array for the doctor data
const doctorData = [];

// Iterate through the practitionersArray and push an object with the slug and lastModified data for each practitioner
practitionersArray.forEach((practitioner) =>
  doctorData.push({
    url: URL + "practitioners/" + practitioner.slug,
    lastModified: practitioner.lastModified,
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
  // TO DO: insert other status pages here as you create them
];

const combinedUrls = staticUrls.concat(doctorData);

export default async function sitemap() {
  // Return the combinedUrls array of objects to Nextjs sitemap() function
  return combinedUrls;
}
