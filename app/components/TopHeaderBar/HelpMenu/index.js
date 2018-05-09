import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import FeedbackWidget from '../../../../common/utilities/feedback';
import { selectCurrentUserEmail, selectCurrentUserFullName, selectCurrentUserId } from '../../../containers/App/selectors';
import { translate } from '../../../../common/utilities/localization';


class HelpMenu extends React.Component {
  static propTypes = {
    currentUserEmail: React.PropTypes.string,
    currentUserFullName: React.PropTypes.string,
    currentUserId: React.Proptypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      HelpMenuOpen: false,
    };
  }

  toggleHelpMenuHandle = () => {
    this.setState({
      HelpMenuOpen: !this.state.HelpMenuOpen,
    });
  }

  handleClickOutside = () => {
    this.setState({ HelpMenuOpen: false });
  }

  handleCustomerFeedbackClick = () => {
    const feedbackWidget = new FeedbackWidget();
    feedbackWidget.init({
      clickTarget: 'HELP_MENU',
      email: this.props.currentUserEmail,
      name: this.props.currentUserFullName,
      userId: this.props.currentUserId,
    });
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
              <li><a onClick={this.handleCustomerFeedbackClick}>Customer Feedback</a></li>
              <li><Link to="/app/help-support" onClick={this.handleClickOutside}>{translate('portals.component.topHeaderBar.helpMenu.helpSupport')}</Link></li>
              <li><Link to="/app/tutorials" onClick={this.handleClickOutside}>{translate('portals.component.topHeaderBar.helpMenu.tutorials')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserEmail: selectCurrentUserEmail(),
  currentUserFullName: selectCurrentUserFullName(),
  currentUserId: selectCurrentUserId(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(HelpMenu));
