const mmm = require( 'mmmagic' );
const fsExtra = require( 'fs-extra' );

function varType( obj, strict = false ) {
  let type = ( {} ).toString.call( obj ).match( /\s([a-zA-Z]+)/ )[ 1 ].toLowerCase();

  if( type === 'function'
      && obj.prototype
      && Object.getOwnPropertyNames( obj.prototype ).some( m => m === 'constructor' )
      && /^\s*class/.test( obj.toString() )
  ) {
    type = 'class'
  }

  if( strict && typeof obj === 'object' ) { type = obj.constructor.name }

  return type;
}

async function detectFile( magic, filepath ) {
  if( ! await fsExtra.exists( filepath ) ) {
    return { status: false, filepath, msg: `Error: File not exists: '${filepath}'` };
  }

  return new Promise( ( resolve, reject ) =>
      magic.detectFile( filepath, function(err, mimetype) {
        if( err ) { reject( err ); return; }

        return resolve( { status: true, filepath, mimetype } );
      })
    )
    .catch( err => ({ status: false, filepath, msg: err.toString(), err }) )
}

async function isGenericType( generalType, magic, filepath ) {
  const response = await detectFile( magic, filepath );
  if( ! response.status ) { return response; }

  const regex = new RegExp( `^${generalType}/*` );
  const status = regex.test(response.mimetype);

  return status ? { status, filepath, mimetype: response.mimetype }
                : { status, filepath, mimetype: response.mimetype, failed: generalType, msg: `Error: File is not image: '${filepath}'` }
}

async function isType( type, magic, filepath ) {
  if( ! type || varType( type ) !== 'string' ) {
    return { status: false, filepath, failed: type, msg: `Error: type is string required.` }
  }

  const response = await detectFile( magic, filepath );
  if( ! response.status ) { return response; }

  const status = type === response.mimetype;

  return status ? { status, filepath, mimetype: response.mimetype }
                : { status, filepath, mimetype: response.mimetype, failed: type, msg: `Error: File is not image: '${filepath}'` }
}

async function isTypes( types, magic, filepath ) {
  if( ! types || varType( types ) !== 'array' ) {
    return { status: false, filepath, failed: types, msg: `Error: types is array required.` }
  }

  const response = await detectFile( magic, filepath );
  if( ! response.status ) { return response; }

  const status = types.includes( response.mimetype );

  return status ? { status, filepath, mimetype: response.mimetype }
                : { status, filepath, mimetype: response.mimetype, failed: types, msg: `Error: File is not image: '${filepath}'` }
}

class OMimeType {
  #magic;

  constructor() {
    const Magic = mmm.Magic;
    this.#magic = new Magic(mmm.MAGIC_MIME_TYPE);
  }

  /* region TYPES */

  static TYPES = {
    AAC      : 'audio/aac',
    ABW      : 'application/x-abiword',
    ARC      : 'application/x-freearc',
    AVIF     : 'image/avif',
    AVI      : 'video/x-msvideo',
    AZW      : 'application/vnd.amazon.ebook',
    BIN      : 'application/octet-stream',
    BMP      : 'image/bmp',
    BZ       : 'application/x-bzip',
    BZ2      : 'application/x-bzip2',
    CDA      : 'application/x-cdf',
    CSH      : 'application/x-csh',
    CSS      : 'text/css',
    CSV      : 'text/csv',
    DOC      : 'application/msword',
    DOCX     : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    EOT      : 'application/vnd.ms-fontobject',
    EPUB     : 'application/epub+zip',
    GZ       : 'application/gzip',
    GIF      : 'image/gif',
    HTM      : 'text/html',
    HTML     : 'text/html',
    ICO      : 'image/vnd.microsoft.icon',
    ICS      : 'text/calendar',
    JAR      : 'application/java-archive',
    JPEG     : 'image/jpeg',
    JPG      : 'image/jpeg',
    JS       : 'text/javascript',
    JSON     : 'application/json',
    JSONLD   : 'application/ld+json',
    MID      : 'audio/midi',
    MIDI     : 'audio/x-midi',
    MJS      : 'text/javascript',
    MP3      : 'audio/mpeg',
    MP4      : 'video/mp4',
    MPEG     : 'video/mpeg',
    MPKG     : 'application/vnd.apple.installer+xml',
    ODP      : 'application/vnd.oasis.opendocument.presentation',
    ODS      : 'application/vnd.oasis.opendocument.spreadsheet',
    ODT      : 'application/vnd.oasis.opendocument.text',
    OGA      : 'audio/ogg',
    OGV      : 'video/ogg',
    OGX      : 'application/ogg',
    OPUS     : 'audio/opus',
    OTF      : 'font/otf',
    PNG      : 'image/png',
    PDF      : 'application/pdf',
    PHP      : 'application/x-httpd-php',
    PPT      : 'application/vnd.ms-powerpoint',
    PPTX     : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    RAR      : 'application/vnd.rar',
    RTF      : 'application/rtf',
    SH       : 'application/x-sh',
    SVG      : 'image/svg+xml',
    TAR      : 'application/x-tar',
    TIF      : 'image/tiff',
    TIFF     : 'image/tiff',
    TS       : 'video/mp2t',
    TTF      : 'font/ttf',
    TXT      : 'text/plain',
    VSD      : 'application/vnd.visio',
    WAV      : 'audio/wav',
    WEBA     : 'audio/webm',
    WEBM     : 'video/webm',
    WEBP     : 'image/webp',
    WOFF     : 'font/woff',
    WOFF2    : 'font/woff2',
    XHTML    : 'application/xhtml+xml',
    XLS      : 'application/vnd.ms-excel',
    XLSX     : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    XML      : 'application/xml',
    XML_TEXT : 'text/xml',
    XML_ATOM : 'application/atom+xml',
    XUL      : 'application/vnd.mozilla.xul+xml',
    ZIP      : 'application/zip',
    '7Z'     : 'application/x-7z-compressed',
  }

  /* endregion */
  /* region fns default */

  async getFromFilepath( filepath ) {
    return await detectFile( this.#magic, filepath )
  }

  async isType( filepath, type ) {
    return await isType( type, this.#magic, filepath )
  }

  async isTypes( filepath, types ) {
    return await isTypes( types, this.#magic, filepath )
  }

  /* endregion */
  /* region fns static */

  static async GetFromFilepath( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return await detectFile( magic, filepath )
  }

  static async IsType( filepath, type ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isType( type, magic, filepath );
  }

  static async IsTypes( filepath, types ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isTypes( types, magic, filepath );
  }

  /* */

  static async IsImage( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isGenericType( 'image', magic, filepath );
  }

  static async IsAudio( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isGenericType( 'audio', magic, filepath );
  }

  static async IsVideo( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isGenericType( 'video', magic, filepath );
  }

  static async IsFont( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isGenericType( 'font', magic, filepath );
  }

  static async IsPdf( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isType( OMimeType.TYPES.PDF, magic, filepath );
  }

  static async IsPng( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isType( OMimeType.TYPES.PNG, magic, filepath );
  }

  static async IsJpg( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isTypes( [ OMimeType.TYPES.JPG, OMimeType.TYPES.JPEG ], magic, filepath );
  }

  static async IsJson( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isType( OMimeType.TYPES.JSON, magic, filepath );
  }

  static async IsXml( filepath ) {
    const Magic = mmm.Magic;
    const magic = new Magic(mmm.MAGIC_MIME_TYPE);

    return isTypes( [ OMimeType.TYPES.XML, OMimeType.TYPES.XML_TEXT, OMimeType.TYPES.XML_ATOM ], magic, filepath );
  }

}

module.exports = OMimeType;