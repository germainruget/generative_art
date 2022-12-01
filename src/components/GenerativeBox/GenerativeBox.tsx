import React, { useRef } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

interface GenerativeBoxProps {
    //Your component props
}

const width = window.innerWidth;
const height = window.innerHeight;
const steps = 180;
let motion = 0;
const offsetY = 10;
const stepsY = 5;

export const GenerativeBox: React.FC<GenerativeBoxProps> = () => {
    const canvaRef = useRef(null);
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        // p5.background(51);

        // p5.beginShape();
        // p5.noFill();
        // p5.stroke(255);

        // for (let i = 0; i < steps; i++) {
        //     p5.ellipse(motion + i * 50, p5.random(-350, 350) + height / 2, 10, 10);

        //     for (let j = 0; j < stepsY; j++) {
        //         p5.curveVertex(motion + i * 50, p5.random(-150, 150) + height / 2 + j * offsetY);
        //     }
        // }
        // p5.endShape();

        // p5.noLoop();

        /*         p5.background(51);
        p5.stroke(255);
        for (let i = 0; i < steps; i++) {
            // p5.line(i * 10, height / 2, width / 2, 0);
            // p5.line(i * 10, height / 2, width / 2, height);

            p5.line(i * 10, height, 0 + 350, i * 10);
             p5.line(width - i * 10, height, width - 350, i * 10);
        }
 */

        p5.background(51);
        p5.stroke(255);
        const points = [];
        for (let i = 0; i < steps; i++) {
            const p1 = p5.random(500, 1000);
            const p2 = p5.random(500, 1000);
            p5.point(p1, p2);
            points.push({ x: p1, y: p2 });
        }

        for (let i = 0; i < 100; i++) {
            const point1 = p5.random(points);
            const point2 = p5.random(points);
            p5.line(point1.x, point1.y, point2.x, point2.y);
        }

        p5.noLoop();
    };

    return (
        <div ref={canvaRef}>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};
