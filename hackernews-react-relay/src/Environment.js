import { GC_AUTH_TOKEN } from './constants'
const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')
import { SubscriptionClient } from 'subscriptions-transport-ws'

const store = new Store(new RecordSource())

// NOTE refactored into seperate closure when adding subscriptions
// const network = Network.create((operation, variables) => {
//   return fetch('https://api.graph.cool/relay/v1/cj8vsg4dv05g60124i6i9kzjt', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
//     },
//     body: JSON.stringify({
//       query: operation.text,
//       variables,
//     }),
//   }).then(response => {
//     return response.json()
//   })
// })

const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj8vsg4dv05g60124i6i9kzjt', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

// uses the SubscriptionClient to initiate and maintain a connection to the given endpoint
// the config passed into the function carries the subscription query which determines what event the client wants to subscribe to and what data it wants to receive
const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj8vsg4dv05g60124i6i9kzjt', {reconnect: true})
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result})
  })
}

const network = Network.create(fetchQuery, setupSubscription)

// instantiate environment with store and network
const environment = new Environment({
  network,
  store,
})

export default environment
