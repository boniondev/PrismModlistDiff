/*
    For reference:

    When Prism exports a modlist as CSV with all options ticked, it uses this format:
    modname,downloadURL,version,authorname,more authornames...,filename
    The number of author names is ALWAYS >= 1

*/

export class Mod {

    constructor(linestr) {

        let parsedline   = [""]
        parsedline       = linestr.split(',')
        this.modName     = parsedline[0]
        this.modURL      = parsedline[1]
        this.modVersion  = parsedline[2]
        this.modAuthor   = parsedline[3]  // We only take the first author for simplicity
        this.modFilename = parsedline[parsedline.length - 1]

    }

}