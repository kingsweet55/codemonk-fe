import styled from 'styled-components';
import { primaryDarkNew, dangerNew, orange, primaryGradientRight, primaryNew, successNew, warningNew } from 'themes/variables';

const Badge = styled.span`
  color: rgb(${primaryDarkNew});
  font-family: 'GT-Walsheim-Pro-Regular';
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  font-size: 16px;
  line-height: 18px;
  padding: 6px 15px;
  border-radius: 15px;

  &.new-badge {
    font-size: 10px;
    font-family: 'GT-Walsheim-Pro-Regular';
    padding: 1px 5px;
    position: absolute;
    right: -32px;
    top: -4px;
    z-index: 9;
    border-radius: 10px;

    &.font-0 {
      width: 10px;
      height: 10px;
      right: -12px;
      background-color: rgb(${successNew}, 0.2);
    }

    @media (max-width: 1199px) {
      right: -7px;
      top: -12px;
      font-size: 8px;
    }
  }

  &.light {
    background-color: rgba(${primaryDarkNew}, 0.1);
    color: rgb(${primaryDarkNew});
  }
  &.success {
    background-color: rgba(${successNew}, 0.1);
    color: rgb(${successNew});
  }
  &.warning {
    background-color: rgba(${warningNew}, 0.1);
    color: rgb(${warningNew});
  }
  &.danger {
    background-color: rgba(${dangerNew}, 0.1);
    color: rgb(${dangerNew});
  }
  &.alert {
    background-color: rgba(${orange}, 0.1);
    color: rgb(${orange});
  }
  &.primary {
    background: ${primaryGradientRight};
  }
  &.secondary {
    background: rgb(${primaryNew}, 0.1);
  }
  &.badge-sm {
    font-size: 14px;
    line-height: 16px;
    padding: 4px 10px;
    border-radius: 12px;
  }
  &.badge-status {
    border-radius: 12px;
    margin-bottom: 0px;
  }
`;
export default Badge;
