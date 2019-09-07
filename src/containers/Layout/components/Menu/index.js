import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import cx from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';

import LogoIcon from 'assets/svg/logo.svg';
import MyProjectsIcon from 'assets/svg/my-projects.svg';
import MyProjectsIconBlue from 'assets/svg/my-projects-blue.svg';
import ManagedProjectsIcon from 'assets/svg/managed-projects.svg';
import ManagedProjectsIconBlue from 'assets/svg/managed-projects-blue.svg';
import GuestProjectsIcon from 'assets/svg/guest-projects.svg';
import GuestProjectsIconBlue from 'assets/svg/guest-projects-blue.svg';
import ManagementIcon from 'assets/svg/management.svg';
import ManagementIconBlue from 'assets/svg/management-blue.svg';
import SettingsIcon from 'assets/svg/settings.svg';
import SettingsIconBlue from 'assets/svg/settings-blue.svg';

import { WindowResizer, Button } from 'components';
import { MiddlebarContext } from 'context/MiddlebarContext';
import { md } from 'utils/breakpoints';


import styles from './styles.module.scss';

const mediumItems = [
  {
    name: 'Мои аккаунты',
    image: MyProjectsIcon,
    imageBlue: MyProjectsIconBlue,
    to: '/projects/accounts',
  },
  {
    name: 'Управляемые проекты',
    image: ManagedProjectsIcon,
    imageBlue: ManagedProjectsIconBlue,
    to: '/projects/managed',
  },
  {
    name: 'Гостевые проекты',
    image: GuestProjectsIcon,
    imageBlue: GuestProjectsIconBlue,
    to: '/projects/guest',
  },
];

const realMenu = mediumItems.map(el => el.name);

const bottomItems = [
  {
    name: 'Менеджмент',
    image: ManagementIcon,
    imageBlue: ManagementIconBlue,
    to: '/management',
  },
  {
    name: 'Настройки',
    image: SettingsIcon,
    imageBlue: SettingsIconBlue,
    to: '/settings',
  },
];

const Menu = (props) => {
  const {
    location: { pathname },
    projects,
  } = props;

  const projectId = pathname.split('/')[2];
  const { userType } = projects[projectId] || {};

  // eslint-disable-next-line react/prop-types
  const renderIcon = setSidebarOpened => ({ name, image, imageBlue, to = '/' }, index, array) => {
    const handleClick = (e) => {
      if (pathname.includes(to)) {
        e.preventDefault();
      }
      if (realMenu.includes(name)) {
        setSidebarOpened(true);
      }
    };

    const isActive = pathname.includes(to)
      || (name === 'Мои аккаунты' && userType === 'OWNER')
      || (name === 'Управляемые проекты' && userType === 'MANAGER');

    return (
      <NavLink
        key={name}
        className={cx(styles.iconWrapper, {
          [styles.withMargin]: array.length - 1 === index,
        })}
        to={to}
        onClick={handleClick}
      >
        <img
          src={isActive ? imageBlue : image}
          className={styles.icon}
        />
      </NavLink>
    );
  };

  return (
    <WindowResizer>
      {width => (
        <MiddlebarContext.Consumer>
          {([, setSidebarOpened]) => (
            <div className={cx(
              styles.container,
              { [styles.hidden]: width < md },
            )}
            >
              <div className={styles.top}>
                <div className={styles.logoWrapper}>
                  <Button
                    element="link"
                    withIcon
                    icon={LogoIcon}
                    className={styles.iconLogo}
                    to="/projects/accounts"
                  />
                </div>
              </div>
              <div className={styles.medium}>
                {mediumItems.map(renderIcon(setSidebarOpened))}
              </div>
              <div className={styles.bottom}>
                {bottomItems.map(renderIcon(setSidebarOpened))}
              </div>
            </div>

          )}
        </MiddlebarContext.Consumer>


      )}
    </WindowResizer>
  );
};

Menu.propTypes = {
  location: PropTypes.shape({}),
  projects: PropTypes.shape({}),
};

export default compose(
  withRouter,
  memo,
)(Menu);
