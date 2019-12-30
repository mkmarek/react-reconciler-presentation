const { createElement, getHostContextNode } = require('./utils/createElement');

const Reconciler = require('react-reconciler');

const MusicRenderer = Reconciler({
  now: Date.now,
    getRootHostContext: (node) => getHostContextNode(node),
    prepareForCommit: () => {},
    resetAfterCommit: () => {},
    getChildHostContext: () => {},
    shouldSetTextContent: () => {},
    createTextInstance: () => {},
    finalizeInitialChildren: () => {},
    supportsMutation: true,
    createInstance(type, props) {
      return createElement(type, props);
    },
    appendInitialChild(parent, child) {
      if (parent.appendChild)
        parent.appendChild(child);
    },
    appendChild(parent, child) {
      if (parent.appendChild)
        parent.appendChild(child);
    },
    appendChildToContainer(target, child) {
        
    }    
});

  module.exports = MusicRenderer