import React from 'react'
import { test } from 'ava'
import { shallow } from 'enzyme'

import __COMPONENT_NAME from '../'

test('__COMPONENT_NAME renders without crashing', t => {
  t.notThrows(() => shallow(<__COMPONENT_NAME />))
})

test('__COMPONENT_NAME accepts className', t => {
  const c = shallow(<__COMPONENT_NAME className='__PACKAGE_NAME' />)
  t.true(c.hasClass('__PACKAGE_NAME'))
})

