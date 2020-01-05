const Reconciler = require('react-reconciler');
const ProgramElement = require('./ProgramElement');
const ClassElement = require('./ClassElement');
const MethodElement = require('./MethodElement');
const CallElement = require('./CallElement');
const childProcess = require('child_process');
const fs = require('fs');

const HostConfig = {
    now: Date.now,
    getRootHostContext: () => {},
    prepareForCommit: () => {},
    resetAfterCommit: () => {},
    getChildHostContext: () => {},
    shouldSetTextContent: () => false,
    createTextInstance: () => null,
    finalizeInitialChildren: () => false,
    supportsMutation: true,
    createInstance(type, props) {
        switch (type) {
            case 'program': return new ProgramElement(type, props);
            case 'classdefinition': return new ClassElement(type, props);
            case 'method': return new MethodElement(type, props);
            case 'call': return new CallElement(type, props);
        }
       
        throw new Error(`Unknown type ${type}`)
    },
    appendInitialChild(parent, child) {
        parent.addChild(child);
    },
    appendChild(parent, child) {
       parent.addChild(child);
    },
    appendChildToContainer(target, child) {
        const files = child.render();
        fs.writeFileSync('tmp/MANIFEST.MF', `Main-Class: ${target}\n\r`)

        var process = childProcess.spawn('javac', ['-d', './build', ...files]);
        process.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        process.stderr.on('data', function (data) {
            console.error('stderr: ' + data);
        });
        process.on('close', function (code) {
            console.log('Child process exit with code: ' + code);

            for (let f of files)
                fs.unlinkSync(f);

            const jarProcess = childProcess.spawn('jar', ['cvfm', `${target}.jar`, 'tmp/MANIFEST.MF','-C', './build', '.']);

            jarProcess.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });
            jarProcess.stderr.on('data', function (data) {
                console.error('stderr: ' + data);
            });
        });
    }
}

const renderer = Reconciler(HostConfig);

const RendererPublicAPI = {
    render(element, target, callback) {
        const container = renderer.createContainer(target, false);
        renderer.updateContainer(element, container, null, callback);
    }
};

module.exports = RendererPublicAPI;