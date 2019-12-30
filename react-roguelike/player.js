const React = require('react');
const { connect } = require('react-redux');

const Player = ({ x, y }) => {
    return (
        <rendersprite x={x} y={y} name="Character_Down" />
    )
}

const mapStateToProps = (state) => {
    const { playerX, playerY } = state
    return { x: playerX, y: playerY }
};

module.exports = connect(mapStateToProps)(Player);