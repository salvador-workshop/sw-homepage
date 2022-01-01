import * as React from "react"
import { Link } from "gatsby"

// import kitty1 from "../images/kitty-1.jpg"
// import kitty2 from "../images/kitty-2.jpg"
// import kitty3 from "../images/kitty-3.jpg"

// const placeholderMap = {
//   0: kitty1,
//   1: kitty2,
//   2: kitty3,
// }

// generates an integer from 0 to the number (exclusive)
// const getRandomInt = max => {
//   return Math.floor(Math.random() * max)
// }

const Card = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  // const cardPlaceholderImg = placeholderMap[getRandomInt(3)]
  const cardImgPath = post.frontmatter.thumbnail

  return (
    <div className="card">
      <div className="card-background" />
      <div className="card-image-wrapper">
        <img
          className="card-image"
          // src={cardPlaceholderImg}
          src={`/${cardImgPath}`}
          alt="navigation icon"
        />
      </div>
      <article
        className="post-list-item card-content"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 className="card-title">
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">
                {title}
              </span>
            </Link>
          </h2>
          <p className="card-data">
            {post.frontmatter.category}
            <span className="text-spacer">//</span>
            {post.frontmatter.date}
          </p>
        </header>
        <section>
          <span
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </article>
    </div>
  )
}

export default Card
