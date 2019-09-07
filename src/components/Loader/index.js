import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Spinner from '../Spinner';
import styles from './styles.module.scss';

const Loader = ({ loading, children, block, absolute }) => (
  <Fragment>
    {!loading && children}
    {loading && (
      block ? (
        <div className={styles.block}>
          <Spinner large />
        </div>
      ) : (
        <div style={!absolute ? { position: 'relative' } : undefined}>
          <div
            className={cx(styles.loader, {
              [styles.absolute]: absolute,
            })}
          >
            <Spinner large />
          </div>
        </div>
      )
    )}
  </Fragment>
);

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  block: PropTypes.bool,
  absolute: PropTypes.bool,
};

export default Loader;
