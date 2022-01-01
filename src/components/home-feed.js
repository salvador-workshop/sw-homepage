import * as React from "react"

import Card from "./card"

const HomeFeed = ({ posts }) => (
  <div className="home-feed">
    {posts.map(post => (
      <Card post={post} key={post.fields.slug} />
    ))}
  </div>
)

export default HomeFeed
