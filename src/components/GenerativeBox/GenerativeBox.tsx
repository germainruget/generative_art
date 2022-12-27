import React, { useRef } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

interface GenerativeBoxProps {
    //Your component props
}

const width = 1000;
const height = 1000;

export const GenerativeBox: React.FC<GenerativeBoxProps> = () => {
    const canvaRef = useRef(null);
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        const resolution = p5.random(3, 12); // how many points in the circle
        const headSize = p5.random(160, 180);

        let x = 1;
        let y = 1;

        let t = 0; // time passed

        let nVal: number; // noise value
        let nInt = 1; // noise intensity
        let nAmp = 1; // noise amplitude

        p5.background(255);
        p5.translate(width / 2, height / 2);

        const drawEye = ({ x, y, size }: { x: number; y: number; size: number }) => {
            p5.beginShape();

            p5.fill(255);
            p5.stroke(0);
            p5.circle(x, y, size);
            p5.fill(0);
            p5.circle(x, y, size / 2);

            p5.endShape();
        };

        const drawEyes = () => {
            const maxWidth = headSize / 2;
            const eyeSize = p5.random(maxWidth / 4, maxWidth / 2);

            drawEye({ x: -maxWidth / 2, y: p5.random(-40, 20), size: eyeSize });
            drawEye({ x: maxWidth / 2, y: p5.random(-40, 20), size: eyeSize });
        };

        p5.noFill();
        p5.stroke(0);
        p5.strokeWeight(1);

        nInt = p5.map(1, 0, width, 0.1, 30); // map mouseX to noise intensity
        nAmp = p5.map(1, 0, height, 0.0, 1.0); // map mouseY to noise amplitude

        p5.beginShape();

        for (let a = 0; a <= p5.TWO_PI; a += p5.TWO_PI / resolution) {
            nVal = p5.map(p5.noise(p5.cos(a) * nInt + 1, p5.sin(a) * nInt + 1, t), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude

            x = p5.cos(a) * headSize * nVal;
            y = p5.sin(a) * headSize * nVal;

            p5.curveVertex(x, y);
        }

        p5.endShape(p5.CLOSE);

        drawEyes();

        p5.noLoop();
    };

    return (
        <div ref={canvaRef}>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};
