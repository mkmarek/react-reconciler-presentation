///<reference path="../renderer/declarations.d.ts"/>

import React from 'react';

const borderWidth = (width) => ({
    borderTopWidth: width,
    borderLeftWidth: width,
    borderBottomWidth: width,
    borderRightWidth: width
});

const borderColor = (color) => ({
    borderTopColor: color,
    borderLeftColor: color,
    borderBottomColor: color,
    borderRightColor: color
});

export default function Panel({ innerStyle, outerStyle, children }) {

    outerStyle = {
        width: '100%',
        height: '100%',
        ...borderColor('#59b6cc'),
        ...borderWidth('1'),
        ...outerStyle
    };

    const midBorderStyle: JSX.IStyle = {
        width: '100%',
        height: '100%',
        ...borderColor('#0b2431'),
        ...borderWidth('1')
    };

    const innerBorderStyle: JSX.IStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: '#173e54',
        ...borderColor('#2d5369'),
        ...borderWidth('1'),
        ...innerStyle
    };

    return (
        <element style={outerStyle}>
            <element style={midBorderStyle}>
                <element style={innerBorderStyle}>
                    {children}
                </element>
            </element>
        </element>
    );
}