type GenericType = 'image' | 'audio' | 'video' | 'font' | 'text' | 'application';

export interface GetMimetypeOutputOK {
    status: true,
    filepath: string,
    mimetype: string
}

export interface GetMimetypeOutputKO {
    status: false,
    filepath: string,
    mimetype: string
}

export type GetMimetypeOutput = GetMimetypeOutputOK | GetMimetypeOutputKO;

export interface IsGenericTypeOutputKO {
    status: false,
    filepath: string | undefined,
    mimetype?: string,
    failed: GenericType,
    msg: string
}

export type IsGenericTypeOutputOK = GetMimetypeOutputOK;

export type IsGenericTypeOutput = IsGenericTypeOutputOK | IsGenericTypeOutputKO;

export interface IsTypeOutputKO {
    status: false,
    filepath: string | undefined,
    mimetype?: string,
    failed: string[],
    msg: string
}

export type IsTypeOutputOK = GetMimetypeOutputOK;

export type IsTypeOutput = IsTypeOutputOK | IsTypeOutputKO;

export declare class OMimetype {

    constructor()

    /* region fns default */

    getFromFilepath( filepath: string | undefined ): Promise<GetMimetypeOutput>

    isType( filepath: string | undefined, type: string | undefined ): Promise<IsTypeOutput>

    isTypes( filepath: string | undefined, type: string[] | undefined ): Promise<IsTypeOutput>

    /* endregion */
    /* region fns static */

    static GetFromFilepath( filepath: string | undefined ): Promise<GetMimetypeOutput>

    static IsType( filepath: string | undefined, type: string | undefined ): Promise<IsTypeOutput>

    static IsTypes( filepath: string | undefined, type: string[] | undefined ): Promise<IsTypeOutput>

    /* */

    static IsImage( filepath: string | undefined ): Promise<IsGenericTypeOutput>

    static IsAudio( filepath: string | undefined ): Promise<IsGenericTypeOutput>

    static IsVideo( filepath: string | undefined ): Promise<IsGenericTypeOutput>

    static IsFont( filepath: string | undefined ): Promise<IsGenericTypeOutput>

    static IsPdf( filepath: string | undefined ): Promise<IsTypeOutput>

    static IsPng( filepath: string | undefined ): Promise<IsTypeOutput>

    static IsJpg( filepath: string | undefined ): Promise<IsTypeOutput>

    static IsJson( filepath: string | undefined ): Promise<IsTypeOutput>

    static IsXml( filepath: string | undefined ): Promise<IsTypeOutput>

    /* endregion */
    /* region TYPES */

    static TYPES: {
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
}

export default OMimetype;