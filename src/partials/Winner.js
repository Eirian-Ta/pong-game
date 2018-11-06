import { SVG_NS } from '../settings';

export default class Winner {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}


	render(svg, winner) {
        //Create the court
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'x', 0);
        rect.setAttributeNS(null, 'y', 0);
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'fill', 'orange');


        svg.appendChild(rect);


        //Create the dividing line
		let text = document.createElementNS(SVG_NS, 'text');
    	text.setAttributeNS(null, 'x', 50);
    	text.setAttributeNS(null, 'y', 50);
    	text.setAttributeNS(null, 'font-size', 40);
    	text.setAttributeNS(null, 'fill', 'white');
    	text.textContent = winner;

    	svg.appendChild(text);
    }
}

