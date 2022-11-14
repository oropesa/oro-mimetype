# Oro Mimetype

Class OroMimetype is a wrapper of mmmagic to simplify their use.

[mmmagic](https://www.npmjs.com/package/mmmagic) is a module for node.js that check the file _mimetype_ by their content (not the extension).

```shell
npm install oro-mimetype
```

Examples:

```js
const OMimetype = require( 'oro-mimetype' );

const response = await OMimeType.GetFromFilepath( 'image.png' );
// { status: true, filepath: 'image.png', mimetype: 'image/png' }

const response2 = await OMimeType.GetFromFilepath( 'file.pdf' );
// { status: true, filepath: 'file.pdf', mimetype: 'application/pdf' }

const response3 = await OMimeType.GetFromFilepath( 'file-not-exist.pdf' );
// { 
//   status: false, 
//   filepath: 'file-not-exist.pdf', 
//   msg: "Error: File not exists: 'file-not-exist.pdf'"
// }

const isImage = await OMimeType.IsImage( 'image.png' );
// { status: true, filepath: 'image.png', mimetype: 'image/png' }

const isImage2 = await OMimeType.IsImage( 'file.pdf' );
// { 
//   status: false, 
//   filepath: 'file.pdf', 
//   mimetype: 'application/pdf', 
//   failed: 'image', 
//   msg: "Error: File is not image: 'file.pdf'" 
// }


```

## Methods

```js
// TODO pending to be written 
```
