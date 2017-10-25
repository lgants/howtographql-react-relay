const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj8vsg4dv05g60124i6i9kzjt', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
})

// instantiate environment with store and network
const environment = new Environment({
  network,
  store,
})

export default environment
