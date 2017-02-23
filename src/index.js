const debug = require('debug')('react-tweened')

import React from 'react'
import Animable from 'react-animable'
import { TweenMax } from 'gsap'

const ReactTweened = ({id, className, children, state, duration}) => {
  debug('render', {id, className, children, state, duration})
  return (
    <Animable
      id={id}
      className={className}
      makeTimeline={
        el => TweenMax.to(el, duration, state)
      }
    >
      {children}
    </Animable>
  )
}

export default ReactTweened

