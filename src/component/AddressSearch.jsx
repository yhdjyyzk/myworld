import React, { PureComponent } from 'react'
import { Input, Dropdown, Menu } from 'antd'
import './address-search.scss'
import PropTypes from 'prop-types'

import { forwardGeocoding } from '../api/search'

const { Search } = Input

export default class AddressSearch extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      address: '',
      result: []
    }

    this.onSearch = this.onSearch.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSelectPlace = this.onSelectPlace.bind(this)
  }

  render () {
    const { loading, address } = this.state
    return <div className="address-search">
      <Dropdown overlay={this.renderList()} visible={true}>
        <Search value={address} onSearch={this.onSearch} onChange={this.onChange} loading={loading} allowClear />
      </Dropdown>
    </div>
  }

  onSearch (value) {
    if (value) {
      this.setState({
        loading: true
      })
      forwardGeocoding(value).then(res => {
        if (res.features) {
          this.setState({
            result: [...res.features]
          })
        }
        this.setState({
          loading: false
        })
      })
    } else {
      this.setState({
        loading: false,
        result: []
      })
    }
  }

  onChange (e) {
    this.setState({
      address: e.target.value
    })

    if (e.target.value === '') {
      this.setState({
        loading: false,
        result: []
      })
      this.props.onClear()
    }
  }

  /**
   * 选中了下拉菜单中的地址
   * @param {*} args
   */
  onSelectPlace (args) {
    if (args) {
      this.props.onSelectPlace(args.item.props.value)
      this.setState({
        address: args.item.props.value.text
      })
    }
  }

  renderList () {
    return (
      this.state.result.length ? <Menu onClick={this.onSelectPlace}>
        {this.state.result.map((item, index) => {
          return (
            <Menu.Item value={item} key={item.id}>
              {item.text}
            </Menu.Item>
          )
        })}
      </Menu> : <></>
    )
  }
}

AddressSearch.propTypes = {
  onSelectPlace: PropTypes.func.isRequired, // 选择地点的回调
  onClear: PropTypes.func.isRequired // 清除内容的回调
}
