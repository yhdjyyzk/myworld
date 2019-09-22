import React, { Component } from 'react'

import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import './cesiumGlobal.scss'

export default class CesiumGlobal extends Component {
  componentDidMount () {
    new Cesium.Viewer('map')
  }

  render () {
    return <div id='map' className='map'>cesium</div>
  }
}
