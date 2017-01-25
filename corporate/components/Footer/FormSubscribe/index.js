import React from 'react';
import classNames from 'classnames';
import { Well, Collapse } from 'react-bootstrap';

export default class FormSubscribe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      open: false,
    };
  }

  handleClick(ev) {
    ev.preventDefault();
    this.setState({ open: !this.state.open }, () => {
      this.button.classList.toggle('collapsed');
    })
  }

  render() {
    return (
      <form className='form-subscribe' data-formvalidation="true">
        <div className="container">
          <strong className="title pull-left">
            <a
              className="btn btn-primary close collapsed pull-right visible-xs"
              href="#"
              ref={(button) => { this.button = button; }}
              onClick={this.handleClick}
            >
              <span className="plus"></span>
            </a>
            Learn About Future Clinical Trials
          </strong>
          <Collapse className="holder" in={this.state.open}>
            <Well>
              <input type="submit" className="btn btn-default pull-right" value="submit" />
              <div className="fields-area">
                <div className="col-xs-4">
                  <input type="text" placeholder="* Full Name" data-required="true" className="form-control" />
                </div>
                <div className="col-xs-4">
                  <input type="email" placeholder="* Email" data-required="true" className="form-control" />
                </div>
                <div className="col-xs-4">
                  <input type="text" data-type="number" placeholder="* Mobile Phone" data-required="true" className="form-control" />
                </div>
              </div>
            </Well>
          </Collapse>
        </div>
      </form>
    );
  }
}
