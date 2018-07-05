import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import { selectCurrentUser } from '../../containers/App/selectors';
import { translate } from '../../../common/utilities/localization';
import './styles.less';


class SideNavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.any,
  };

  render() {
    return (
      <aside id="sidebar">
        <div className="sidebar-holder">
          <nav className="sidenav">
            <ul className="list-unstyled">
              <li>
                <Link to="/app/vendor" activeClassName="active">
                  <i className="icomoon-icon_house_alt" />
                  <div>{translate('portals.component.sideNavBar.home')}</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
