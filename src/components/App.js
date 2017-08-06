import React, { Component } from 'react';
import LinkListPage from './LinkListPage';
import CreateLink from './CreateLink'
import Header from './Header'
import {
  BrowserRouter,
  Switch, Route,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='center w85'>
          <Header />
          <div className='ph3 pv1 background-gray'>
            <Switch>
              <Route exact path='/' component={LinkListPage}/>
              <Route exact path='/create' component={CreateLink}/>
             </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
