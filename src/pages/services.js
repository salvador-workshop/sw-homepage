import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SwitchableImage from "../components/switchable-image"

class ServicesPage extends React.Component {
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
    console.log(this.state, this.location.state, this.location);
    const siteTitle = this.data.site.siteMetadata?.title || `Title`;
    const lightModeClass = this.state.isLightUi ? 'light-ui' : 'dark-ui';

    return (
      <Layout location={this.location} title={siteTitle} className={`page-layout home-layout ${lightModeClass}`} isLightUi={this.state.isLightUi} onLightUiChanged={this.onLightUiChanged}>
        <Seo title="Services" />
        <div className="page-container">
          <div className="ornament-border top">
            <SwitchableImage
              className="ornament-img"
              darkImgPath="/ornaments/services-top-dark.png"
              lightImgPath="/ornaments/services-top.png"
              isLightUi={this.state.isLightUi}
              alt="ornament: services top border"
            />
          </div>
          <MDXRenderer>{this.data.allMdx.nodes[0].body}</MDXRenderer>
          <div className="ornament-border bottom">
          <SwitchableImage
              className="ornament-img"
              darkImgPath="/ornaments/services-bottom-dark.png"
              lightImgPath="/ornaments/services-bottom.png"
              isLightUi={this.state.isLightUi}
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
