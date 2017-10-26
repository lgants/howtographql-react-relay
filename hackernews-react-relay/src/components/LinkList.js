import React, { Component } from 'react'
import Link from './Link'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'

class LinkList extends Component {
  componentDidMount() {
    NewVoteSubscription()
  }

  render() {
    return (
      <div>
        {this.props.viewer.allLinks.edges.map(({node}, index) => (
          <Link key={node.__id} index={index} link={node}/>
        ))}
      </div>
    )
  }
}

// In Relay, lists are represented with the concept of connections
// Relay also requires you to always specify a limit of items that you want to fetch from the server, so you have to pass the first or last argument when fetching items from a connection


// LinkList.js is the name of the file and viewer is the prop that's expected in the component
// This also reuses the Link_link fragment in Link.js since the LinkList component is higher in the React component (and Relay container) tree, so it needs to include all the fragments of its children
// @connection directive is required for updating the cache later on; needed in order to refer to that particular connection (identified by the key LinkList_allLinks) in the cache
export default createFragmentContainer(LinkList, graphql`
  fragment LinkList_viewer on Viewer {
    allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: []) {
      edges {
        node {
          ...Link_link
        }
      }
    }
  }
`)
