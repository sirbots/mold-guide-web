// Images
import Image from "next/image";

// Contentful
import { getArticles, getArticleBySlug } from "../../../lib/contentful";

// Components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// Styles & Fonts
import styles from "../../../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // First, get all of the Contentful articles so we can create a page for each one

  const articles = await getArticles();

  // Then, get the slug field of each Article and map it. This will get passed as a params prop to the SingleArticlePage function so nextjs can build a unique page for each doctor (by looking up the unique slug)
  return articles.map((article) => ({
    slug: article.fields.slug,
    id: article.sys.id,
  }));
}

// SEO: generate dynamic metadata
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);

  let { articleTitle: title } = article.fields;

  return {
    title: title + " | The Mold Guide",
  };
}

export default async function SingleArticlePage({ params }) {
  // Find the unique article in the Contentful database
  const article = await getArticleBySlug(params.slug);

  // Destructure the object to make the names more manageable
  let { articleTitle: title } = article.fields;

  let contentArray = article.fields.articleBody.content;

  return (
    <main className={styles.container}>
      <Header />
      {/* <Image
          src={gender == "male" ? maleDoctor2 : femaleDoctor6}
          className={styles.img}
          // TO DO: update to make auto-generated alt tag
          alt="Doctor photo."
        /> */}

      <div className={styles.articleContent}>
        <h1>{title}</h1>

        {/* Map out the article content from Contentful */}
        {contentArray &&
          contentArray.map((contentItem) => {
            if (contentItem.nodeType == "paragraph") {
              return <p>{contentItem.content[0].value}</p>;
            } else if (contentItem.nodeType == "heading-2") {
              return <h2>{contentItem.content[0].value}</h2>;
            } else if (contentItem.nodeType == "heading-3") {
              return <h3>{contentItem.content[0].value}</h3>;
            }
          })}
      </div>

      <Footer />
    </main>
  );
}
