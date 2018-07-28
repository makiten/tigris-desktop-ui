import { createNetworkInterface } from 'apollo-client'

export default (ctx) => {
  return createNetworkInterface({ uri: 'https://localhost:8000/graphql/' })
}
