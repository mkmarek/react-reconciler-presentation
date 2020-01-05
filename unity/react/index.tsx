///<reference path="./renderer/declarations.d.ts"/>

import React, { useState } from 'react';
import { render } from './renderer';
import TabPanel from './components/tab-panel';
import Counter from './components/counter';
import ComponentPreview from './components/component-preview';

const margin = (margin): JSX.IStyle => ({
    marginTop: margin,
    marginBottom: margin,
    marginLeft: margin,
    marginRight: margin
});

if (!process.natives) {
    process.natives = {} as any;
}

if (!process.natives.bridge) {
    process.natives.bridge = console.log;
}

function App() {
    return (
        <element style={{ width: "100%", height: "100%", flexDirection: 'row' }}>
            <TabPanel style={{ width: "80%", height: "80%", ...margin('auto'), alignSelf: 'center' }}>
                <TabPanel.Panel name="Test1">
                    <element style={{ ...margin('auto'), alignSelf: 'center' }}>
                        A demo of React used inside Unity
                    </element>
                </TabPanel.Panel>
                <TabPanel.Panel name="Test2">
                   <Counter />
                </TabPanel.Panel>
                <TabPanel.Panel name="Test3">
                    <ComponentPreview />
                </TabPanel.Panel>
            </TabPanel>
        </element>
    );
}

render(<App />)

