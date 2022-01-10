import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

class ServicesPage extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.location = props.location;
    this.state = {
      isLightUi: false,
    }

    this.onLightUiChanged = this.onLightUiChanged.bind(this);
  }

  onLightUiChanged() {
    console.log(`onLightUiChanged() ${this.isLightUi} to ${!this.isLightUi}`);
    this.setState(prevState => ({
      isLightUi: !prevState.isLightUi
    }));
  }

  render() {
    const siteTitle = this.data.site.siteMetadata?.title || `Title`;
    const lightModeClass = this.state.isLightUi ? 'light-ui' : 'dark-ui';

    return (
      <Layout location={this.location} title={siteTitle} className={`page-layout home-layout ${lightModeClass}`} isLightUi={this.state.isLightUi} onLightUiChanged={this.onLightUiChanged}>
        <Seo title="Services" />
        <div className="page-container">
          <div className="ornament-border top">
            <img
              className="ornament-img"
              src="/ornaments/services-top-dark.png"
              alt="ornament: services top border"
            />
          </div>
          <MDXRenderer>{this.data.allMdx.nodes[0].body}</MDXRenderer>
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
