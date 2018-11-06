import { SVG_NS, KEYS } from '../settings'

export default class Ball {
    constructor(radius, boardWidth, boardHeight, direction, fill) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = direction;
        this.fill = fill;
        this.ping1 = new Audio("public/sounds/pong-01.wav");
        this.ping2 = new Audio("public/sounds/pong-02.wav");
        this.ping3 = new Audio("public/sounds/pong-03.wav");

        this.reset();

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case KEYS.m:
                    if (this.radius === 8) {
                        this.radius = 4;
                        this.fill = 'orange';
                    }
                    else {
                        this.radius = 8;
                        this.fill = 'white';
                    }
                    break;
            }
        });
    }

    reset() {
        this.x = this.boardWidth / 2;        
        this.y = this.boardHeight / 2;
        this.vy = 0;

        while (this.vy === 0) {
            //in this project, we only want a number from -5 -> 4 because the bigger the vy is, the faster the ball moves
            //Math.floor(Math.random() * ((y-x)+1) +x) will return a value between x and y
            this.vy = Math.floor(Math.random() * 10 - 5); 
            //the bigger the vx is, the faster the ball move
            //the bigger |vx| is compared to vy, the angle created by vector for movement of the ball and the verticle line is smaller.
            //the bellow formula gives vx a value that is not so much bigger than the |vy|
            this.vx = this.direction * (6 - Math.abs(this.vy));
            
        }
    }

    wallCollision() {
        const hitTop = this.y <= this.radius;
        const hitBottom = this.y >= this.boardHeight - this.radius;

        if (hitTop || hitBottom) {this.vy = -this.vy; this.ping1.play()} 
    }

    paddleCollision(player1, player2) {
        if (this.vx < 0) {
            let [leftX, rightX, topY, bottomY] = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
            if (this.x - this.radius <= rightX && this.y >= topY && this.y <= bottomY) {
                this.vx = -this.vx;
                this.ping2.play();
            }
        }
        else {
            let [leftX, rightX, topY, bottomY] = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
            if (this.x + this.radius >= leftX && this.y >= topY && this.y <= bottomY) {
                this.vx = -this.vx;
                this.ping2.play()
            }
        }    
    }

    countScore(player) {
        this.ping3.play();
        player.score++;
        this.reset();
    }

    render(svg, player1, player2) {
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(player1, player2);
    
        let ball = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'fill', this.fill);
        ball.setAttributeNS(null, 'stroke-width', '1');
        ball.setAttributeNS(null, 'stroke', 'orange');

        svg.appendChild(ball);

        const hitLeft = this.x <= this.radius;
        const hitRight = this.x >= this.boardWidth - this.radius;

        if (hitLeft) {
            this.countScore(player2);
            this.direction = 1;
        }   
        else if (hitRight) {
            this.countScore(player1);
            this.direction = -1;
        }   
    }
}

