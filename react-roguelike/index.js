const React = require('react');
const { render } = require('./renderer/reconciler');
const { Provider } = require('react-redux');
const store = require('./store');
const Player = require('./player');
const Map = require('./map');
const SpriteSheets = require('./spritesheets');

// const App = require('./second-map');

const resolutionX = 800;
const resolutionY = 600;

const App = () => {
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
                <SpriteSheets />
                <Player />
                <rendersprite x={100} y={100} name="House" />
                <Map width={resolutionX} height={resolutionY} tileSize={32} />
            </window>
        </Provider>
    )
};

render(<App />)