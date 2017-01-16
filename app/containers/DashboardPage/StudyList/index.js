import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, change } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../../../components/Input/Checkbox';
import ReactSelect from 'components/Input/ReactSelect';
import ReactMultiSelect from 'components/Input/ReactMultiSelect';
import StudyItem from './StudyItem';
import { StickyContainer, Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';

class StudyList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.array,
    change: PropTypes.func,
    paginationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.toggleAllStudySelection = this.toggleAllStudySelection.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  toggleAllStudySelection(checked) {
    const { change, studies } = this.props;
    for (const patient of studies.details) {
      change(`patient-${patient.id}`, checked);
    }
  }

  loadItems() {
    // this.props.searchPatients(this.props.paginationOptions.prevSearchFilter, false);
  }

  sortBy(ev) {
    ev.preventDefault();
    // let sort = ev.currentTarget.dataset.sort;
    // let direction = 'up';

    // if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
    //   direction = 'down';
    // } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
    //   direction = null;
    //   sort = null;
    // }

    // this.props.setActiveSort(sort, direction);

    // if (sort !== 'orderNumber') {
    //   this.props.searchPatients({ ...this.props.paginationOptions.prevSearchFilter, sort, direction }, true);
    // } else {
    //   const dir = ((direction === 'down') ? 'desc' : 'asc');
    //   const sortedPatients = _.orderBy(this.props.studies.details, [function (o) {
    //     return o.orderNumber;
    //   }], [dir]);
    //   this.props.sortPatientsSuccess(sortedPatients);
    // }
  }

  render() {
    const { studies } = this.props;
    console.log('studylist', studies);
    const studyListContents = studies.map((item, index) => {
      return (
        <StudyItem {...item} key={index} index={index} />
      );
    });

    const campaignOptions = [{ label: 'Newest', id: 0 },
                           { label: '10', value: 10, id: 1 },
                           { label: '9', value: 9, id: 2 },
                           { label: '8', value: 8, id: 3 },
                           { label: '7', value: 7, id: 4 },
                           { label: '6', value: 6, id: 5 },
                           { label: '5', value: 5, id: 6 },
                           { label: '4', value: 4, id: 7 },
                           { label: '3', value: 3, id: 8 },
                           { label: '2', value: 2, id: 9 },
                           { label: 'Oldest', value: -1, id: 10 },
                           ];

    return (
      <div className="patient-database-fixed-table-wrapper">
        <StickyContainer className="table-holder fixed-table">
          <Sticky className="fixed-table-sticky-header">
            <header className="fixed-table-head">
              <h2 className="pull-left">{studies.length} STUDIES</h2>
              <div className="btns pull-right">
                <div className="select pull-left">
                  <Field
                    name="data-search"
                    className="select"
                    component={ReactSelect}
                    placeholder="Campaign"
                    searchPlaceholder="Search"
                    searchable
                    options={campaignOptions}
                    customSearchIconClass="icomoon-icon_search2"
                  />
                </div>
                <Button
                  bsStyle="primary"
                  className="pull-left"
                  onClick={() => {}}
                >
                  <i className="icomoon-icon_calendar"></i>
                  Date Range
                </Button>
                <Button
                  bsStyle="primary"
                  className="pull-left"
                  onClick={() => {}}
                >
                  <i className="icomoon-icon_download"></i>
                  Download
                </Button>
              </div>
            </header>
            <div className="fixed-table-thead">
              <div className="table">
                <div className="thead">
                  <div className="tr">
                    <div className="th">
                      <Field
                        name="all-studies"
                        type="checkbox"
                        component={Checkbox}
                        onChange={this.toggleAllStudySelection}
                      />
                    </div>
                    <div onClick={this.sortBy} data-sort="status" className={`th ${(this.props.paginationOptions.activeSort === 'status') ? this.props.paginationOptions.activeDirection : ''}`}>STATUS<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="orderNumber" className={`th ${(this.props.paginationOptions.activeSort === 'orderNumber') ? this.props.paginationOptions.activeDirection : ''}`}>#<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="studyInfo" className={`th ${(this.props.paginationOptions.activeSort === 'studyInfo') ? this.props.paginationOptions.activeDirection : ''}`}>STUDY INFO<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="siteInfo" className={`th ${(this.props.paginationOptions.activeSort === 'siteInfo') ? this.props.paginationOptions.activeDirection : ''}`}>SITE INFO<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="indication" className={`th ${(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}`}>INDICATION<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="location" className={`th ${(this.props.paginationOptions.activeSort === 'location') ? this.props.paginationOptions.activeDirection : ''}`}>LOCATION<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="exposureLevel" className={`th ${(this.props.paginationOptions.activeSort === 'exposureLevel') ? this.props.paginationOptions.activeDirection : ''}`}>EXPOSURE LEVEL<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="goal" className={`th ${(this.props.paginationOptions.activeSort === 'goal') ? this.props.paginationOptions.activeDirection : ''}`}>GOAL<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="patients" className={`th ${(this.props.paginationOptions.activeSort === 'patients') ? this.props.paginationOptions.activeDirection : ''}`}>PATIENTS<i className="caret-arrow" /></div>
                  </div>
                </div>
              </div>
            </div>
          </Sticky>

          {(() => {
            if (studies.length > 0) {
              return (
                <div className="table">
                  <InfiniteScroll
                    className="tbody"
                    pageStart={0}
                    loadMore={this.loadItems}
                    initialLoad={false}
                    hasMore={this.props.paginationOptions.hasMoreItems}
                  >
                    {studyListContents}
                  </InfiniteScroll>
                </div>
              );
            }
            return false;
          })()}
        </StickyContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    // change: (field, value) => dispatch(change(formName, field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyList);
