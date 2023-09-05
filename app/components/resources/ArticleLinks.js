"use client";

// Contentful
import { getArticles } from "../../lib/contentful";

export default async function ArticleLinks({}) {
  // Get all the articles from Contentful
  const articles = await getArticles();

  return (
    <div>
      <h2>Articles</h2>
      {/* Display all of the currently published articles with their title and a link to the single article page. */}
      {articles &&
        articles.map((article) => (
          <div key={article.sys.id}>
            <p>
              <a href={"/resources/articles/" + article.fields.slug}>
                {article.fields.articleTitle}
              </a>
            </p>
          </div>
        ))}
    </div>
  );
}
