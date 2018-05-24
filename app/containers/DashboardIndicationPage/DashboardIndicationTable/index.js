import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';
import RowItem from './RowItem';
import { selectIndications, selectPaginationOptions } from '../selectors';
export class DashboardIndicationTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.object,
    levels: PropTypes.object,
    editIndication: PropTypes.func,
    deleteIndication: PropTypes.func,
    addIndicationProcess: PropTypes.object,
    indicationSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
    loadMore: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'name';
    this.props.setActiveSort(defaultSort, null);
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
    if (!this.props.indications) {
      return null;
    }

    const { indications, levels } = this.props;
    let indication = indications.details;
    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      if (this.props.paginationOptions.activeSort === 'tier') {
        indication = _.orderBy(indication, [(o) => {
          if (o.patientIndicationGoals && o.patientIndicationGoals.length > 0) {
            return o.patientIndicationGoals[0].tierNumber;
          }
          return null;
        }], [dir]);
      } else {
        indication = _.orderBy(indication, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
      }
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >

          <table className="table-manage-user table">
            <caption>&nbsp;</caption>

            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Indication<i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="tier" className={`th ${(this.props.paginationOptions.activeSort === 'tier') ? this.props.paginationOptions.activeDirection : ''}`}>TIER <i className="caret-arrow" /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                indication.map((item, index) => (
                  <RowItem key={index} item={item} levels={levels} editIndication={this.props.editIndication} deleteIndication={this.props.deleteIndication} addIndicationProcess={this.props.addIndicationProcess} />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  {this.props.indications.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
                </td>
              </tr>
            </tfoot>
          </table>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardIndicationTable);
