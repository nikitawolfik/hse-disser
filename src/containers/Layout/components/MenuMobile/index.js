import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import cx from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import CloseIcon from 'assets/svg/cross.svg';
import ArrowIcon from 'assets/svg/back.svg';
import ArrowIconBlue from 'assets/svg/back-blue.svg';
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
import { MiddlebarContextMobile } from 'context';
import { MenuContext } from 'context/MenuContext';
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
  const containerRef = useRef();
  let closeMenuOutside = () => {};

  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      closeMenuOutside();
    }
  };

  // eslint-disable-next-line react/prop-types
  const renderIcon = (setSidebarOpened, setMenuOpened) => ({ name, image, imageBlue, to = '/' }, index, array) => {
    const {
      location: { pathname },
    } = props;

    const handleClick = (e) => {
      setMenuOpened(false);

      if (pathname.includes(to)) {
        e.preventDefault();
      }

      if (realMenu.includes(name)) {
        setSidebarOpened(true);
      }
    };

    const isActive = pathname.includes(to);

    return (
      <NavLink
        key={name}
        activeClassName={styles.selectedMenu}
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

        <h2 className={styles.menuItem}>{name}</h2>
        <div className={styles.chevronWrapper}>
          <img src={isActive ? ArrowIconBlue : ArrowIcon} className={styles.icon} />
        </div>

      </NavLink>
    );
  };

  return (
    <WindowResizer>
      {width => (
        <MenuContext.Consumer>
          {([menu, setMenuOpened]) => (
            <MiddlebarContextMobile.Consumer>
              {([, setSidebarOpened]) => (
                <Transition
                  in={menu}
                  timeout={350}
                  unmountOnExit
                  mountOnEnter
                  enter
                >
                  {(menuAnimation) => {
                    if (menuAnimation === 'entering') {
                      containerRef.current.focus();
                    }

                    closeMenuOutside = () => {
                      setMenuOpened(false);
                    };

                    return (
                      <div
                        ref={containerRef}
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        className={cx(
                          styles.container,
                          {
                            [styles.entering]: menuAnimation === 'entering',
                            [styles.exiting]: menuAnimation === 'exiting',
                            [styles.hidden]: width > md,
                          },
                        )}
                      >
                        <div className={styles.top}>
                          <div className={styles.logoWrapper}>
                            <h1 className={styles.header}>Меню</h1>
                            <Button
                              withIcon
                              icon={CloseIcon}
                              iconClassName={styles.closeIcon}
                              onClick={() => setMenuOpened(false)}
                            />

                          </div>
                        </div>
                        <div className={styles.medium}>
                          {[...mediumItems, ...bottomItems]
                            .map(renderIcon(setSidebarOpened, setMenuOpened))}
                        </div>
                      </div>
                    );
                  }}
                </Transition>
              )}
            </MiddlebarContextMobile.Consumer>

          )}
        </MenuContext.Consumer>

      )}
    </WindowResizer>
  );
};

Menu.propTypes = {
  location: PropTypes.shape({}),
};

export default compose(
  withRouter,
  memo,
)(Menu);
