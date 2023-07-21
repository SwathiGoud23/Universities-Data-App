import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import  './style.scss'

const renderErrorMessage = message => (
  <div className="error">{message}</div>
)

const Input = forwardRef(
  (
    {
      isInvalid,
      isRequired,
      label,
      value,
      name,
      onChange,
      onCopy,
      onCut,
      onPaste,
      onKeyDown,
      errorMessage,
      placeholder,
      readOnly,
      limit,
      type,
      subText,
      min,
      max,
      step
    },
    ref
  ) => (
    <div className="input">
      <div
        className={classNames("formInput", {
          ["formInputError"]: isInvalid
        })}
      >
        <label>{label}</label>
        <input
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
          maxLength={limit}
          min={min}
          max={max}
          type={type}
          step={step}
          required={isRequired}
          ref={ref}
        />
      </div>
      <span className={"subText"}>{subText}</span>
      {isInvalid ? renderErrorMessage(errorMessage) : null}
    </div>
  )
)

Input.propTypes = {
  label: PropTypes.element.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
  onCut: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPaste: PropTypes.func,
  isInvalid: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  readOnly: PropTypes.bool,
  limit: PropTypes.number,
  type: PropTypes.string,
  subText: PropTypes.element,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.string
}

Input.defaultProps = {
  isInvalid: false,
  errorMessage: 'error',
  readOnly: false,
  limit: 64,
  type: 'text',
  isRequired: false
}

Input.displayName = 'Input'

export default memo(Input)