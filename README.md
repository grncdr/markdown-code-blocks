# markdown-code-blocks

A through stream that extracts code from Markdown content, optionally selecting
only code blocks of a selected type.

Currently this only works with GFM-style fenced code blocks, I don't have a need
for indentation based blocks (yet). This README file makes a nice example:

```
$ markdown-code-blocks -t javascript < ./README.md
```

Will output:

```javascript
var fs = require('fs')
var assert = require('assert')
var concat = require('concat-stream')
var markdownCodeBlocks = require('./')

var readme = fs.createReadStream(__dirname + '/README.md', 'utf8')

readme.pipe(markdownCodeBlocks('javascript')).pipe(concat(function (code) {
  // Writing code that asserts it's own contents is kind of tricky...
  assert.deepEqual(code.toString().split('\n').slice(0, 10), [
    "var fs = require('fs')",
    "var assert = require('assert')",
    "var concat = require('concat-stream')",
    "var markdownCodeBlocks = require('./')",
    "",
    "var readme = fs.createReadStream(__dirname + '/README.md', 'utf8')",
    "",
    "readme.pipe(markdownCodeBlocks('javascript')).pipe(concat(function (code) {",
    "  // Writing code that asserts it's own contents is kind of tricky...",
    "  assert.deepEqual(code.toString().split('\\n').slice(0, 10), ["
  ])
}))
```

Which you can pipe into `node` to verify that this module is working:

```
$ markdown-code-blocks -t javascript < README.md | node
```

## API

```ocaml
module.exports = (types: String|Array<String>) => Transform<String, String>
```

## License

MIT
