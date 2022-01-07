import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ServicesPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} className="page-layout services-layout">
      <Seo title="About Me" />
      <div className="page-container">
        <div className="ornament-border top">
          <img
            className="ornament-img"
            src="/ornaments/services-top-dark.png"
            alt="ornament: services top border"
          />
        </div>
        <MDXRenderer>{data.allMdx.nodes[0].body}</MDXRenderer>
        <div className="ornament-border bottom">
          <img
            className="ornament-img"
            src="/ornaments/services-bottom-dark.png"
            alt="ornament: services bottom border"
          />
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  allMdx(filter: { frontmatter: { slug: { eq: "services" } } }) {
    nodes {
      body
    }
  }
}
`
