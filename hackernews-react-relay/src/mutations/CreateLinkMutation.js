import {
  commitMutation,
  graphql,
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        description
      }
    }
  }
`

export default (description, url, callback) => {
  const variables = {
    input: {
      description,
      url,
      clientMutationId: ""
    },
  }

  // commitMutation function can be used to send a mutation to the server with Relay Modern
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}
