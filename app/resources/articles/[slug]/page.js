// Images
import Image from "next/image";

// Contentful
import { getArticles, getArticleBySlug } from "../../../lib/contentful";

// Components
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

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

  // Move the contents of the object into a new array
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
          contentArray.map((contentBlock, key) => {
            switch (contentBlock.nodeType) {
              // Handle contentBlock that is a paragrah
              case "paragraph": {
                return (
                  // Start with an opening p tag
                  <p>
                    {/* Some paragraphs will have multiple items, depending on formatting. Bolded text is in its own item, as is italic text, and hyperlinks */}
                    {contentBlock.content.map((contentItem, key) => {
                      // Handle hyperlinks
                      if (contentItem.nodeType == "hyperlink") {
                        return (
                          <a key={key} href={contentItem.data.uri}>
                            {contentItem.content[0].value}
                          </a>
                        );
                      }

                      // Handle bold, italic text
                      // TO DO: handle underlined, highlighted and other cases

                      // Create an array of the marks for each content item. This makes them much easier to work with, so you don't have to iterate through an array of objects.
                      let marksArray = [];
                      for (const mark of contentItem.marks) {
                        marksArray.push(mark.type);
                      }

                      // Handle bold and italic text
                      if (marksArray.includes("bold" && "italic")) {
                        return (
                          <span key={key}>
                            <b>
                              <i>{contentItem.value}</i>
                            </b>
                          </span>
                        );
                        // Handle just bold text
                      } else if (marksArray.includes("bold")) {
                        return (
                          <span key={key}>
                            <b>{contentItem.value}</b>
                          </span>
                        );
                        // Handle just italic text
                      } else if (marksArray.includes("italic")) {
                        return (
                          <span key={key}>
                            <i>{contentItem.value}</i>
                          </span>
                        );
                        // Handle all cases without marks
                      } else {
                        return <span key={key}>{contentItem.value}</span>;
                      }
                    })}
                  </p>
                );
              }

              // Handle headings
              case "heading-1":
                return <h1 key={key}>{contentBlock.content[0].value}</h1>;
              case "heading-2":
                return <h2>{contentBlock.content[0].value}</h2>;
              case "heading-3":
                return <h3 key={key}>{contentBlock.content[0].value}</h3>;
              case "heading-4":
                return <h3 key={key}>{contentBlock.content[0].value}</h3>;
              // Handle unordered lists
              case "unordered-list":
                return (
                  <ul>
                    {contentBlock.content.map((contentItem, key) => {
                      return (
                        <li key={key}>
                          {contentItem.content[0].content[0].value}
                        </li>
                      );
                    })}
                  </ul>
                );
              // Handle ordered lists
              case "ordered-list":
                return (
                  <ol>
                    {contentBlock.content.map((contentItem, key) => {
                      return (
                        <li key={key}>
                          {contentItem.content[0].content[0].value}
                        </li>
                      );
                    })}
                  </ol>
                );
              // Leave a default for unhandled cases
              // TO DO: come back to these later. Check the contentful API for other potential content types
              default:
                console.log("handling the default case");
                return <p key={key}>Unhandled Content Style</p>;
            }
          })}
      </div>

      <Footer />
    </main>
  );
}
