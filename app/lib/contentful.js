// src/utils.js
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Retrieve the list of blog posts from Contentful
export const getArticles = async () => {
  const response = await client.getEntries({
    content_type: "article",
  });

  return response.items;
};

export const getArticleBySlug = async (slug) => {
  const response = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
  });
  return response.items[0];
};
