import React from 'react'
import PropTypes from 'prop-types'

export default class If extends React.Component {
  static propTypes = {
    condition: PropTypes.bool
  }

  render = () => {
    if (this.props.condition) {
      return [this.props.children]
    }
    return null
  }
}
