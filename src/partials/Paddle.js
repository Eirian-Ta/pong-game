import { SVG_NS, KEYS } from '../settings'

export default class Paddle {
  constructor(boardHeight, width, height, x, y, paddleUp, paddleDown) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case paddleUp:
          this.y = Math.max(0, this.y - this.speed);
          break;
        case paddleDown:
          this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
          break;
        case KEYS.m:
          this.changeMode();
          break;
        }
    });
  }


  changeMode() {
    if (this.height === 56) {
      this.height = 30;
      this.speed = 15;
    }
    else {
      this.height = 56;
      this.speed = 10;
    }
  }

    coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

   render(svg) {
    let paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'fill', 'orange');

    svg.appendChild(paddle);
  }
}


