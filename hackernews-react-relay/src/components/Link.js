import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class Link extends Component {

  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    )
  }

  _voteForLink = async () => {
    // implement later
  }

}

// important to note that there's a naming convention for the fragments; each fragment should be named according to the file and the prop that will get injected into the component: <FileName>_<propName>

// second argument are the component's data requirements in the form of a GraphQL fragment tagged with the graphql function
export default createFragmentContainer(Link, graphql`
  fragment Link_link on Link {
    id
    description
    url
  }
`)
