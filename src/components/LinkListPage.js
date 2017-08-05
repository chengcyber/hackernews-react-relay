import React from 'react'
import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import Environment from '../Environment'
import LinkList from './LinkList'

const LinkListPageQuery = graphql`
  query LinkListPageQuery {
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

