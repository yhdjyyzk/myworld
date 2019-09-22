import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import CesiumGlobal from '../pages/cesium/CesiumGlobal'

export default class Router extends Component {
  render () {
    return (
      <Switch>
        <Route key="myworld" path='/myworld' component={CesiumGlobal}></Route>
      </Switch>
    )
  }
}
