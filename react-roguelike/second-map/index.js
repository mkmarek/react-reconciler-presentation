const React = require('react');
const { Provider } = require('react-redux');
const store = require('./store');
const Player = require('./player');
const Map = require('./map');
const SpriteSheets = require('./spritesheets');

const resolutionX = 800;
const resolutionY = 600;

function AnimatedFlame({ x, y }) {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
      const handle = setInterval(() => {
          setFrame((frame + 1) % 12);
      }, 32);

      return () => clearInterval(handle);
  }, [frame]);

  return <rendersprite name={`Flame_${frame}`} x={x} y={y} />;
}

function Wall() {
    const walls = [];

    for (let i = 0; i <= resolutionY / 50; i++) {
        if (i === 5 || i === 6) continue;
        walls.push(<rendersprite key={`wall_a_${i}`} x={320} y={resolutionY - (i + 1) * 50 + 10} name="Wall" />)
    }

    for (let i = 0; i <= resolutionY / 50; i++) {
        if (i === 5 || i === 6) continue;
        walls.push(<rendersprite key={`wall_b_${i}`} x={448} y={resolutionY - (i + 1) * 50 + 10} name="Wall" />)
    }

    return walls;
}

function App() {
    const sendEventsToStore = (events) => {
        for (let event of events) {
            store.dispatch({ type: event });
        }
    }

    return (
        <Provider store={store}>
            <window
                title="Roguelike"
                width={resolutionX}
                height={resolutionY}
                onEvents={sendEventsToStore}>
                <music file={`${__dirname}/../../piano/demo/demo6.wav`} />
                <SpriteSheets />
                <Player />
                <Wall />
                <rendersprite x={10} y={64} name="Donkey" />
                <rendersprite x={500} y={10} name="Dragon" />
                <rendersprite x={600} y={200} name="Tower" />
                <AnimatedFlame x={600} y={50} />
                <AnimatedFlame x={620} y={150} />
                <AnimatedFlame x={650} y={250} />
                <AnimatedFlame x={710} y={350} />
                <AnimatedFlame x={680} y={450} />
                <AnimatedFlame x={610} y={350} />
                <AnimatedFlame x={580} y={450} />
                <Map width={resolutionX} height={resolutionY} tileSize={32} />
            </window>
        </Provider>
    )
};

module.exports = App;