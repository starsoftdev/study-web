import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';

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
              <li><a onClick={() => this.handleClickOutside()}>Help and Support</a></li>
              <li><a onClick={() => this.handleClickOutside()}>Videos</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(HelpMenu);
