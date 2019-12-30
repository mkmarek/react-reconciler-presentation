const React = require('react');
const ReactJava = require('./renderer');

const App = () => <program>
    <classdefinition name="HelloWorld" modifiers={['public']}>
        <method name="main" modifiers={['public', 'static']} arguments={['String[] args']} type="void">
            <call path={['Printer', 'print']} arguments={[]} />
        </method>
    </classdefinition>
    <classdefinition name="Printer" modifiers={['public']}>
        <method name="print" modifiers={['public', 'static']} type="void">
            <call path={['System', 'out', 'print']} arguments={['Hello world']} />
        </method>
    </classdefinition>
</program>

ReactJava.render(<App />, 'HelloWorld')