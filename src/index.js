import React, { Component } from 'react'
import ScrollReveal from 'scrollreveal'

console.log(Component);

/**
 *
 * @param {array|object} scrollRevealOptions
 * @constructor
 */
const ReactScrollreveal = (scrollRevealOptions = {}) => (Component) => {
  const sr = ScrollReveal();

  class ComponentWithScrollReveal extends Component {
    static displayName = 'ComponentWithScrollReveal';

    // TODO rename it, make real forEachRevealElement function
    /**
     * Iterates through all scrollRevealOptions and applies given function
     *
     * @param {function} fn
     * @return undefined
     */
    forEachRevealElement = fn => {
      if (Array.isArray(scrollRevealOptions)) {
        scrollRevealOptions.forEach(options => {
          fn(options);
        });
      } else if (typeof scrollRevealOptions === 'object') {
        fn(scrollRevealOptions);
      } else {
        throw new TypeError('Invalid arguments were passed');
      }
    };

    /**
     * Get reveal elements by given selector
     *
     * @param {string} selector
     * @return {NodeList}
     */
    getRevealElements(selector) {
      return !!selector ? this.block.querySelectorAll(selector) : this.block;
    }

    /**
     * Init scrollreveal for all releveal elements by selector
     *
     * @param {string} selector - selector that gets elements to reveal
     * @param {object} options - ScrollReveal's options (see https://github.com/jlmakes/scrollreveal#2-configuration)
     * @param {number} interval - ScrollReveal's interval value to make sequential animation
     */
    applyRevealAnimation = ({ selector, options = {}, interval }) => {
      const revealElements = this.getRevealElements(selector);
      const opts = Object.assign({}, options);

      // TODO check nodeType check
      if (revealElements.length || !!revealElements.nodeType) {
        sr.reveal(revealElements, opts, interval);
      }
    };

    /**
     * Initialize sr animations for every reveal element by given selector
     *
     * @return undefined
     */
    initialize() {
      if (!this.block) {
        return;
      }

      this.forEachRevealElement(this.applyRevealAnimation);
    }

    clearElementsSrInitiation = ({ selector }) => {
      const revealElements = Array.prototype.slice.apply(this.getRevealElements(selector));

      if (revealElements.length || !!revealElements.nodeType) {
        revealElements.forEach(node => {
          node.removeAttribute('style');
          node.removeAttribute('data-sr-id');
        });
      }
    };

    clear(clearStyles) {
      // clearing styles makes sr animation initialize again
      // on same element that were still in DOM
      if (clearStyles) {
        this.forEachRevealElement(this.clearElementsSrInitiation);
      }

      // remove event listeners
      // on component unmount event
      sr.destroy();
    }

    refresh() {
      this.clear(true);
      this.init();
    }

    componentDidMount() {
      this.initialize();
    }

    componentWillUpdate() {
      this.refresh();
    }

    componentWillUnmount() {
      this.clear();
    }

    getComponentRef = node => {
      // TODO: make sure we can or can't avoid setting block ref inside child Component
      if (!node) {
        this.block = node;
      } else {
        this.block = node.refs.block;
      }
    };

    render() {
      return <Component ref={this.getComponentRef} sr={sr} {...this.props} />;
    }
  }

  return ComponentWithScrollReveal;
};

export default ReactScrollreveal;
