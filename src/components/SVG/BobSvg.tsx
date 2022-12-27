import React, { useEffect, useMemo, useRef } from 'react';

import { SVG } from '@svgdotjs/svg.js';
import { CharacterCreator } from './characterCreator';

interface BlobSvgProps {
    //Your component props
}

export const BlobSvg: React.FC<BlobSvgProps> = () => {
    const width = 500;
    const height = 500;

    const xMid = width / 2;
    const yMid = height / 2;

    const SVGWrapperRefElement = useRef<HTMLDivElement>(null);
    const SVGContainer = useMemo(() => SVG(), []);

    const clear = () => {
        SVGContainer.clear();
    };

    const draw = () => {
        clear();
        const char = new CharacterCreator(width, height);
        console.log(char);
        char.drawBody();
        char.drawEyes();

        SVGContainer.add(char.svg);
    };

    useEffect(() => {
        if (
            SVGWrapperRefElement &&
            SVGWrapperRefElement?.current &&
            SVGWrapperRefElement?.current?.children.length < 1
        ) {
            SVGContainer.addTo(SVGWrapperRefElement?.current);
        }
    }, [SVGWrapperRefElement, SVGContainer]);

    return (
        <div className="app">
            <button onClick={draw}>Draw</button>
            <button onClick={clear}>Clear</button>
            <div ref={SVGWrapperRefElement} />
        </div>
    );
};
