import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollReveal from 'scrollreveal';

const scrollreveal = ScrollReveal();

class RevealItem extends Component {
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
      scrollreveal.reveal(element, {
        ...this.scrollrevealOptions
      });
    }
  }

  componentWillUnmount() {
    const element = this.revealElement.current;
    if (element) {
      scrollreveal.clean(element);
    }
  }

  get scrollrevealOptions() {
    const {
      delay,
      distance,
      duration,
      easing,
      interval,
      opacity,
      origin,
      rotate,
      scale,
      cleanup,
      container,
      desktop,
      mobile,
      reset,
      useDelay,
      viewFactor,
      viewOffset,
      afterReset,
      afterReveal,
      beforeReset,
      beforeReveal
    } = this.props;

    return {
      delay,
      distance,
      duration,
      easing,
      interval,
      opacity,
      origin,
      rotate,
      scale,
      cleanup,
      container,
      desktop,
      mobile,
      reset,
      useDelay,
      viewFactor,
      viewOffset,
      afterReset,
      afterReveal,
      beforeReset,
      beforeReveal
    };
  }

  get revealComponentProps() {
    const {
      delay,
      distance,
      duration,
      easing,
      interval,
      opacity,
      origin,
      rotate,
      scale,
      cleanup,
      container,
      desktop,
      mobile,
      reset,
      useDelay,
      viewFactor,
      viewOffset,
      afterReset,
      afterReveal,
      beforeReset,
      beforeReveal,
      ...revealComponentProps
    } = this.props;

    return revealComponentProps;
  }

  render() {
    const { component: RevealComponent, children } = this.props;
    if (!children) return null;

    return (
      <RevealComponent ref={this.revealElement} {...this.revealComponentProps}>
        {children}
      </RevealComponent>
    );
  }
}

export default RevealItem;
