import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import _ from 'lodash';

export class DashboardSponsorTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sponsors: PropTypes.object,
    editSponsor: PropTypes.func,
    deleteSponsor: PropTypes.func,
    setActiveSort: PropTypes.func,
    editSponsorProcess: PropTypes.object,
    sponsorSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';


    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  render() {
    let sponsors = this.props.sponsors.details;

    if (this.props.sponsorSearchFormValues.sponsor) {
      sponsors = _.filter(sponsors, (item) => (item.id === this.props.sponsorSearchFormValues.sponsor));
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      sponsors = _.orderBy(sponsors, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Sponsor<i className="caret-arrow"></i></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              sponsors.map((item, index) => (
                <RowItem key={index} item={item} editSponsor={this.props.editSponsor} deleteSponsor={this.props.deleteSponsor} editSponsorProcess={this.props.editSponsorProcess} />
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSponsorTable);
