import loadable from '../Loadable';

describe('Personal detail Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const test = loadable(jest.fn(), {});
    test.props.fallback.type();
    // eslint-disable-next-line no-underscore-dangle
    test.props.children.type._ctor();
  });
});
