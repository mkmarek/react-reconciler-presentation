const React = require('react');
const path = require('path');

const sanitize = (p) => path.relative(process.cwd(), path.join(__dirname, p))

const Character = () => (
    <spritesheet image={sanitize('images/character.png')}>
        <sprite x={1} y={6} width={15} height={22} name="Character_Down" />
    </spritesheet>
);

const World = () => (
    <spritesheet image={sanitize('images/Overworld.png')}>
        <sprite x={112} y={144} width={32} height={32} name="Grass" />
        <sprite x={99} y={0} width={74} height={80} name="House" />
    </spritesheet>
);

const SpriteSheets = () =>  (
    <>
        <Character />
        <World />
    </>
);

module.exports = SpriteSheets;