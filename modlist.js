import { Mod }       from './mod.js'
import { ModReport } from './modreport.js'
import { DuplicatedModReport } from './duplicatedmodreport.js'
export class Modlist {

    constructor(modListJSONString) {

        this.modListArray       = []
        const modListJsonObject = JSON.parse(modListJSONString)
        for (let modJSONObject of modListJsonObject) {
            this.modListArray.push(new Mod(
                modJSONObject['name'],
                modJSONObject['url'],
                modJSONObject['version'],
                modJSONObject['authors']?.[0] ?? "", // Again, we only consider the first author
                modJSONObject['version']
            ))
        }

    }

    compare(modList) {

        let modReports = []

        const secondModListArray = modList.getModListArray()
        this.modListArray.forEach((mod) => {

            let modFound = false

            for (let secondModListMod of secondModListArray) {
                const bitmask = mod.compare(secondModListMod)
                if (bitmask & Mod.BIT_NAME) continue // This is an entirely different mod, we can skip checking the rest
                if (bitmask & Mod.BIT_VERSION) {
                    modReports.push(new ModReport(ModReport.MOD_VERSION_MISMATCH, mod, secondModListMod.getModVersion()))
                    modFound = true // The mod IS there, it just has a different version
                    continue
                }
                if (bitmask & Mod.BIT_FILENAME) { // Ideally this never happens because the version is also likely different
                    modReports.push(new ModReport(ModReport.MOD_FILENAME_MISMATCH, mod, secondModListMod.getModFilename()))
                    modFound = true
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
                    && !(bitmask & Mod.BIT_AUTHOR)) {
                        correspondingModFound = true
                        break
                    }

            }

            if (!correspondingModFound) modReports.push(new ModReport(ModReport.MOD_UNEXPECTED, secondModListMod))

        }

        return modReports

    }

    selfCheckForDuplicates() {

        let duplicateModReports = []

        this.modListArray.forEach((mod, modIndex) => {

            let detectedVersions = [mod.getModVersion()]

            let reportAlreadyPresent = false

            if (duplicateModReports.length > 0) {
                for (let duplicatedModReport of duplicateModReports) {
                    if (mod.getModName() === duplicatedModReport.getModName()) {
                        reportAlreadyPresent = true
                        break
                    }
                }
            }

            if (!reportAlreadyPresent) {

                this.modListArray.forEach((altMod, altModIndex) => {

                    if (modIndex != altModIndex) {

                        let bitmask = mod.compare(altMod)

                        if (!(bitmask & Mod.BIT_NAME)
                            && (bitmask & Mod.BIT_VERSION)) {
                                detectedVersions.push(altMod.getModVersion())
                            }

                    }

                })

                if (detectedVersions.length > 1) {
                    duplicateModReports.push(new DuplicatedModReport(mod.getModName(), detectedVersions))
                }

            }
        })

        return duplicateModReports

    }

    getModListArray() {
        return this.modListArray
    }

}
