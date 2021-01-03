import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from '../router/Router'
import 'antd/dist/antd.css'

export default class MyWorld extends Component {
  render () {
    return <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  }
}
