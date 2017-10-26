import {
  graphql,
  requestSubscription
} from 'react-relay'
import environment from '../Environment'

const newVoteSubscription = graphql`
  subscription NewVoteSubscription {
    # specifies that you're interested in all events that are happening on the Vote type
    Vote {
      # information about the new Vote that was created is included in the payload of the subscription query, this information is represented by the node field
      node {
        id
        user {
          id
        }
        link {
          id
          _votesMeta {
            count
          }
        }
      }
    }
  }
`

// 3
export default () => {

  const subscriptionConfig = {
    subscription: newVoteSubscription,
    variables: {},
    updater: proxyStore => {
      const createVoteField = proxyStore.getRootField('Vote')
      const newVote = createVoteField.getLinkedRecord('node')
      const updatedLink = newVote.getLinkedRecord('link')
      const linkId = updatedLink.getValue('id')
      const newVotes = updatedLink.getLinkedRecord('_votesMeta')
      const newVoteCount = newVotes.getValue('count')

      const link = proxyStore.get(linkId)
      link.getLinkedRecord('votes').setValue(newVoteCount, 'count')
    },
    onError: error => console.log(`An error occured:`, error)
  }

  requestSubscription(
    environment,
    subscriptionConfig
  )

}
