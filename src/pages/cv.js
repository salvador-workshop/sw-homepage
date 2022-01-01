import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

const CurriculumVitaePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} className="page-layout cv-layout">
      <Seo title="CV" />
      <div className="page-container">
        <MDXRenderer>{data.allMdx.nodes[0].body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export default CurriculumVitaePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(filter: { frontmatter: { slug: { eq: "cv" } } }) {
      nodes {
        body
      }
    }
  }
`
