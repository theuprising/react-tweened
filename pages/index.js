import React from 'react'

import Tweened from '../src/'

export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.toggleState = this.toggleState.bind(this)
    this.state = {
      opacity: 0,
      duration: 0
    }
  }
  toggleState () {
    if (this.state.opacity === 1) {
      this.setState({
        opacity: 0,
        duration: 1,
        x: 100
      })
    } else {
      this.setState({
        opacity: 1,
        duration: 1,
        x: 0
      })
    }
  }
  componentDidMount () {
    window.setInterval(this.toggleState, 3000)
  }
  render () {
    const { opacity, duration, x } = this.state
    return (
      <main>
        <Tweened
          state={{
            opacity,
            x
          }}
          duration={duration}
        >THING</Tweened>
      </main>
    )
  }
}

