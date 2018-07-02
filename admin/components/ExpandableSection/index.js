import React, { Component, PropTypes } from 'react';

export class ExpandableSection extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    content: PropTypes.object,
    seeMoreHandler: PropTypes.function,
  };

  constructor() {
    super();

    this.handleShowMoreBtn = this.handleShowMoreBtn.bind(this);

    this.state = {
      expanded: false,
    };
  }

  handleShowMoreBtn() {
    this.setState({ expanded: !this.state.expanded });
    if (!this.state.expanded) {
      this.props.seeMoreHandler();
    }
  }

  render() {
    return (
      <div className={`expendableSection ${this.state.expanded ? 'expanded' : ''}`}>
        {this.props.content}
        <button className="showMoreBtn" onClick={this.handleShowMoreBtn}>{this.state.expanded ? 'See less' : 'See more'}</button>
      </div>
    );
  }
}

export default ExpandableSection;
