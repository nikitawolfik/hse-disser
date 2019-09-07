/* eslint-disable react/button-has-type */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Spinner from '../Spinner';
import styles from './styles.module.scss';

const Button = ({
  element,
  withTitle,
  withIcon,
  primary,
  transparent,
  medium,
  to,
  title,
  disabled,
  loading,
  className,
  textClassName,
  iconClassName,
  icon,
  invertIcon,
  onClick,
  big,
  outline,
  type,
  secondary,
  style,
}) => {
  if (element === 'button') {
    return (
      <button
        type={type}
        className={cx(
          styles.container,
          transparent && styles.transparent,
          primary && styles.primary,
          secondary && styles.secondary,
          outline && styles.outline,
          medium && styles.medium,
          big && styles.big,
          disabled && styles.disabled,
          className,
        )}
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && (
          <Spinner inverted />
        )}

        {(!loading && withTitle) && (
          <span
            className={cx(
              styles.text,
              (primary || secondary) && styles.white,
              textClassName,
            )}
          >
            {title}
          </span>
        )}

        {(!loading && withIcon) && (
          <img
            src={icon}
            className={cx(styles.icon, { [styles.invertIcon]: invertIcon }, iconClassName)}
          />
        )}

      </button>
    );
  }

  // link
  const linkChildren = (
    <Fragment>

      {withTitle && (
        <span
          className={cx(
            styles.text,
            primary && styles.white,
            textClassName,
          )}
        >
          {title}
        </span>
      )}

      {withIcon && (
        <img
          src={icon}
          className={cx(styles.icon, { [styles.invertIcon]: invertIcon }, iconClassName)}
        />
      )}

    </Fragment>
  );
  const linkProps = {
    className: cx(
      styles.container,
      transparent && styles.transparent,
      primary && styles.primary,
      outline && styles.outline,
      medium && styles.medium,
      big && styles.big,
      disabled && styles.disabled,
      className,
    ),
    onClick,
  };

  return React.createElement(element === 'a' ? 'a' : Link, {
    ...linkProps,
    to: element !== 'a' ? to : undefined,
    href: element !== 'a' ? undefined : to,
    target: element !== 'a' ? undefined : '_blank',
  }, linkChildren);
};

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  element: PropTypes.oneOf(['link', 'button', 'a']),
  withTitle: PropTypes.bool,
  withIcon: PropTypes.bool,
  icon: PropTypes.any,
  primary: PropTypes.bool,
  transparent: PropTypes.bool,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  medium: PropTypes.bool,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  big: PropTypes.bool,
  outline: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  secondary: PropTypes.bool,
  style: PropTypes.shape({}),
  invertIcon: PropTypes.bool,
};

Button.defaultProps = {
  element: 'button',
  type: 'button',
  withTitle: true,
};

export default Button;
