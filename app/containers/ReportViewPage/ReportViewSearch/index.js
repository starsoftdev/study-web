import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';
import Button from 'react-bootstrap/lib/Button';
import ReactSelect from 'components/Input/ReactSelect';

@reduxForm({ form: 'searchReports' })

export class ReportViewSearch extends React.Component {
  static propTypes = {
  }

  render() {
    const testOptions = [
      {
        label: 'test1',
        value: 'test1',
      },
      {
        label: 'test2',
        value: 'test2',
      },
    ];
    return (
      <div className="search-controls form-search clearfix">
        <div className="btns-area pull-right full-width">
          {/* TODO: remove tmp styles */}
          <div className="col pull-right">
            <a href="#" className="btn btn-primary lightbox-opener"><i className="icon-icon_download"></i> download</a>
          </div>
          <div className="col pull-right">
            <a href="#add-credits" className="btn btn-primary lightbox-opener"><i className="icon-icon_creditcard"></i> add credits</a>
          </div>
          <div className="col pull-right">
            <a href="#add-site-popup" className="btn btn-primary lightbox-opener">+ add site</a>
          </div>
          <div className="col pull-right">
            <a href="#date-range" className="btn btn-primary lightbox-opener"><i className="icomoon-icon_calendar"></i> Date Range</a>
          </div>
        </div>
        <div className="fields-holder full-width">
          <div className="search-area pull-left">
            <div className="has-feedback">
              <Button className="btn-enter">
                <i className="icomoon-icon_search2" />
              </Button>
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="status"
              component={ReactSelect}
              placeholder="Select Study Status"
              options={testOptions}
            />
          </div>
          <div className="pull-left custom-select">
            <Field
              name="source"
              component={ReactSelect}
              placeholder="Select Source"
              options={testOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewSearch);
