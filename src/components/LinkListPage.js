import React from 'react'
import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import Environment from '../Environment'
import LinkList from './LinkList'
import { ITEMS_PER_PAGE } from '../constants'

const LinkListPageQuery = graphql`
  query LinkListPageQuery(
    $count: Int!,
    $after: String
  ) {
    viewer {
      ...LinkList_viewer
    }
  }
`

class LinkListPage extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={Environment}
        variables={{
          count: ITEMS_PER_PAGE,
        }}
        query={LinkListPageQuery}
        render={ ({error, props}) => {
          console.log(props)
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <LinkList {...props} />
          }
          return <div>Loading...</div>
        }}
      />
    )
  }
}

export default LinkListPage

