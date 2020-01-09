import Reconciler from 'react-reconciler';

const HostConfig = {
  now: Date.now,
  getRootHostContext: (nextRootInstance) => nextRootInstance.tagName,
  getChildHostContext: (parentContext, fiberType, rootInstance) => `${parentContext}>${fiberType}`,
  shouldSetTextContent: () => false,
  createTextInstance: (newText) => document.createTextNode(newText),
  createInstance: (type, props) => {
    const element = document.createElement(type)
    element.className = props.className || ''
    element.style = props.style

    if (props.onClick) {
      element.addEventListener('click', props.onClick)
    }

    return element
  },
  appendInitialChild: (parent, child) => parent.appendChild(child),
  finalizeInitialChildren: () => false,
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  appendChildToContainer: (parent, child) => parent.appendChild(child),
  supportsMutation: true,
  prepareUpdate: () => {},
  commitUpdate: () => {},
  commitTextUpdate: (textInstance, oldText, newText) => {
    textInstance.nodeValue = newText
  },
  appendChild: (parentInstance, child) => {
    parentInstance.appendChild(child)
  },
  insertBefore: (parentInstance, child, beforeChild) => {
    parentInstance.insertBefore(child, beforeChild)
  },
  removeChild: (parentInstance, child) => {
    parentInstance.removeChild(child)
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.insertBefore(child, beforeChild)
  },
  removeChildFromContainer: (container, child) => {
    container.removeChild(child)
  },
  resetTextContent: () => {},
  shouldDeprioritizeSubtree: (type, nextProps) => {
    return !!nextProps.hidden
  },
}

for (let key of Object.keys(HostConfig)) {
  if (typeof HostConfig[key] === 'function') {
    const temp = HostConfig[key];
    HostConfig[key] = (...args) => { 
      console.log(key, args);
      return temp(...args);
    }
  }
}

const MyRenderer = Reconciler(HostConfig);
const RendererPublicAPI = {
  render(element, container, callback) {
    const containerNode = MyRenderer.createContainer(container);
    MyRenderer.updateContainer(element, containerNode, callback);
  }
};

module.exports = RendererPublicAPI;