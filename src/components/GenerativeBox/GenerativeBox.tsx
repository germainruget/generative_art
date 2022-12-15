import React, { useRef } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

interface GenerativeBoxProps {
    //Your component props
}

const width = 1000;
const height = 1000;
const steps = 100;
let motion = 0;
const offsetY = 10;
const stepsY = 5;

export const GenerativeBox: React.FC<GenerativeBoxProps> = () => {
    const canvaRef = useRef(null);
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
        p5.noiseDetail(8, 7);
    };

    const draw = (p5: p5Types) => {
        //         p5.background(51);

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

        // p5.background(51);
        // p5.stroke(255);
        // for (let i = 0; i < steps; i++) {
        //     // p5.line(i * 10, height / 2, width / 2, 0);
        //     // p5.line(i * 10, height / 2, width / 2, height);
        //     p5.line(0, height / 2 - 5 * i, i * 5, 0);
        //     p5.line(0, height / 2 + 5 * i, i * 5, height);
        // }

        // p5.background(51);
        // p5.stroke(255);
        // const points = [];
        // for (let i = 0; i < steps; i++) {
        //     const p1 = p5.random(500, 1000);
        //     const p2 = p5.random(500, 1000);
        //     p5.point(p1, p2);
        //     points.push({ x: p1, y: p2 });
        // }

        // for (let i = 0; i < 5; i++) {
        //     const point1 = p5.random(points);
        //     const point2 = p5.random(points);
        //     p5.line(point1.x, point1.y, point2.x, point2.y);
        // }

        // p5.noLoop();

        const resolution = 260; // how many points in the circle
        const rad = 150;
        let x = 1;
        let y = 1;
        //const prevX;
        //const prevY;

        let t = 0; // time passed
        const tChange = 0.02; // how quick time flies

        let nVal: number; // noise value
        let nInt = 1; // noise intensity
        let nAmp = 1; // noise amplitude

        const filled = false;
        p5.background(255);
        p5.translate(width / 2, height / 2);

        if (filled) {
            p5.noStroke();
            p5.fill(0);
        } else {
            p5.noFill();
            p5.stroke(0);
            p5.strokeWeight(1);
        }
        nInt = p5.map(p5.mouseX, 0, width, 0.1, 30); // map mouseX to noise intensity
        nAmp = p5.map(p5.mouseY, 0, height, 0.0, 1.0); // map mouseY to noise amplitude

        p5.beginShape();
        for (let a = 0; a <= p5.TWO_PI; a += p5.TWO_PI / resolution) {
            nVal = p5.map(p5.noise(p5.cos(a) * nInt + 1, p5.sin(a) * nInt + 1, t), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude

            x = p5.cos(a) * rad * nVal;
            y = p5.sin(a) * rad * nVal;

            //    x = map(a, 0,TWO_PI, 0,width);
            //    y = sin(a)*rad *nVal +height/2;

            //    vertex(prevX, prevY);
            p5.vertex(x, y);

            //    line(x,y,x,height);

            //    prevX = x;
            //    prevY = y;
        }
        p5.endShape(p5.CLOSE);

        t += tChange;
    };

    return (
        <div ref={canvaRef}>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};
