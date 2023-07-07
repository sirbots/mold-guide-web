import { prisma } from "./lib/prisma";

// Define the base URL
const URL = "https://themoldguide.com/";

// Get all of the practitioners
const practitioners = await prisma.doctor.findMany();

// Map the practitioner slugs to a new Array
let slugArray = practitioners.map((practitioner) => practitioner.slug);

// Create an array for all the doctor URLs
const doctorUrls = [];

// Iterate through the slugArray and push an object for each slug
slugArray.forEach((slug) =>
  doctorUrls.push({
    url: URL + "practitioners/" + slug,
    lastModified: new Date(),
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
  // {
  //   // Login Page
  //   url: URL + "login",
  //   lastModified: new Date(),
  // },
  // {
  //   // Signup Page
  //   url: URL + "signup",
  //   lastModified: new Date(),
  // },
  // TO DO: insert other status pages here as you create them
];

const combinedUrls = staticUrls.concat(doctorUrls);

export default async function sitemap() {
  // Return the combinedUrls array of objects to Nextjs sitemap() function
  return combinedUrls;
}
