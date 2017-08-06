// 1
import { GC_AUTH_TOKEN } from './constants'
import { SubscriptionClient } from 'subscriptions-transport-ws'
const {
    Environment,
    Network,
    RecordSource,
    Store,
} = require('relay-runtime')

// 2
const store = new Store(new RecordSource())

// 4.1
const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj5z6tva2erc10183xahffep9', {
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

// 4.2
const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj5z6tva2erc10183xahffep9', {reconnect: true})
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result})
  })
}

// 3
const network = Network.create(fetchQuery, setupSubscription)

// 5
const environment = new Environment({
    network,
    store,
})

// 6
export default environment
