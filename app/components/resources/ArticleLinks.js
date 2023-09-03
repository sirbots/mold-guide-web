"use client";

// Contentful
import { getArticles } from "../../lib/contentful";

export default async function ArticleLinks({}) {
  const articles = await getArticles();
  console.log(articles);

  return (
    <div>
      <h2>Articles</h2>
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
