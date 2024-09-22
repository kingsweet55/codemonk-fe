import styled from 'styled-components';
import { DropdownToggle, DropdownMenu } from 'reactstrap';
import { primaryNew, primaryDarkNew, white, black } from 'themes/variables';

export const ActionContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const ActionToggle = styled(DropdownToggle)`
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'GT-Walsheim-Pro-Bold';
  color: rgb(${white});
  border-radius: 23px;
  position: relative;
  transition: all 0.3s ease;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  line-height: 18px;
  height: 46px;
  min-width: 120px;

  &.btn-sm {
    font-size: 14px;
    line-height: 16px;
    min-width: auto;
    padding: 10px 20px;
    height: auto;
    font-family: 'GT-Walsheim-Pro-Medium' !important;
  }

  &.btn-outline {
    color: rgb(${primaryNew});
    border: 2px solid rgba(${primaryNew}, 0.2);
    font-family: 'GT-Walsheim-Pro-Bold';
    border-radius: 23px;
    background: rgb(${white});
    font-size: 16px;
    line-height: 18px;
    padding: 14px 30px;

    &.btn-sm {
      font-size: 14px;
      line-height: 16px;
      padding: 10px 20px;
      font-family: 'GT-Walsheim-Pro-Medium';
    }

    &:hover,
    &:active {
      border-color: rgba(${primaryNew});
    }
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    text-decoration: none;
  }
`;

export const ActionMenu = styled(DropdownMenu)`
  margin-top: 4px;
  border-radius: 3px;
  padding: 13px 33px;
  border: 0;
  box-shadow: 0 2px 14px rgba(${black}, 0.07);
  & .dropdown-item {
    font-size: 16px;
    letter-spacing: 0.25px;
    color: rgb(${primaryDarkNew});
    padding: 7px 0;

    &:hover,
    &:focus {
      font-weight: bold;
      background-color: transparent;
    }
    &:focus {
      outline: none;
    }

    &.active {
      background: none;
      color: rgb(${primaryDarkNew});
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 13px;
        left: -15px;
        width: 5px;
        height: 8px;
        border: solid rgb(${primaryDarkNew});
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`;
