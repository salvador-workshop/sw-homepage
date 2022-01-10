import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

class HomepageIndex extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.location = props.location;
    this.state = {
      isLightUi: this.location.state?.isLightUi || false,
    }

    this.onLightUiChanged = this.onLightUiChanged.bind(this);
    console.log(props.location, this.state);
  }

  onLightUiChanged() {
    this.setState(prevState => ({
      isLightUi: !prevState.isLightUi
    }));
    console.log(`onLightUiChanged() ${this.state.isLightUi} to ${!this.state.isLightUi}`, this.state, this.location);
  }

  render() {
    const siteTitle = this.data.site.siteMetadata?.title || `Title`;
    const lightModeClass = this.state.isLightUi ? 'light-ui' : 'dark-ui';

    return (
      <Layout location={this.location} title={siteTitle} className={`page-layout home-layout ${lightModeClass}`} isLightUi={this.state.isLightUi} onLightUiChanged={this.onLightUiChanged}>
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
              alt="hero"
            />
          </div>
          <MDXRenderer>{this.data.allMdx.nodes[0].body}</MDXRenderer>
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
