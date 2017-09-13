# Web Workflow Boilerplate

A simple boilerplate for web project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contents](#contents)
  - [Webpack configuration](#webpack-configuration)
  - [Babel configuration](#babel-configuration)
  - [Eslint configuration](#eslint-configuration)
- [Support](#support)
- [Contributing](#contributing)
- [Authors](#authors)

## Installation

```sh
git clone https://github.com/JonGiamp/web-workflow-boilerplate.git
cd web-workflow-boilerplate
rm -rf .git
yarn install
```
> Think to update package.json with your personal informations

## Usage

To launch the production build :
```sh
yarn prod
```

> The build fails if eslint or flowtype encounters an error.

To launch the development environment :
```sh
yarn dev
```

> Launch webpack-dev-server with hot reload and webpack-dashboard

To manual run eslint :
```sh
yarn lint
```

To automatic fix eslint error :
```sh
yarn lintfix
```

To manual run flowtype :s
```sh
yarn flow
```

## Contents

This boilerplate uses:
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)
- [eslint](https://eslint.org/)
- [flow](https://flow.org/)

### Webpack configuration

| Name        | Type           | Target | Environment  |
| ------------------------------ |:-------------:| -----:| -----:|
| [babel-loader](https://github.com/babel/babel-loader) | loader | JS | all |
| [flowtype-loader](https://github.com/torifat/flowtype-loader) | loader   | JS   |  all |
| [eslint-loader](https://github.com/MoOx/eslint-loader) | loader  | JS | all |
| [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)  | plugins | JS | prod |
| [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) | plugins | CSS | all |
| [style-loader](https://github.com/webpack-contrib/style-loader) | loader | CSS | dev |
| [css-loader](https://github.com/webpack-contrib/css-loader) | loader | CSS | prod |
| [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) | loader | CSS | prod |
| [url-loader](https://github.com/webpack-contrib/url-loader) | loader | IMG | all |
| [img-loader](https://www.npmjs.com/package/img-loader) | loader | IMG | prod |
| [file-loader](https://github.com/webpack-contrib/file-loader) | loader | FONTS | all |
| [cheap-module-eval-source-map](https://webpack.js.org/configuration/devtool/) | devtool | X | dev |
| [source-map](https://webpack.js.org/configuration/devtool/) | devtool | X | prod |
| [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) | server | X | dev |
| [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) | tools | X | dev |

### Babel configuration

- [syntax-dynamic-import]((https://webpack.js.org/guides/lazy-loading/))
- [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
- [transform-flow-comments](https://babeljs.io/docs/plugins/transform-flow-comments/)

### Eslint configuration

- [airbnb guidelines](https://github.com/airbnb/javascript)
- [comma-dangle](https://eslint.org/docs/rules/comma-dangle): ["error", "always-multiline"]

## Support

Please [open an issue](https://github.com/JonGiamp/web-workflow-boilerplate/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/JonGiamp/web-workflow-boilerplate/compare/).

## Authors

* **Jonathan Giamporcaro** - *Initial work* - [Github](https://github.com/JonGiamp) / [Twitter](https://twitter.com/JonGiamp)

See also the list of [contributors](https://github.com/JonGiamp/web-workflow-boilerplate/contributors) who participated in this project.
