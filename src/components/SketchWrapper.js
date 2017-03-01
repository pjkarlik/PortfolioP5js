import React from 'react';
import p5 from 'p5';

export default class SketchWrapper extends React.Component {
  static displayName = 'SketchWrapper'
  static propTypes = {
    /** p5js Sketch to be executed in wrapper. */
    sketch: React.PropTypes.func,
    /** p5js Sketch to be executed in wrapper. */
    config: React.PropTypes.object,
    /** className for wrapper container. */
    className: React.PropTypes.string,
    /** inline style for wrapper container. */
    style: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.myp5 = undefined;
  }

  componentDidMount() {
    const { sketch } = this.props;
    this.handleSketch(sketch);
  }

  componentWillReceiveProps(newprops) {
    const { sketch, config } = this.props;
    if (sketch !== newprops.sketch) {
      this.handleRemove();
      this.handleSketch();
    }
    if (config !== newprops.config) {
      this.handleconfig();
    }
  }

  componentWillUnmount() {
    this.handleRemove();
  }

  handleRemove = () => {
    this.wrapper.removeChild(this.wrapper.childNodes[0]);
  }

  handleconfig = () => {
    const { config } = this.props;
    this.myp5.setOptions(config);
  }

  /**
   * Loads a p5js sketch into the div wrapper
   * @param {Function} sketch
   */
  handleSketch = (sketch) => {
    /* eslint new-cap: 0 */
    this.myp5 = new p5(sketch, this.wrapper);
  }

  render() {
    const wrapper = (container) => { this.wrapper = container; };
    return (
      <div ref={wrapper} {...this.props} />
    );
  }
}
