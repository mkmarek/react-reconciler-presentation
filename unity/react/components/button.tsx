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

export default function Button({ style, innerStyle={}, onClick, children }) {

    const outerStyle = {
        width: '100%',
        height: '100%',
        ...borderColor('#0b2431'),
        ...borderWidth('1'),
        ...style
    };

    const innerBorderStyle: JSX.IStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: '#173e54',
        ...borderColor('#2d5369'),
        ...borderWidth('1'),
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        unityTextAlign: 'middle-center',
        ...innerStyle
    };

    return (
        <element style={outerStyle}>
           <element onClick={onClick} style={innerBorderStyle}>
                {children}
            </element>
        </element>
    );
}