import { Mod }       from './mod.js'
import { ModReport } from './modreport.js'
export class Modlist {

    constructor(modListString) {

        this.modListArray       = []
        const modStringLines    = modListString.split('\n')
        modStringLines.forEach(modListLine => {
            this.modListArray.push(new Mod(modListLine))
        });

    }

    compare(modList) {

        let modReports = []

        const secondModListArray = modList.getModListArray()
        this.modListArray.forEach((mod) => {

            let modFound = false

            for (let secondModListMod of secondModListArray) {
                const bitmask = mod.compare(secondModListMod)
                if (bitmask & Mod.BIT_NAME || bitmask & Mod.BIT_URL || bitmask & Mod.BIT_AUTHOR) continue // This is an entirely different mod, we can skip checking the rest
                if (bitmask & Mod.BIT_VERSION) {
                    modReports.push(new ModReport(ModReport.MOD_VERSION_MISMATCH, mod, secondModListMod.getModVersion()))
                    continue
                }
                if (bitmask & Mod.BIT_FILENAME) { // Ideally this never happens because the version is also likely different
                    modReports.push(new ModReport(ModReport.MOD_FILENAME_MISMATCH, mod, secondModListMod.getModFilename()))
                    continue
                }
                modFound = true // If this part of the code is reached, it means that all the fields are identical (no bits set)
                break
            }

            if (!modFound) modReports.push(new ModReport(ModReport.MOD_MISSING, mod))

        })

        for (let secondModListMod of secondModListArray) {

            let correspondingModFound = false

            for (let mod of this.modListArray) {

                const bitmask = secondModListMod.compare(mod)

                if (!(bitmask & Mod.BIT_NAME)
                    && !(bitmask & Mod.BIT_URL)
                    && !(bitmask & Mod.BIT_AUTHOR)
                    && !(bitmask & Mod.BIT_VERSION)
                    && !(bitmask & Mod.BIT_FILENAME)) {
                        correspondingModFound = true
                        break
                    }

            }

            if (!correspondingModFound) modReports.push(new ModReport(ModReport.MOD_UNEXPECTED, secondModListMod))

        }

        return modReports

    }

    getModListArray() {
        return this.modListArray
    }

}
