import React from 'react' // eslint-disable-line semi
import ScrollReveal from 'scrollreveal' // eslint-disable-line semi


/**
 * Creates React Component that will have animated elements on scroll
 *
 * @param {Array|object} srOptions
 * @param {string} srOptions.selector
 * @param {object} srOptions.options
 * @param {number} srOptions.interval
 * @return {function} React component
 */
const ReactScrollreveal = (srOptions = {}) => (Component) => {
  const sr = ScrollReveal();

  class ComponentWithScrollReveal extends React.Component {
    static displayName = 'ComponentWithScrollReveal';

    componentDidMount() {
      this.initialize();
    }

    componentWillUpdate() {
      this.refresh();
    }

    componentWillUnmount() {
      this.clear();
    }

    /**
     *
     * @param {function} fn
     */
    forEachSrElement = (fn) => {
      const elements = [];

      this.forEachSrOption(({ selector }) => {
        elements.concat(Array.prototype.slice.apply(document.querySelectorAll(selector)));
      });

      elements.forEach(fn);
    };

    /**
     * Iterates through all srOptions and applies given function
     *
     * @param {function} fn
     * @return undefined
     */
    forEachSrOption = (fn) => {
      if (Array.isArray(srOptions)) {
        srOptions.forEach((options) => {
          fn(options);
        });
      } else if (typeof srOptions === 'object') {
        fn(srOptions);
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
      return selector ? this.animationContainer.querySelectorAll(selector) :
        this.animationContainer;
    }

    /**
     * Init scrollreveal for all reveal elements by selector
     *
     * @param {number} interval - ScrollReveal's interval value to make sequential animation
     * @param {object} options - ScrollReveal's options (see https://github.com/jlmakes/scrollreveal#2-configuration)
     * @param {string} selector - selector that gets elements to reveal
     */
    applyRevealAnimation = ({ selector, options = {}, interval }) => {
      const revealElements = this.getRevealElements(selector);
      const opts = Object.assign({}, options);

      // revealElements can be NodeList or single node
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
      if (!this.animationContainer) {
        return;
      }

      this.forEachSrOption(this.applyRevealAnimation);
    }

    clear(clearStyles) {
      // clearing styles makes sr animation initialize again
      // on same element that were still in DOM
      if (clearStyles) {
        this.forEachSrElement(sr.clean);
      } else {
        // remove event listeners
        // on component unmount event
        sr.destroy();
      }
    }

    refresh() {
      this.clear(true);
      this.initialize();
    }

    /**
     * Gets ref to the child's component desired animation container DOM node
     *
     * @param {object} node
     * @return undefined
     */
    getRef = (node) => {
      if (typeof node.nodeType === 'number') {
        this.animationContainer = node;
      } else {
        throw new Error('You should put animationContainerReference on DOM node, not React component.');
      }
    };

    render() {
      return (
        <Component
          animationContainerReference={this.getRef}
          destroyRevealAnimation={this.clear}
          refreshRevealAnimation={this.refresh}
          {...this.props}
        />
      );
    }
  }

  return ComponentWithScrollReveal;
};

export default ReactScrollreveal;
