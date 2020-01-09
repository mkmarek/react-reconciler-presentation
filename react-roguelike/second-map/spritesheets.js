const React = require('react');
const path = require('path');

const sanitize = (p) => path.relative(process.cwd(), path.join(__dirname, p))

const SpriteSheets = () =>  (
    <>
    <spritesheet image={sanitize('../images/other.png')}>
        <sprite x={0} y={2} width={32} height={32} name="Dirt" />
        <sprite x={0} y={34} width={32} height={32} name="Grass" />
        <sprite x={0} y={66} width={32} height={32} name="Lava" />
        <sprite x={32} y={2} width={22} height={40} name="Shrek" />
        <sprite x={33} y={44} width={36} height={80} name="Donkey" />
        <sprite x={118} y={0} width={48} height={95} name="Wall" />
        <sprite x={70} y={0} width={48} height={143} name="Tower" />
        <sprite x={166} y={0} width={148} height={101} name="Dragon" />
    </spritesheet>
    <spritesheet image={sanitize('../images/flame.png')}>
        {[...new Array(12).keys()].map(e =>
            <sprite key={`flame_${e}`} x={1024 / 12 * e} y={0} width={1024 / 12} height={1024 / 12} name={`Flame_${e}`} />)}
    </spritesheet>
    </>
);

module.exports = SpriteSheets;