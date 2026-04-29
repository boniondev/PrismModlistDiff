export class DuplicatedModReport {

    constructor(modName, versions){
        this.modName  = modName
        this.versions = versions
    }

    getModName() {
        return this.modName
    }

    getVersions() {
        return this.versions
    }

}