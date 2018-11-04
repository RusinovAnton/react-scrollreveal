import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ContainerProvider } from './context';

class RevealContainer extends Component {
  static propTypes = { component: PropTypes.oneOfType(PropTypes.string, PropTypes.func) };
  static defaultProps = {
    component: 'div'
  };

  scrollingContainer = React.createRef();

  render() {
    const { component: ContainerComponent, children } = this.props;

    if (!children) return null;
    return (
      <ContainerProvider value={this.scrollingContainer.current}>
        <ContainerComponent ref={this.scrollingContainer}>{children}</ContainerComponent>
      </ContainerProvider>
    );
  }
}

export default RevealContainer;
