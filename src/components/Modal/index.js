import React, { Fragment, PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import DefaultModal from 'react-modal';

import Button from '../Button';
import Card from '../Card';
import './styles.css';
import styles from './styles.module.scss';

DefaultModal.setAppElement(document.getElementById('modal-root'));

const getParent = () => (document.querySelector('#modal-root'));

class Modal extends PureComponent {
  static propTypes = {
    submit: PropTypes.func,
    title: PropTypes.string,
    renderTitle: PropTypes.func,
    children: PropTypes.func,
    hideSubmitButton: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    submitButtonText: PropTypes.string,
    closeButtonText: PropTypes.string,
    autoclose: PropTypes.bool,
    withContent: PropTypes.bool,
    disableSubmit: PropTypes.bool,
    content: PropTypes.node,
    submitClassName: PropTypes.string,
    closeClassName: PropTypes.string,
    cardClassName: PropTypes.string,
    closeOnOverlayClick: PropTypes.bool,
  }

  static defaultProps = {
    submitButtonText: 'Подтвердить',
    closeButtonText: 'Закрыть',
    withContent: false,
    closeOnOverlayClick: true,
  }

  state = {
    params: null,
    title: '',
    active: false,
  }

  toggleModal = ({ params, title } = {}) => {
    if (this.props.autoclose && !this.state.active) {
      this.timer = setTimeout(this.closeModal, 2500);
    }

    this.setState(({ active }) => ({
      params,
      title,
      active: !active,
    }));
  }

  closeModal = () => {
    if (this.props.autoclose) {
      clearTimeout(this.timer);
    }

    this.setState(() => ({ active: false }));
  }

  submit = () => {
    this.toggleModal();
    this.props.submit(this.state.params);
  }

  render() {
    const {
      children,
      title,
      cardClassName,
      renderTitle,
      withContent,
      content,
      hideCloseButton,
      closeButtonText,
      closeClassName,
      hideSubmitButton,
      submitButtonText,
      disableSubmit,
      submitClassName,
      closeOnOverlayClick,
    } = this.props;

    return (
      <Fragment>
        {children ? children(this.toggleModal, this.closeModal) : null}
        <DefaultModal
          closeTimeoutMS={250}
          parentSelector={getParent}
          isOpen={this.state.active}
          overlayClassName={styles.overlay}
          className={styles.container}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={closeOnOverlayClick}
        >
          <Card
            className={cx(cardClassName, styles.card)}
          >
            <div className={styles.wrapper}>
              {title && (
                <h3 className={styles.title}>{this.state.title || title}</h3>
              )}

              {renderTitle && renderTitle()}

              {withContent && (
                content
              )}

              <div className={styles.buttonWrapper}>
                {!hideCloseButton && (
                  <Button
                    transparent
                    medium
                    title={closeButtonText}
                    onClick={this.closeModal}
                    className={closeClassName}
                  />
                )}
                {!hideSubmitButton && (
                  <Button
                    primary
                    medium
                    title={submitButtonText}
                    onClick={this.submit}
                    disabled={disableSubmit}
                    className={cx(
                      styles.submitButton,
                      { [styles.wideButton]: submitButtonText.length >= 15 },
                      submitClassName,
                    )}
                  />
                )}
              </div>
            </div>
          </Card>
        </DefaultModal>
      </Fragment>
    );
  }
}

export default Modal;
