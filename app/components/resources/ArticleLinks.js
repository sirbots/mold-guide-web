"use client";

// Contentful
import { getArticles } from "../../lib/contentful";

export default async function ArticleLinks({}) {
  // Get all the articles from Contentful
  const articles = await getArticles();

  return (
    <div>
      <h2>Articles</h2>

      {/* Display the currently published articles by category, with their title and a link to the single article page. */}
      <h3>Mold Prevention</h3>
      {articles &&
        articles
          .filter((article) => article.fields.category.includes("Prevention"))

          .map((article) => (
            <div key={article.sys.id}>
              <p>
                <a href={"/resources/articles/" + article.fields.slug}>
                  {article.fields.articleTitle}
                </a>
              </p>
            </div>
          ))}
      <h3>Mold Testing</h3>
      {articles &&
        articles
          .filter((article) => article.fields.category.includes("Testing"))

          .map((article) => (
            <div key={article.sys.id}>
              <p>
                <a href={"/resources/articles/" + article.fields.slug}>
                  {article.fields.articleTitle}
                </a>
              </p>
            </div>
          ))}
      {/* <h3>Mold Remediation</h3>
      {articles &&
        articles
          .filter((article) => article.fields.category.includes("Remediation"))

          .map((article) => (
            <div key={article.sys.id}>
              <p>
                <a href={"/resources/articles/" + article.fields.slug}>
                  {article.fields.articleTitle}
                </a>
              </p>
            </div>
          ))} */}
      <h3>Treatment</h3>
      {articles &&
        articles
          .filter((article) => article.fields.category.includes("Treatment"))

          .map((article) => (
            <div key={article.sys.id}>
              <p>
                <a href={"/resources/articles/" + article.fields.slug}>
                  {article.fields.articleTitle}
                </a>
              </p>
            </div>
          ))}
      {/* <h3>Cleaning</h3>
      {articles &&
        articles
          .filter((article) => article.fields.category.includes("Cleaning"))

          .map((article) => (
            <div key={article.sys.id}>
              <p>
                <a href={"/resources/articles/" + article.fields.slug}>
                  {article.fields.articleTitle}
                </a>
              </p>
            </div>
          ))} */}

      {/* <h3>All Articles</h3>
      {articles &&
        articles.map((article) => (
          <div key={article.sys.id}>
            <p>
              <a href={"/resources/articles/" + article.fields.slug}>
                {article.fields.articleTitle}
              </a>
            </p>
          </div>
        ))} */}
    </div>
  );
}
