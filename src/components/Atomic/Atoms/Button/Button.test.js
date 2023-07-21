import React from 'react'

import Button from '.'

describe('<Button />', () => {
  it('does render children', () => {
    const text = 'Some Funky Button'
    const wrapper = render(<Button>{text}</Button>)

    expect(wrapper.text()).toBe(text)
  })

  it('does call click handler', () => {
    const handleClick = jest.fn()
    const wrapper = shallow(<Button onClick={handleClick}>...</Button>)

    wrapper.find('button').simulate('click', { preventDefault: jest.fn() })

    expect(handleClick).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('does default to button type', () => {
    const wrapper = render(<Button>...</Button>)

    expect(wrapper.attr('type')).toBe('button')
  })

  it('does accept a submit type attribute', () => {
    const wrapper = render(<Button type='submit'>...</Button>)

    expect(wrapper.attr('type')).toBe('submit')
  })

  it('does accept a variant attribute', () => {
    const wrapper = render(<Button variant='inverted'>...</Button>)

    expect(wrapper.attr('class')).toBe('button inverted')
  })

  it('accepts a customClass prop', () => {
    const wrapper = shallow(<Button customClass='test'>...</Button>)
    expect(wrapper.find('.test')).toExist()
  })
})