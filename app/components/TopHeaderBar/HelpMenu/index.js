import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router';
class HelpMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      HelpMenuOpen: false,
    };
    this.toggleHelpMenuHandle = this.toggleHelpMenuHandle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleHelpMenuHandle() {
    this.setState({
      HelpMenuOpen: !this.state.HelpMenuOpen,
    });
  }

  handleClickOutside() {
    this.setState({ HelpMenuOpen: false });
  }

  render() {
    const HelpMenuClassName = this.state.HelpMenuOpen ? 'help-menu-open' : 'help-menu-close';

    return (
      <div className="help-menu-box open-close pull-left">
        <a className={classNames('link-help pull-left opener', { active: this.state.HelpMenuOpen })} onClick={this.toggleHelpMenuHandle}>
          ?
        </a>
        <div className={`help-menu ${HelpMenuClassName}`}>
          <div className="well">
            <ul className="list-unstyled">
              <li><Link to="/app/help-support" onClick={() => this.handleClickOutside()}>Help and Support</Link></li>
              <li><Link to="/app/videos" onClick={() => this.handleClickOutside()}>Videos</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(HelpMenu);
