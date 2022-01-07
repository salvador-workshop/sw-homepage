import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle} className="page-layout home-layout">
      <Seo title="Home" />
      <div className="page-container">
          <div className="hero-img-container">
              <img
                className="hero-img"
                src="/full-dark.png"
                alt="hero image"
              />
            </div>
        <MDXRenderer>{data.allMdx.nodes[0].body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(filter: { frontmatter: { slug: { eq: "home" } } }) {
      nodes {
        body
      }
    }
  }
`
