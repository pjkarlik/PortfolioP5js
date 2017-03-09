import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import { connect } from 'react-redux';
import dat from 'dat-gui';

import { setSiteState } from '../redux/modules/site';
import SketchWrapper from '../components/SketchWrapper';

import SiteStyles from '../styles/Site.less';

import sketch from '../sketches/Simplex_p5';

const Header = (props) => {
  const { children } = props;
  return (
    <div {...resolve(props, 'section', 'header')}>
      <div {...resolve(props, 'center')}>
        <div {...resolve(props, 'logoThumb', 'top')}>
          {children}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  children: React.PropTypes.string,
};


class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Router Props **/
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    history: React.PropTypes.object,
    /** Modules Props **/
    config: React.PropTypes.object,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };

  static defaultProps = {
    classes: SiteStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      iteration: (40 + Math.random() * 30) / 10,
      strength: (25 + Math.random() * 15),
      speed: (5 + Math.random() * 15),
      waveSpeed: 100,
      tempZoom: -50,
      shaderType: 'splash',
      objectType: 'plane',
    };
    this.setSizes();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkPosition);
    window.addEventListener('resize', this.setSizes);
    this.createGUI();
    this.checkPosition();
  }

  componentWillReceiveProps() {
  }

  setSizes = () => {
    this.width = (document.documentElement.clientWidth, window.innerWidth || 0);
    this.height = (document.documentElement.clientHeight, window.innerHeight || 0);
  }

  setOptions = (options) => {
    // console.log(options);
    this.setState({
      ...options,
    });
  }

  checkPosition = () => {
    // const { config } = this.props;
    const top = document.body.scrollTop;
    if (top < this.height) {
      this.setState({
        shaderType: 'splash',
        tempZoom: -50,
        background: [0, 0, 0],
      });
    }
    if (top > this.height && top < this.height * 2) {
      this.setState({
        shaderType: 'editor',
        tempZoom: -1550,
        background: [255, 255, 255],
      });
    }
    if (top > (this.height * 2) + 300) {
      this.setState({
        shaderType: 'outro',
        tempZoom: -500,
        background: [40, 90, 90],
      });
    }
  };

  createGUI = () => {
    this.config = {
      ...this.state,
    };
    this.gui = new dat.GUI({ autoPlace: false });
    this.datwindow.appendChild(this.gui.domElement);
    const folderRender = this.gui.addFolder('Render Options');
    folderRender.add(this.config, 'iteration', 0.1, 10).step(0.1)
      .onFinishChange((value) => {
        this.config.iteration = value;
        this.setOptions({ iteration: value });
      });
    folderRender.add(this.config, 'strength', 10, 80).step(1)
      .onFinishChange((value) => {
        this.config.strength = value;
        this.setOptions({ strength: value });
      });
    folderRender.add(this.config, 'speed', 0, 100).step(1)
      .onFinishChange((value) => {
        this.config.speed = value;
        this.setOptions({ speed: value });
      });
    folderRender.add(this.config, 'waveSpeed', 50, 600).step(1)
      .onFinishChange((value) => {
        this.config.waveSpeed = value;
        this.setOptions({ waveSpeed: value });
      });
    folderRender.add(this.config, 'objectType',
    ['plane', 'box'])
    .onFinishChange((value) => {
      this.config.objectType = value;
      this.setOptions({ objectType: value });
    });
    folderRender.open();
  };

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes } = this.props;
    const config = {
      ...this.state,
    };
    return (
      <div {...resolve(this.props, 'container')} ref={(ref) => this.container = ref}>
        <SketchWrapper {...resolve(this.props, 'sketch')} config={config} sketch = { sketch } />
        <Header classes = {classes}>paul j karlik | ui architect</Header>
        <div {...resolve(this.props, 'section', 'base')}>
          <div {...resolve(this.props, 'content')}>
            <div className = {classes.threefour}>
              <h3>Hello,<br />I'm Paul!</h3>
              <p>
                I am a User Interface Architect, Front-End Developer and Creative Technologist.
                <br/><br/>
                I create unique interfaces, mix art and technology and explore visual design in code. Current skills
                include HTML/CSS/LESS, JavaScript/ES6, React, Redux, Webpack, CSS Modules and Node.
                <br/><br/>
                ...also enjoys other languages and platforms such as Processing, Arduino and Raspberry Pi.
              </p>
            </div>
            <div {...resolve(this.props, 'onethird', 'right')}>
              <h4>Simplex Noise</h4>
              <p>
                The background you see above is a visualization of simplex noise. The function takes the vector points
                of the grid, and though a set of computations results in an ever changing data set. Each color is
                created by the application of sine/cosine waves based on that data set.
              </p>
            </div>
          </div>
        </div>
        <div {...resolve(this.props, 'section', 'accent')}>
          <div {...resolve(this.props, 'logoThumb', 'bottom')}>&nbsp;</div>
          <div className = {classes.content}>
            <div className = {classes.datcontainer} ref={(ref) => this.datwindow = ref} />
            <div {...resolve(this.props, 'onethird')}>
              <h4>p5.js interactive sketch</h4>
                <p>
                  Interact with the p5.js sketch with the attached dat.gui. These are just some of
                  the properties that can effect the visual outcome of the waveform.
                  <br /><br /><br /><br /><br /><br /><br />
                  <br /><br /><br /><br /><br /><br /><br />
                  <br /><br /><br /><br /><br /><br /><br />
                </p>
              </div>
          </div>
        </div>
        <Header classes = {classes}>connections and resources</Header>
        <div {...resolve(this.props, 'section', 'base')}>
          <div {...resolve(this.props, 'content')}>
            <div className = {classes.threefour}>
              <p>
                p5.js is a JavaScript library that is based off the Processing language. Processing itself is a language
                for coding complex interactions within the context of the visual arts. More about processing at
                <a href="http://p5js.org" target="_blank">{'http://p5js.org'}</a>
                <br /><br />
                This sketch is a visualization of dynamic data points produced by a simplex noise. That is
                an n-dimensional noise function. Simplex noise divides the space into dimensional triangles.
                Each simplex vertex is added back to the base coordinate and hashed into a pseudo-random gradient
                direction. Read more about
                <a href="https://en.wikipedia.org/wiki/Simplex_noise" target="_blank">simplex noise</a>
                here..
                Using time as a variable, we step though the animations evolving dataset.
                The colors are produced by running a sine and cosine formula for each point on this moving grid.
                <br /><br />
                Using React.js and Redux I've also created and a wrapper component that loads and executes the p5.js
                sketch inside it's lifecycle. This let's us to cool things between unique running frameworks.
              </p>
            </div>
            <div {...resolve(this.props, 'onethird', 'right')}>
              <h4>Simplex Noise</h4>
              <p>
                The background you see above is a visualization of simplex noise. The function takes the vector points
                of the grid, and though a set of computations results in an ever changing data set. Each color is
                created by the application of sine/cosine waves based on that data set.
              </p>
            </div>
          </div>
        </div>
        <div {...resolve(this.props, 'section', 'accent')}>
          <div {...resolve(this.props, 'logoThumb', 'bottom')}>&nbsp;</div>
          <div {...resolve(this.props, 'content')}>
            <h3></h3>
            <p>
            </p>
          </div>
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  const stateObject = {
    config: state.site.config,
  };
  return stateObject;
}, { setSiteState })(withRouter(Home));
