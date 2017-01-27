import React from 'react';
import { Well, Collapse } from 'react-bootstrap';

export default class FormSubscribe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);
    this.onMouseOutHandler = this.onMouseOutHandler.bind(this);
    this.handleCollapseProcess = this.handleCollapseProcess.bind(this);
    this.handleCollapseEnd = this.handleCollapseEnd.bind(this);

    this.state = {
      open: false,
    };
  }

  handleClick(ev) {
    ev.preventDefault();
    this.setState({ open: !this.state.open }, () => {
      this.button.classList.toggle('collapsed');
    });
  }

  // TODO: need to refactor DOM operations below
  handleCollapseProcess(ev) {
    document.getElementById('closeFormButton').classList.add('focused');
  }

  handleCollapseEnd(ev) {
    document.getElementById('closeFormButton').classList.remove('focused');
  }

  onMouseOverHandler(ev) {
    document.getElementById('closeFormButton').classList.add('focused');
  }

  onMouseOutHandler(ev) {
    document.getElementById('closeFormButton').classList.remove('focused');
  }

  render() {
    return (
      <form className="form-subscribe" data-formvalidation="true">
        <div className="container">
          <strong className="title pull-left">
            <button
              className="btn btn-primary close collapsed pull-right visible-xs"
              ref={(button) => { this.button = button; }}
              id="closeFormButton"
              onClick={this.handleClick}
              onMouseOut={this.onMouseOutHandler}
              onMouseOver={this.onMouseOverHandler}
            >
              <span className="plus"></span>
            </button>
            Learn About Future Clinical Trials
          </strong>
          <Collapse
            className="holder"
            in={this.state.open}
            onEnter={this.handleCollapseProcess}
            onExit={this.handleCollapseProcess}
            onEntered={this.handleCollapseEnd}
            onExited={this.handleCollapseEnd}
          >
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
