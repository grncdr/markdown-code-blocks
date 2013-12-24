var arrayify = require('arrayify')
var duplexer = require('duplexer')
var split = require('split')
var through = require('through2')

var FENCE = /^\`\`\`([\w_-]+)?\s*$/

module.exports = function createTransform (types) {
  var last = ""
  var types = arrayify(types)
  var block = false;
  var collector = through(function eachLine (line, enc, callback) {
    line = line.toString()
    var match = line.match(FENCE)
    if (match) {
      if (block !== false) {
        // output the block
        this.push(block)
        block = false
      }
      else if (!types.length || types.indexOf(match[1]) > -1) {
        // start a new block
        block = ""
      }
    } else if (block !== false) {
      block += line + "\n"
    }
    callback()
  })
  var splitter = split()
  splitter.pipe(collector)
  return duplexer(splitter, collector)
}
