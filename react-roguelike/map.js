const React = require('react');

const Map = ({ width, height, tileSize }) => {
    const out = [];

    for (let x = 0; x < width / tileSize; x++) {
        for (let y = 0; y < height / tileSize; y++) {
            out.push(<rendersprite key={`${x}_${y}`} x={x * tileSize} y={y * tileSize} name="Grass" />)
        }
    }

    return out;
}

module.exports = Map