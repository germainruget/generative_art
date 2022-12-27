import { Svg, SVG } from '@svgdotjs/svg.js';
import { random } from '../../utils/random';
import { spline } from '../../utils/spline';

export class CharacterCreator {
    width: number;
    height: number;
    x: number;
    y: number;
    svg: Svg;
    size: number;

    constructor(width: number, height: number) {
        // viewBox width & height dimensions
        this.width = width;
        this.height = height;
        this.size = random(50, 80);

        // position of our character within the viewBox (the center)
        this.x = this.width / 2;
        this.y = this.height / 2;

        // <svg /> element (svg.js instance) we are using to render
        this.svg = SVG().viewbox(0, 0, this.width, this.height); // set the <svg /> viewBox attribute
    }

    drawBlob = (x: number, y: number, nbPoints: number, size: number, nbTurn = 4) => {
        // step used to place each point at equal distances
        const angleStep = (Math.PI * nbTurn) / nbPoints;

        // keep track of our points
        const points = [];

        for (let i = 1; i <= nbPoints; i++) {
            // how much randomness should be added to each point
            const pull = random(0.75, 1, true);
            // x & y coordinates of the current point
            const xP = x + Math.cos(i * angleStep) * (size * pull);
            const yP = y + Math.sin(i * angleStep) * (size * pull);

            // push the point to the points array
            points.push({ x: xP, y: yP });
        }

        // generate a smooth continuous curve based on the points, using bezier curves. spline() will return an svg path-data string. The arguments are (points, tension, close). Play with tension and check out the effect!
        return spline(points, 1, true);
    };

    drawBody() {
        // choose a random number of points
        const numPoints = random(8, 12);

        const pathData = this.drawBlob(this.x, this.y, numPoints, this.size);

        // render the body in the form of an svg <path /> element!
        const blob = this.svg
            .path(pathData)
            .stroke({
                width: 1,
                color: '#000',
            })
            .fill('transparent');

        const length = blob.node.getTotalLength();
        console.log(length);
        const pt = blob.node.getPointAtLength(length / 4);
        this.svg.circle(10).cx(pt.x).cy(pt.y);
        const pt2 = blob.node.getPointAtLength(length / 2.5);
        this.svg.circle(10).cx(pt2.x).cy(pt2.y);
    }

    drawEye(x: number, y: number) {
        // create a new svg <group /> to add all the eye content to
        const eye = this.svg.group();
        // <group /> elements do not have an x and y attribute, so we need to "transform" it to the right position
        // eye.transform({ translateX: x, translateY: y });

        const size = random(8, 12);

        eye.path(this.drawBlob(x, y, random(6, 12), size))
            .stroke({
                width: 1,
                color: '#000',
            })
            .fill('#fff');

        eye.path(this.drawBlob(x, y, random(6, 12), size / random(2, 4), 2)).fill('#000');
    }

    drawEyes() {
        // ensure the width of two eyes never exceeds 50% of the characters body size
        const maxWidth = this.size / 4;

        // draw 2 eyes, equidistant from the centre of the character
        this.drawEye(this.x - maxWidth, random(this.y - 25, this.y));
        this.drawEye(this.x + maxWidth, random(this.y - 25, this.y));
    }
}
