import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';

class InfoHeader extends React.Component {
  static displayName = 'InfoHeader';
  static propTypes = {
    /** Class Props **/
    title: React.PropTypes.string,
    type: React.PropTypes.string,
    description: React.PropTypes.string,
    classes: React.PropTypes.object,
    /** Router Props **/
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    history: React.PropTypes.object,
    /** Modules Props **/
    isOpen: React.PropTypes.bool,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  toggleState = () => {
    this.props.setSiteState({
      isOpen: !this.props.isOpen,
    });
  }

  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { isOpen, title, type, description } = this.props;
    const stateClass = isOpen ? 'open' : 'close';
    return (
      <div {...resolve(this.props, 'container', stateClass)}>
        <div {...resolve(this.props, 'content')}>
          <h2 {...resolve(this.props, 'header', stateClass || null)} onClick = {this.toggleState}>
            {type} | {title}
            <div {...resolve(this.props, 'indicator', stateClass || null)} />
          </h2>
          <div {...resolve(this.props, 'infoContent', stateClass || null)}>
            <p dangerouslySetInnerHTML={{ __html: description }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  const stateObject = {
    isOpen: state.site.isOpen,
  };
  return stateObject;
}, { setSiteState })(withRouter(InfoHeader));
