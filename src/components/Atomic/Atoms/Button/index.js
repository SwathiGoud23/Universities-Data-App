import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.scss'

const Button = ({
  type,
  disabled,
  onClick,
  variant,
  children,
  customClass
}) => {
  const styleVariant = [variant]
  const className = classNames("button", {
    [disabled]: disabled,
    [styleVariant]: variant,
    [customClass]: customClass
  })
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['inverted', 'action']),
  disabled: PropTypes.bool,
  customClass: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => null
}

export default React.memo(Button)