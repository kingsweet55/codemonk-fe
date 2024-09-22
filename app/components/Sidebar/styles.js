import styled from 'styled-components';
import { primaryNew, primaryDarkNew, white, darkGray } from 'themes/variables';
import media from 'themes/media';

export const FixedSidebar = styled.div`
  position: fixed;
  background-color: rgb(${white});
  top: 0;
  left: 0;
  bottom: 0;
  width: 265px;
  border-right: 1px solid rgba(${primaryNew}, 0.1);
  overflow-y: auto;
  max-height: 100vh;
  padding: 25px 0;

  .cm-logo {
    margin-left: 23px;
  }

  &.sidebar-close {
    width: 90px;

    .nav {
      align-items: center;
      .nav-item {
        padding: 0;

        .nav-link {
          .menu-option {
            display: none;
          }
          .icon {
            margin-right: 0;

            .new-badge {
              display: block;
            }
          }
        }
      }
    }
  }

  ${media.extraLarge`
    width: 260px;
  `};

  .nav {
    flex-direction: column;
    margin-top: 35px;

    .nav-item {
      margin-bottom: 0;

      .nav-link {
        display: flex;
        align-items: center;
        padding: 0;
        color: rgba(${primaryDarkNew}, 0.3);
        font-family: 'GT-Walsheim-Pro-Regular';
        font-size: 16px;
        position: relative;
        padding: 13px 33px;
        min-height: 50px;

        &:hover,
        &.active {
          cursor: pointer;
          color: rgb(${darkGray});
          .icon {
            &.referral-icon {
              path {
                fill: rgba(${primaryNew});
                stroke: none;
              }
            }
            path,
            circle {
              stroke: rgb(${primaryNew});
            }
          }
        }
        &.active {
          &:after {
            content: '';
            width: 3px;
            height: 100%;
            background-color: rgb(${primaryNew});
            position: absolute;
            left: -2px;
            top: 0;
            bottom: 0;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
          }
          color: rgb(${primaryNew});
        }

        .icon {
          display: flex;
          margin-right: 16px;
          position: relative;

          .new-badge {
            display: none;
          }

          &.referral-icon {
            path {
              fill: rgba(${primaryDarkNew}, 0.3);
              stroke: none;
            }
          }
          svg {
            width: 15px;
            height: 15px;
          }

          ${media.extraLarge`
            svg {
              width: 20px;
              height: 20px;
            }
          `};

          path,
          circle {
            stroke: rgba(${primaryDarkNew}, 0.3);
          }
        }

        .menu-option {
          position: relative;
        }
      }
    }
  }
`;
