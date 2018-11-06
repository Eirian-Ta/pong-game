import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Winner from './Winner';


export default class Game {

	constructor(element, width, height, pause) {
		this.element = element;
		this.width = width;
		this.height = height;
    this.pause = false;

    this.ping4 = new Audio("public/sounds/pong-04.wav");

		this.gameElement = document.getElementById(this.element);

		//Create the Board
		this.board = new Board(this.width, this.height);
	
		// Create the Paddles
		this.paddleWidth = 8;
 		this.paddleHeight = 56;
  	this.boardGap = 10;
  	
  	this.player1Paddle = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z,
    )

    this.player2Paddle = new Paddle(
    	this.height,
    	this.paddleWidth,
    	this.paddleHeight,
    	(this.width - this.boardGap - this.paddleWidth),
    	((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down,
    )

    //Create the Ball
    this.ball = new Ball(8, this.width, this.height, 1, 'white');

    //Create the Score for 2 players
    this.player1Score = new Score(this.width * 0.25 - 10, 40, 40);
    this.player2Score = new Score(this.width * 0.75 - 10, 40, 40);


    //Create the Announcement
    this.player1Wins = new Winner(this.width, this.height);
    this.player2Wins = new Winner(this.width, this.height);


    //Pause
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });
  	}

	render() {
    if (this.pause) {
			return;
		}

    this.gameElement.innerHTML = '';
  		
  	let svg = document.createElementNS(SVG_NS, 'svg');
  	svg.setAttributeNS(null, 'width', this.width);
  	svg.setAttributeNS(null, 'height', this.height);
  	svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
  	this.gameElement.appendChild(svg);

  	this.board.render(svg);
 		this.player1Paddle.render(svg);
 		this.player2Paddle.render(svg);

    this.ball.render(svg, this.player1Paddle, this.player2Paddle);

    this.player1Score.render(svg, this.player1Paddle.score);
		this.player2Score.render(svg, this.player2Paddle.score);



    if (this.player1Paddle.score == 12 || this.player2Paddle.score == 12) {
      if (this.player1Paddle.score === Math.max(this.player1Paddle.score, this.player2Paddle.score)) {
        console.log('Player1 wins');
        this.pause = false;
        this.ping4.play();
        let winner = "Player 1 wins";
        this.player1Wins.render(svg, winner);
      }
      else if (this.player2Paddle.score === Math.max(this.player1Paddle.score, this.player2Paddle.score)) {
        console.log('Player2 wins');
        this.pause = false;
        this.ping4.play();
        let winner = "Player 2 wins";
        this.player1Wins.render(svg, winner);
      } 
    }
  }
}






