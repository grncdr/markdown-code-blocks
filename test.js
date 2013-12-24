var fs = require('fs')
var assert = require('assert')
var concat = require('concat-stream')
var toCodeBlocks = require('./')

var thisFile = fs.readFileSync(__filename, 'utf8')
var readme = fs.createReadStream(__dirname + '/README.md', 'utf8').pipe(toCodeBlocks)

readme.pipe(markdownCodeBlocks()).pipe(concat(function (blocks) {
  console.log(blocks)
  assert.deepEqual(blocks, [
    {type: 'javascript', content: thisFile}
  ])
}))
