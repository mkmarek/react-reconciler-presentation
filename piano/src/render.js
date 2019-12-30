const { createElement } = require('./utils/createElement');
const MusicRenderer = require('./reconsiler');

const addCallbacks = (command) => {
  command.on('prepare', function(args) {
      console.log('Preparing sox command with args ' + args.join(' '));
  });
  
  command.on('start', function(commandLine) {
      console.log('Spawned sox with command ' + commandLine);
  });
  
  command.on('progress', function(progress) {
      console.log('Processing progress: ', progress);
  });
  
  command.on('error', function(err, stdout, stderr) {
      console.log('Cannot process audio: ' + err.message);
      console.log('Sox Command Stdout: ', stdout);
      console.log('Sox Command Stderr: ', stderr)
  });
  
  command.on('end', function() {
      console.log('Sox command succeeded!');
  });
}

// renders the component
function render(element, filePath) {
  const container = createElement('ROOT');

  const node = MusicRenderer.createContainer(container);

  MusicRenderer.updateContainer(element, node, null);

  const resultCommand = container
    .getCommand()
    .addEffect('vol', 600)
    .trim('=0:10')
    .output(filePath, [ '-v 50' ])
    .outputBits(16)
    .outputEncoding('signed-integer')
    .outputChannels(1)
    .outputSampleRate(44100)
    .outputFileType('wav')

  addCallbacks(resultCommand);

  resultCommand.run();
}

module.exports = render;