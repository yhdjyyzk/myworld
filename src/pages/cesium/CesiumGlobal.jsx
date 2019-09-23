import React, { Component } from 'react'

import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import './cesiumGlobal.scss'

export default class CesiumGlobal extends Component {
  constructor (props) {
    super(props)
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2)
    this.viewer = null
  }

  componentDidMount () {
    this.viewer = new Cesium.Viewer('map', {
      timeline: false,
      vrButton: false
    })

    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(116.5, 39.8, 100000)
    })
  }

  render () {
    return <div id='map' className='map'></div>
  }
}
