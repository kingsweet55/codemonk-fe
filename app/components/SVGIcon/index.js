import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { primaryDarkNew } from 'themes/variables';

const SVGIcon = styled(SVG)`
  path,
  circle {
    stroke: ${props => (props.iconColor ? props.iconColor : primaryDarkNew)};
  }
  g {
    fill: ${props => (props.iconColor ? props.iconColor : primaryDarkNew)};
  }
`;

export default SVGIcon;

export const Empty = styled(SVG)`
  & path {
    stroke: rgb(${primaryDarkNew}, 0.3);
  }
`;
