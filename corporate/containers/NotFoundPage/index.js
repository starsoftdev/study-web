import React from 'react';

export default class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);

    console.log('NotFound');
  }

  componentWillMount() {}

  componentWillReceiveProps() {}

  render() {
    return (
      <div id="">
        NotFound layout will be here soon.
      </div>
    );
  }
}
