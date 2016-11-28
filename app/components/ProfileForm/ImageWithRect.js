import React, { Component, PropTypes } from 'react';

export default class ImageWithRect extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    rect: PropTypes.object,
    image: PropTypes.object,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.redraw = this.redraw.bind(this);
  }
  componentDidMount() {
    this.redraw();
  }

  componentDidUpdate() {
    this.redraw();
  }

  onLoad(img) {
    const { rect, width, height } = this.props;
    const root = this.root;
    const ctx = root.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    if (rect) {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(
        Math.round(rect.x * width) + 0.5,
        Math.round(rect.y * height) + 0.5,
        Math.round(rect.width * width),
        Math.round(rect.height * height)
      );
    }
  }

  redraw() {
    let img = new Image();
    img.onload = this.onLoad.bind(this);
    img.src = this.props.image;
  }

  render() {
    return (
      <canvas
        ref={(root) => {
          this.root = root;
        }}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}