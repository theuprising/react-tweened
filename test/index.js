import React from 'react'
import { test } from 'ava'
import { shallow } from 'enzyme'

import ReactTweened from '../'

test('ReactTweened renders without crashing', t => {
  t.notThrows(() => shallow(<ReactTweened />))
})

test('ReactTweened accepts className', t => {
  const c = shallow(<ReactTweened className='react-tweened' />)
  t.true(c.hasClass('react-tweened'))
})

