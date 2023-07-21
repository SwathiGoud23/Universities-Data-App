import React from 'react'
import Input from './index'

let wrapper

const props = {
  onChange: jest.fn(),
  label: <div>test label</div>,
  name: 'Test name',
  isInvalid: false,
  value: ''
}

describe('<Input />', () => {
  beforeEach(() => {
    wrapper = shallow(<Input {...props} />)
  })

  it('should render the label', () => {
    expect(wrapper.find('label').prop('children')).toBe(props.label)
  })

  it('should render the input', () => {
    expect(wrapper.find('input')).toExist()
  })

  it('should not render the errormessage when the invalid is false', () => {
    expect(wrapper.find('.error')).not.toExist()
  })

  it('should render errormessage when the invalid is true', () => {
    wrapper.setProps({ isInvalid: true })
    expect(wrapper.find('.error')).toExist()
  })

  it('should call onchange prop with input value', () => {
    const event = { target: { value: 'test' } }
    wrapper.find('input').simulate('change', event)
    expect(props.onChange).toHaveBeenCalledWith(event)
  })
})