import { Svg, SVG } from '@svgdotjs/svg.js';
import { random } from '../../utils/random';
import { randomGreyHex } from '../../utils/randomGrey';
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
            .fill({color: randomGreyHex(), opacity: 0.5});

        const length = blob.node.getTotalLength();

        const rdmNbHairs = random(2, 150);
        const rdmHaiChoice = random(1, 3);

        for (let i = 0; i < rdmNbHairs; i++) {
            const rdmHairPts = random(length / 4, length / 2.2);
            const pt = blob.node.getPointAtLength(rdmHairPts);

            const rdmHairLength = random(pt.y - 5, pt.y - 25);

            switch (rdmHaiChoice) {
                case 1:
                    this.svg
                        .path(`M ${pt.x} ${pt.y} V ${rdmHairLength}`)
                        .stroke({
                            width: 1,
                            color: '#000',
                        })
                        .fill('transparent');
                    break;

                default:
                    this.svg
                        .path(
                            `M ${pt.x} ${pt.y} C ${pt.x + random(2, 50)} ${pt.y + random(2, 50)} ${
                                pt.x - random(2, 50)
                            } ${pt.y - random(2, 50)} ${pt.x} ${rdmHairLength}`,
                        )
                        .stroke({
                            width: 1,
                            color: '#000',
                        })
                        .fill('transparent');
                    break;
            }
        }
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
            .fill({ color: '#fff', opacity: 0.8 });

        eye.path(this.drawBlob(x, y, random(6, 12), size / random(2, 4), 2)).fill('#000');

        eye.path(`M ${x - size} ${y} A ${random(8, 10)} ${random(8, 10)} ${random(8, 10)} 10 ${x + size} ${y + 10} `)
            .stroke({
                width: 1,
                color: '#000',
            })
            .fill('transparent');
    }

    drawEyes() {
        // ensure the width of two eyes never exceeds 50% of the characters body size
        const maxWidth = this.size / 4;

        // draw 2 eyes, equidistant from the centre of the character
        this.drawEye(this.x - maxWidth, random(this.y - 25, this.y));
        this.drawEye(this.x + maxWidth, random(this.y - 25, this.y));
    }

    drawNose() {
        const nose = this.svg.group();

        const size = random(2, 5);

        const toggleR = random(size / 2 + 1, 6);
        const toggleL = random(size / 2 + 1, 6);

        const toggleYR = random(10, 15);
        const toggleYL = random(10, 15);

        nose.circle(size)
            .cx(this.x + toggleR)
            .cy(this.y + toggleYR)
            .fill('#000');

        nose.circle(size)
            .cx(this.x - toggleL)
            .cy(this.y + toggleYL)
            .fill('#000');

        // MOUTH
        nose.path(
            `M ${this.x + toggleR} ${this.y + toggleYR + 20}
            C ${this.x + toggleR + random(2, 20)} ${this.y + toggleYR + random(2, 20) + 20}
            ${this.x + toggleR - random(2, 20)} ${this.y + toggleYR - random(2, 20) + 20}
            ${this.x - toggleL} ${this.y + toggleYL + 20}`,
        )
            .stroke({
                width: 1,
                color: '#000',
            })
            .fill('transparent');
    }
}
