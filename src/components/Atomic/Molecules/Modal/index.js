import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './style.scss'
import classNames from 'classnames'


export default class Modal extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.element.isRequired,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    closeText: PropTypes.string,
    onClose: PropTypes.func,
    customStyles: PropTypes.shape({
      modalDialog: PropTypes.string
    }),
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    header: '',
    closeText: '',
    onClose: () => null,
    customStyles: {}
  };

  modalRoot = document.getElementById('modal-root');

  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount () {
    this.modalRoot.appendChild(this.el)
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true)
    }
  }

  componentWillUnmount () {
    if (this.props.onClose) {
      window.removeEventListener(
        'keydown',
        this.listenKeyboard.bind(this),
        true
      )
    }
    this.modalRoot.removeChild(this.el)
  }

  listenKeyboard (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.onClose()
    }
  }

  handleOnOverlayClick = () => {
    this.props.onClose()
  };

  handleOnDialogClick (event) {
    event.stopPropagation()
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };


  render () {
    const { customStyles } = this.props
    return ReactDOM.createPortal(
      <div id={this.props.id || ''}>
        <div className="modalOverlay" />
        <div className="modalContent" onClick={this.handleOnOverlayClick}>
          <div
            className={classNames("modalDialog", customStyles.modalDialog)}
            onClick={this.handleOnDialogClick}
          >
            <header>
              <div>{this.props.header}</div>
              <div className="close">
                <div className="closeText">{this.props.closeText}</div>
              </div>
            </header>
            {this.props.children}
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
      </div>,
      this.el
    )
  }
}