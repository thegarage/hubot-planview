[![Build Status](https://travis-ci.org/thegarage/hubot-planview.svg?branch=master)](https://travis-ci.org/thegarage/hubot-planview)

hubot-planview
==============

> Just a friendly robotic reminder to fill in your timesheets.

## Installation

set `HUBOT_PLANVIEW_ROOMS` with list of rooms to notify (comma separated)

## Installation via NPM

Run the following command to install this module as a Hubot dependency

```
npm install hubot-planview --save
```

Confirm that hubot-planview appears as a dependency in your Hubot package.json file.

```
"dependencies": {
  "hubot":              "2.x",
  "hubot-scripts":      "2.x",
  "hubot-planview": "*"
}
```

Add hubot-planview to your external-scripts.json:

```
["hubot-planview"]
```

## Contributing

Running Unit Tests:
```bash
$ npm test
```

Feel free! Send a pull request :)

