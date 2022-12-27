import React, { useRef } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

interface BlobProps {
    //Your component props
}

const width = 500;
const height = 500;

const midX = width / 2;
const midY = height / 2;

export const Blob: React.FC<BlobProps> = () => {
    const canvaRef = useRef(null);
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(125);
        p5.stroke(0);
        p5.fill(0);

        const rndPoints = p5.random(3, 12);

        const angleStep = (p5.TWO_PI * 2) / rndPoints;

        const points = [];
        const headSize = p5.random(50, 80);

        for (let i = 1; i <= rndPoints; i++) {
            const rndNess = p5.random(0.75, 1);

            const x = midX + p5.cos(i * angleStep) + headSize * rndNess;
            const y = midY + p5.cos(i * angleStep) + headSize * rndNess;
            console.log(x, y);

            p5.circle(x, y, 1);
            points.push({ x, y });
        }

        p5.noLoop();
    };

    return (
        <div ref={canvaRef}>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};
