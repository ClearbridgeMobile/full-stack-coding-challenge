const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env, argv) {
    return {
    entry: {
        main: path.resolve(__dirname, 'client', 'src', 'main.tsx'),

    },
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'eval',
    output: {
        path: path.resolve(__dirname, 'dist','client','src'),
        filename: 'main.bundle.js',
    },
    devServer: {
        static: {
            publicPath: path.resolve(__dirname, 'client', 'src'),
        },
        liveReload: true,
        open: true,
        proxy: {
            '/api':  {
                target: 'http://localhost:5000',
                changeOrigin: true
              },
          },
    },
    externals: {
        react: 'React',
        "react-dom": 'ReactDOM'
      },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferRelative: true
          
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
              },
        ]
    },
    plugins: [
        new TerserPlugin({
            terserOptions: {
             compress: argv.mode === 'production'
            }
          }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'client', 'src', 'index.html') }),
    ]
    }
};