import React from 'react';

export default class FormSubscribe extends React.Component {
  render() {
    return (
      <form className="form-subscribe" data-formvalidation="true">
        <div className="container">
          <strong className="title pull-left">Learn About Future Clinical Trials</strong>
          <div className="holder">
            <input type="submit" className="btn btn-default pull-right" value="submit" />
            <div className="fields-area">
              <div className="col-xs-4">
                <input type="text" placeholder="* Full Name" data-required="true" className="form-control" />
              </div>
              <div className="col-xs-4">
                <input type="email" placeholder="* Email" data-required="true" className="form-control" />
              </div>
              <div className="col-xs-4">
                <input
                  type="text"
                  data-type="number"
                  placeholder="* Mobile Phone"
                  data-required="true"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
