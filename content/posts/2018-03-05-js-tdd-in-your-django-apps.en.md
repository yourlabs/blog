+++
date = "2018-03-05T15:40:44+00:00"
draft = false
tags = ["javascript", "best-practice"]
title = "JS TDD in your Django apps"
author = "jpic"
+++

Yesterday, I [confessed my guilt of writing shitty DOM manipulating JS code live in the browser]({{< relref "2018-03-04-djangonauts-say-no-to-selenium-drug.en.md" >}}), and said no, never again.

Due to positive feedback in the django-users mailing list, I'm writing how I actually plan to change how I do JS in Django apps. Believe me, it's preventively fixing issues i've had with JS in Django apps during the last ten years. Nuff said, let's hack !

Let's create an index.test.js file:


{{< highlight js>}}
/* global describe, jest, test, expect */
import * as yourmodule from './index'

describe('Awesome', () => {
  test('ctor()', () => {
    let x = new yourmodule.Awesome(2)
    expect(x.something).toEqual(2)
  })
})
{{< / highlight >}}


And an index.js file with our runtime code:


{{< highlight js>}}
class Awesome {
  constructor(something) {
    this.something = something
  }
}

export {
  Awesome
}
{{< / highlight >}}


You need to install nodejs, because we'll run unit tests on it. You also need npm or yarn because we'll install JS modules with it - yay, same development workflows with JS as we have in Python, get ready for the XXIst century ! You could do the article in pure npm, but we'll use yarn:

    sudo npm install -g yarn

In your django app source code, run:

    yarn init

This creates a package.json file, which is the equivalent of your setup.py, but for JS packages. We want more JS features, for this we'll use npm packages:

- [Babel](https://babeljs.io/) for JS transpiling,
- [jest](https://facebook.github.io/jest/) for executing tests,
- [webpack](https://webpack.js.org/) for assembling our JS,
- [eslint](https://eslint.org/) for analysing our JS,

We'll install them with the yarn add command:

    yarn add babel-polyfill babel-core babel-jest babel-loader babel-preset-env babel-preset-stage-2 eslint jest webpack@3
    
This will create a new directory node_modules, which is like the virtualenv for python, install jest and dependencies in it, and it will also create a file which you need to add to git: yarn.lock, the equivalent of requirements.txt.

Next, create a .babelrc file to load the env preset:


{{< highlight js>}}
{
  "presets": ["env"]
}
{{< / highlight >}}


We can now run the test runner with command:

    ./node_modules/.bin/jest
    
Now, let's build a webpack entrypoint, add a webpack.config.js to create a jstdd.js file in static/ directory based on index.js source ode, so django will be able to resolve it with staticfiles, as such:


{{< highlight js>}}
var path = require('path')

module.exports = {
  entry: {
    main: ['babel-polyfill', './index.js'],
  },
  output: {
    path: path.resolve('static'),
    filename: 'jstdd.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        //exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-2', 'babel-preset-env']
          }
        }
      }
    ]
  }
}
{{< / highlight >}}


Now, you can build the static/jstdd.js file ready for production:

    ./node_modules/.bin/webpack

Next, open your package.json, we'll add a scripts configuration:

We'll add a script section as such:


{{< highlight js>}}
{
  "name": "jstdd",
  ...
  "scripts": {
    "start": "webpack --watch",
    "prepare": "webpack",
    "test": "jest",
    "lint": "eslint ."
  }
}
{{< / highlight >}}


When a command is in scripts, it does not need to be specified with full ./node_modules path, we can now run those commands:


yarn test # runs js tests
yarn test -- --watch # watch js tests
yarn run lint # runs eslint and hurt your feelings
yarn prepare # build your JS for serving with webpack
yarn start # start webpack watcher
yarn publish # publish your package on npm


For a more complete example, with coverage, pipeline and all, see [facond](https://github.com/yourlabs/facond/issues/2)

Have FUN !

With LOVE
