import { SVG_NS } from '../settings';

export default class Score {
	constructor(x, y, size) {
    	this.x = x;
    	this.y = y;
    	this.size = size;
    	this.score = 0;
  	}
  
    render(svg, score) {
    	let text = document.createElementNS(SVG_NS, 'text');
    	text.setAttributeNS(null, 'x', this.x);
    	text.setAttributeNS(null, 'y', this.y);
        text.setAttributeNS(null, 'text-anchor', 'middle');
    	text.setAttributeNS(null, 'font-size', this.size);
    	text.setAttributeNS(null, 'fill', 'white');

    	text.textContent = score;

    	svg.appendChild(text);
	}
}