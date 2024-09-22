import styled from 'styled-components';
import { primaryDarkNew, primaryNew, white, dangerNew, black } from 'themes/variables';
import media from 'themes/media';
import { Dropdown, Navbar, Container, DropdownToggle, DropdownMenu, NavbarToggler } from 'reactstrap';
import Img from 'components/Img';

export const HeaderActions = styled.div`
  border-left: 1px solid rgba(${primaryNew}, 0.1);
  border-right: 1px solid rgba(${primaryNew}, 0.1);
  margin: 0 24px;
  padding: 0 24px;
`;

export const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(${white});

  svg {
    path {
      stroke: rgba(${primaryDarkNew}, 0.5);
    }
  }
`;

export const NotificationsWrapper = styled(Dropdown)`
  .btn-secondary {
    background-color: transparent;
    border: none;
    padding: 0;
    &:hover,
    &:focus,
    &:not(:disabled):not(:disabled):active {
      background-color: transparent;
      box-shadow: none;
    }
    &:not(:disabled):not(.disabled).active:focus,
    &:not(:disabled):not(.disabled):active:focus,
    .show > &.dropdown-toggle:focus {
      box-shadow: none;
    }
  }
  .dropdown-menu {
    box-shadow: 0 2px 14px rgba(${black}, 0.07);
    border: none;
    border-radius: 3px;
    margin-top: 24px;
    padding: 0;
    width: 320px;

    ${media.medium`
      left: 4px !important;
      width: 580px;
      &:after {
        content: '';
        position: absolute;
        top: -8px;
        right: 8px;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 8px solid rgb(${white});
      }
    `};

    .notification-header {
      padding: 20px 20px 0;
      ${media.medium`
        padding: 30px 30px 0;
      `};
      .inner-block {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid rgb(${primaryNew}, 0.1);
        button.mark-read-btn {
          color: rgb(${primaryNew});
          font-family: 'GT-Walsheim-Pro-Regular';
          background: none;
          border: none;
          font-size: 14px;
          outline: none;
        }
      }
    }
    .notification-body {
      max-height: 320px;
      overflow-y: auto;
      padding: 15px;
      ${media.large`
        max-height: 420px;
      `};
      ${media.extraLarge`
        max-height: 781px;
      `};
      .dropdown-item {
        padding: 10px;
        white-space: normal;
        border-bottom: 1px solid rgb(${primaryNew}, 0.1);
        outline: none;

        ${media.medium`
          padding: 15px;
        `};

        &:hover,
        &:active,
        &.active,
        &:focus {
          color: initial;
          background: rgba(${primaryNew}, 0.05);
        }

        &.unread {
          position: relative;
          &:after {
            content: '';
            width: 6px;
            height: 6px;
            background: rgb(${dangerNew});
            position: absolute;
            bottom: 10px;
            right: 10px;
            border-radius: 100%;
            ${media.medium`
              width: 10px;
              height: 10px;
              bottom: 15px;
              right: 15px;
            `};
          }
        }
        ${ProfileImg} {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          svg,
          img {
            width: 30px;
            height: 30px;
            ${media.medium`
              width: 40px;
              height: 40px;
            `};
          }
          ${media.medium`
            width: 40px;
            height: 40px;
            margin-right: 15px;
          `};
        }
        .action-item {
          svg {
            width: 16px;
            height: 16px;
            path {
              stroke: rgb(${primaryNew});
            }
          }
        }
      }
    }
  }
`;

export const HamburgerToggle = styled(NavbarToggler)`
  display: none;
  border: 0;
  padding: 0;
  margin-right: 20px;
  height: 9px;
  top: -11px;
  position: relative;

  ${media.large`
    margin-right: 30px;
  `};

  .private-layout & {
    display: block;
  }

  &:focus {
    outline: none;
  }
  &.navbar-toggler {
    &:focus {
      box-shadow: none;
    }

    .navbar-toggler-icon {
      position: relative;
      height: 100%;
      width: 16px;
      border-top: 2px solid rgb(${primaryDarkNew}, 0.5);
      border-bottom: 2px solid rgb(${primaryDarkNew}, 0.5);

      &:after {
        content: '';
        width: 10px;
        border-top: 2px solid rgb(${primaryDarkNew}, 0.5);
        bottom: -8px;
        position: absolute;
        left: 0;
      }
    }
  }
`;

export const HeaderNav = styled.div`
  flex: 0;
`;

export const FixedNavbar = styled(Navbar)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  padding: 16px 0;
  height: 92px;
  box-shadow: 0 3px 3px rgba(${black}, 0.05);
  background: rgb(${white});
  color: #fff;

  ${media.medium`
    padding: 26px 0;
    height: 92px;
  `};

  .private-layout & {
    position: absolute;
    box-shadow: none;
    background: transparent;
    left: 265px;

    ${media.extraLarge`
      left: 260px;
    `};

    &.sidebar-close {
      left: 90px;
    }
    &.sidebar-open {
      ${HamburgerToggle} {
        &.navbar-toggler {
          .navbar-toggler-icon {
            &:after {
              width: 16px;
            }
          }
        }
      }
    }
    .cm-logo {
      display: none;
    }
  }
`;

export const UserImg = styled(Img)`
  width: 100%;
  margin: 0 auto;
  display: block;
  background: rgba(${white});
`;

export const UserProfileToggle = styled(DropdownToggle)`
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 10px;
  border: 3px solid transparent;
  background-color: transparent;
  transition: all 0.6s linear;
  overflow: hidden;

  svg {
    width: 22px;
    height: 22px;
    path {
      stroke: rgba(${primaryDarkNew}, 0.5);
    }
  }

  &:hover,
  &:focus,
  &:not(:disabled):not(:disabled):active {
    border-color: rgba(${primaryDarkNew}, 0.1);
    background-color: rgba(${white}, 0.15);
    box-shadow: none;
  }
  &:not(:disabled):not(.disabled).active:focus,
  &:not(:disabled):not(.disabled):active:focus,
  .show > &.dropdown-toggle:focus {
    box-shadow: none;
  }
`;

export const SecondaryNav = styled.div`
  align-items: center;
  display: flex;
  margin-right: 12px;
  position: relative;

  & .nav-link {
    display: flex;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    margin-right: 10px;
    display: flex;
    align-items: center;
    background: transparent;
    border-radius: 100%;

    svg {
      path {
        stroke: rgba(${primaryDarkNew}, 0.5);
      }
    }

    ${media.large`
      margin-right: 14px;
      width: 40px;
      height: 40px;
    `};

    &.noty-dot {
      position: relative;
      &:after {
        content: '';
        width: 14px;
        height: 14px;
        background: rgb(${dangerNew});
        position: absolute;
        top: 5px;
        right: 5px;
        border-radius: 100%;
        border: 2px solid rgb(${white});
      }
    }

    &:hover {
      background: rgba(${primaryDarkNew}, 0.05);
    }

    &:last-child {
      margin-right: 0;
    }

    & svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const UserProfileMenu = styled(DropdownMenu)`
  width: 260px;
  max-height: 265px;
  overflow-y: auto;
  outline: none;
  border: none;
  background: transparent;
  margin-top: 4px;

  .inner-block {
    background: rgb(${white});
    border-radius: 10px;
    border: 1px solid rgb(${primaryNew}, 0.1);
    box-shadow: 0px 5px 20px rgba(${primaryDarkNew}, 0.08);
    padding: 15px 30px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: -8px;
      right: 15px;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 8px solid rgb(${white});
    }
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      right: 14px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 9px solid rgb(${primaryNew}, 0.1);
    }
  }

  & .dropdown-item {
    font-family: 'GT-Walsheim-Pro-Regular';
    font-size: 16px;
    line-height: 18px;
    color: rgba(${primaryDarkNew}, 0.3);
    padding: 15px 0;
    display: flex;
    align-items: center;

    svg {
      margin-right: 15px;
      width: 20px;
      height: 20px;
    }

    svg {
      path,
      circle {
        stroke: rgba(${primaryDarkNew}, 0.3);
      }
    }

    &:hover {
      color: rgb(${primaryDarkNew});
      svg {
        path,
        circle {
          stroke: rgb(${primaryDarkNew});
        }
      }
    }

    &:hover,
    &:focus {
      background-color: transparent;
      color: rgb(${primaryDarkNew});
    }

    &:focus {
      outline: none;
    }

    &:last-child {
      border: 0;
    }
  }
`;

export const NavbarContainer = styled(Container)`
  padding-right: 16px;
  padding-left: 16px;
  ${media.medium`
    padding-right: 30px;
    padding-left: 30px;
  `};
`;
