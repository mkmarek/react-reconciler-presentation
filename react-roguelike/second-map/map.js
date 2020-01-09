const React = require('react');

const Map = ({ width, height, tileSize }) => {
    const out = [];

    for (let x = 0; x < width / tileSize; x++) {
        for (let y = 0; y < height / tileSize; y++) 
        {
            let name = 'Dirt';
            if (x > 3 && x < 10 && y != 10) {
                name = 'Lava'
            }

            if (x > 10 && x < 14 && y != 10) {
                name = 'Lava'
            }
            out.push(<rendersprite key={`${x}_${y}`} x={x * tileSize} y={y * tileSize} name={name} />)
        }
    }

    return out;
}

module.exports = Map