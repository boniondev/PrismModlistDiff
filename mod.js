export class Mod {

    static BIT_NAME     = 1 << 0
    static BIT_URL      = 1 << 1
    static BIT_VERSION  = 1 << 2
    static BIT_AUTHOR   = 1 << 3
    static BIT_FILENAME = 1 << 4

    constructor(modName,modURL,modVersion,modAuthor,modFilename) {

        this.modName     = modName
        this.modURL      = modURL
        this.modVersion  = modVersion
        this.modAuthor   = modAuthor
        this.modFilename = modFilename

    }

    compare(mod){

        let mask = 0

        if (this.modName !== mod.getModName())         mask |= Mod.BIT_NAME
        if (this.modURL !== mod.getModURL())           mask |= Mod.BIT_URL
        if (this.modVersion !== mod.getModVersion())   mask |= Mod.BIT_VERSION
        if (this.modAuthor !== mod.getModAuthor())     mask |= Mod.BIT_AUTHOR
        if (this.modFilename !== mod.getModFilename()) mask |= Mod.BIT_FILENAME

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