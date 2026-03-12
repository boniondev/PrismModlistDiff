/*
    For reference:

    When Prism exports a modlist as CSV with all options ticked, it uses this format:
    modname,downloadURL,version,authorname,more authornames...,filename
    The number of author names is ALWAYS >= 1

*/

export class Mod {

    static BIT_NAME     = 1 << 0
    static BIT_URL      = 1 << 1
    static BIT_VERSION  = 1 << 2
    static BIT_AUTHOR   = 1 << 3
    static BIT_FILENAME = 1 << 4

    constructor(linestr) {

        let parsedline   = [""]
        parsedline       = linestr.split(',')
        this.modName     = parsedline[0]
        this.modURL      = parsedline[1]
        this.modVersion  = parsedline[2]
        this.modAuthor   = parsedline[3]  // We only take the first author for simplicity
        this.modFilename = parsedline[parsedline.length - 1]

    }

    compare(mod){

        let mask = 0

        if (this.modName !== mod.getModName())         mask |= BIT_NAME
        if (this.modURL !== mod.getModURL())           mask |= BIT_URL
        if (this.modVersion !== mod.getModVersion())   mask |= BIT_VERSION
        if (this.modAuthor !== mod.getModAuthor())     mask |= BIT_AUTHOR
        if (this.modFilename !== mod.getModFilename()) mask |= BIT_FILENAME

        return mask

    }

    getModName() {
        return this.modName
    }

    getModURL() {
        return this.modURL
    }

    getModVersion() {
        return this.modVersion
    }

    getModAuthor() {
        return this.modAuthor
    }

    getModFilename(){
        return this.modFilename
    }

}