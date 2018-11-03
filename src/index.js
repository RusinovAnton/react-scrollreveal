import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollReveal from 'scrollreveal';

const scrollreveal = ScrollReveal();

class Reveal extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  };
  static defaultProps = {
    component: 'div'
  };

  revealElement = React.createRef();

  componentDidMount() {
    const element = this.revealElement.current;
    if (element) {
      scrollreveal.reveal(element, { reset: true });
    }
  }

  componentWillUnmount() {
    const element = this.revealElement.current;
    if (element) {
      scrollreveal.clean(element);
    }
  }

  render() {
    const { component: RevealComponent, children } = this.props;
    if (!children) return null;

    return <RevealComponent ref={this.revealElement}>{children}</RevealComponent>;
  }
}

export default Reveal;
