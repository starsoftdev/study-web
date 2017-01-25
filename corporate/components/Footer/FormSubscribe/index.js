import React from 'react';
import classNames from 'classnames';

export default class FormSubscribe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      menuCollapsed: true,
    };
  }

  handleClick(ev) {
    ev.preventDefault();
    this.button.classList.toggle('collapsed');
    this.setState({ menuCollapsed: this.button.classList.contains('collapsed') });
  }

  render() {
    const { menuCollapsed } = this.state;
    return (
      <form
        className={classNames('form-subscribe', { active: !menuCollapsed })}
        data-formvalidation="true"
      >
        <div className="container">
          <strong className="title pull-left">
            <a 
              className="btn btn-primary close collapsed pull-right visible-xs" 
              data-class=".form-subscribe" role="button" data-toggle="collapse"
              href="#collapseExample" 
              aria-expanded="false" 
              aria-controls="collapseExample"
              ref={(button) => { this.button = button; }}
              onClick={this.handleClick}
            >
              <span className="plus"></span>
            </a>
            Learn About Future Clinical Trials
          </strong>
          <div
            className={classNames('holder collapse', { in: !menuCollapsed })}
            id="collapseExample"
            aria-expanded="false"
          >
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
          </div>
        </div>
      </form>
    );
  }
}
