export class ModReport {

    static MOD_MISSING           = 0
    static MOD_UNEXPECTED        = 1 // TL;DR extra mod | To be used when the modlist that is being checked has a mod not present on the reference modlist
    static MOD_VERSION_MISMATCH  = 2
    static MOD_FILENAME_MISMATCH = 3

    constructor(reportType, mod, mismatchedValue = '') {
        this.reportType      = reportType
        this.mod             = mod
        this.mismatchedValue = mismatchedValue
    }

}
