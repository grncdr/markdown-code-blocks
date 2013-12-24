#!/usr/bin/env node

var input;
var argv = process.argv.slice(2)
var types = []

var markdownCodeBlocks = require('./')

while (argv[0] && argv[0].match(/^(-t|--types?)$/)) {
  argv.shift()
  types = types.concat(argv.shift().split(','))
}

if (argv[0]) {
  input = require('fs').createReadStream(argv[0], 'utf8')
} else {
  input = process.stdin
}

input.pipe(markdownCodeBlocks(types)).pipe(process.stdout)
