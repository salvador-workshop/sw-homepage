import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

const HomepageIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle} className="page-layout home-layout">
      <Seo title="Home" />
      <div className="page-container">
        <div className="ornament-border top homepage">
          <img
            className="ornament-img"
            src="/ornaments/home-top-dark.png"
            alt="ornament: home top border"
          />
        </div>
        <div className="hero-img-container">
          <img
            className="hero-img"
            src="/full-dark.png"
            alt="hero image"
          />
        </div>
        <MDXRenderer>{data.allMdx.nodes[0].body}</MDXRenderer>
        <div className="ornament-border bottom">
          <img
            className="ornament-img"
            src="/ornaments/home-bottom-dark.png"
            alt="ornament: home bottom border"
          />
        </div>
      </div>
    </Layout>
  )
}

export default HomepageIndex

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
