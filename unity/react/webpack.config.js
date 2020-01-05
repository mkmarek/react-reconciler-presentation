const path = require('path');

module.exports = {
    entry: ['./index.tsx'],
    node: {
        process: false,
        global: false,
    },
    output: {
        path: path.resolve(__dirname, '../main/Assets/js'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.ts(|x)?$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }]
    },
    plugins: [],
    optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
}