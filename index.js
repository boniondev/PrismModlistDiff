import { Modlist } from "./modlist.js"
import { ModReport } from "./modreport.js"
import { animate } from "./libs/anime-4.3.6-modules/animation/index.js"

const inputTextWrapper       = document.getElementById('inputTextWrapper')
const inputText              = document.getElementById('inputText')
const JSWarning              = document.getElementById('JSWarning')
const appWrapper             = document.getElementById('appWrapper')
const modListCheckBoxWrapper = document.getElementById('modListCheckBoxWrapper')
const modlistCheckCheckbox   = document.getElementById('modlistCheckCheckbox')

let firstModList       = ''
let secondModList      = ''
let checkForDuplicates = false

JSWarning.remove()
appWrapper.style.display = 'flex'
fadeInElement([inputTextWrapper, modListCheckBoxWrapper])
inputText.focus()

inputText.addEventListener('input', _on_inputText_input)

function _on_inputText_input() {
    const pastedText = inputText.value

    if (pastedText.length == 1) {
        scoldUserForTypingAndRetry()
    } else {
        if (firstModList === '') {
            firstModList = inputText.value
            inputText.value = ''
            inputText.placeholder = 'Paste the current modlist here...'
        }
        else if (secondModList === '') {
            inputText.disabled = true
            secondModList = inputText.value
            inputText.placeholder = 'Splendid.'
            inputText.value = ''
            modlistCheckCheckbox.disabled = true
            checkForDuplicates = modlistCheckCheckbox.checked
            inputText.removeEventListener('input', _on_inputText_input)
            fadeOutElements()
        }
    }
}

function scoldUserForTypingAndRetry() {
    inputText.disabled = true
    inputText.value = "Paste, don't type."
    animate(inputTextWrapper, {
        color      : ['#ff0000', '#000000'],
        duration   : 1000,
        ease       : 'inExpo', 
        onComplete : () => {
            inputText.value    = ''
            fadeInElement(inputTextWrapper)
            inputText.disabled = false
            inputTextWrapper.style.color = 'white'
            inputText.focus()
        }
    })
}

function fadeInElement(el) {
    animate(el, {
        opacity  : [0, 1],
        duration : 1000,
    })
}

function fadeOutElements() {
    animate([modListCheckBoxWrapper,inputTextWrapper], {
        opacity    : [1,0],
        duration   : 1000,
        easy       : 'inExpo',
        onComplete : () => {
            inputTextWrapper.remove()
            modListCheckBoxWrapper.remove()
            startProcessing()
        }
    })
}

function startProcessing() {

    const parsedFirstModList  = new Modlist(firstModList)
    const parsedSecondModList = new Modlist(secondModList)

    if (checkForDuplicates) {

        let duplicatedModsInFirstModlist  = parsedFirstModList.selfCheckForDuplicates()
        let duplicatedModsInSecondModlist = parsedSecondModList.selfCheckForDuplicates()

        if (duplicatedModsInFirstModlist.length > 0 || duplicatedModsInSecondModlist.length > 0) {

            let divDuplicatedModsInModLists = document.createElement('div')
            divDuplicatedModsInModLists.id  = 'divDuplicatedModsInModLists'
            appWrapper.appendChild(divDuplicatedModsInModLists)

            if (duplicatedModsInFirstModlist.length > 0) {

                let duplicatedModsinFirstModListTable = document.createElement('table')
                divDuplicatedModsInModLists.appendChild(duplicatedModsinFirstModListTable)

                let duplicatedModsinFirstModListTable1stRow                      = document.createElement('tr')
                let duplicatedModsinFirstModListTableModName1stTableHeader       = document.createElement('th')
                duplicatedModsinFirstModListTableModName1stTableHeader.innerText = 'Mod'
                let duplicatedModsinFirstModListTableModName2ndTableHeader       = document.createElement('th')
                duplicatedModsinFirstModListTableModName2ndTableHeader.innerText = 'Versions'
                duplicatedModsinFirstModListTable1stRow.appendChild(duplicatedModsinFirstModListTableModName1stTableHeader)
                duplicatedModsinFirstModListTable1stRow.appendChild(duplicatedModsinFirstModListTableModName2ndTableHeader)

                duplicatedModsinFirstModListTable.appendChild(duplicatedModsinFirstModListTable1stRow)

                for (let duplicatedModReport of duplicatedModsInFirstModlist) {

                    let versions = duplicatedModReport.getVersions()

                    let newrow = document.createElement('tr')

                    let modname = document.createElement('td')
                    modname.rowSpan = versions.length + 1 
                    modname.innerText = duplicatedModReport.getModName()
                    newrow.appendChild(modname)
                    duplicatedModsinFirstModListTable.appendChild(newrow)

                    for (let modVersion of versions) {

                        let newerrow = document.createElement('tr')
                        let newtabledata = document.createElement('td')
                        newtabledata.innerText = modVersion
                        newerrow.appendChild(newtabledata)
                        duplicatedModsinFirstModListTable.appendChild(newerrow)

                    }

                }
            }

            if (duplicatedModsInSecondModlist.length > 0) {

                let duplicatedModsinSecondModListTable = document.createElement('table')
                divDuplicatedModsInModLists.appendChild(duplicatedModsinSecondModListTable)

                let duplicatedModsinSecondModListTable1stRow                      = document.createElement('tr')
                let duplicatedModsinSecondModListTableModName1stTableHeader       = document.createElement('th')
                duplicatedModsinSecondModListTableModName1stTableHeader.innerText = 'Mod'
                let duplicatedModsinSecondModListTableModName2ndTableHeader       = document.createElement('th')
                duplicatedModsinSecondModListTableModName2ndTableHeader.innerText = 'Versions'
                duplicatedModsinSecondModListTable1stRow.appendChild(duplicatedModsinSecondModListTableModName1stTableHeader)
                duplicatedModsinSecondModListTable1stRow.appendChild(duplicatedModsinSecondModListTableModName2ndTableHeader)

                duplicatedModsinSecondModListTable.appendChild(duplicatedModsinSecondModListTable1stRow)

                for (let duplicatedModReport of duplicatedModsInSecondModlist) {

                    let versions = duplicatedModReport.getVersions()

                    let newrow = document.createElement('tr')

                    let modname = document.createElement('td')
                    modname.rowSpan = versions.length + 1
                    modname.innerText = duplicatedModReport.getModName()
                    newrow.appendChild(modname)
                    duplicatedModsinSecondModListTable.appendChild(newrow)

                    for (let modVersion of versions) {

                        let newerrow = document.createElement('tr')
                        let newtabledata = document.createElement('td')
                        newtabledata.innerHTML = modVersion
                        newerrow.appendChild(newtabledata)
                        duplicatedModsinSecondModListTable.appendChild(newerrow)

                    }

                }

            }

        }

    }

}

function compareModLists() {

    const parsedFirstModList  = new Modlist(firstModList)
    const parsedSecondModList = new Modlist(secondModList)

    const modReports = parsedFirstModList.compare(parsedSecondModList)

    showResults(modReports)

}

function showResults(modReports) {

    const resultWrapper = document.createElement('div')
    resultWrapper.id = 'resultWrapper'

    if (modReports.length == 0) {
        const divIdenticalModLists       = document.createElement('div')
        divIdenticalModLists.id          = 'divIdenticalModLists'
        divIdenticalModLists.textContent = 'The modlists are identical.'
        resultWrapper.appendChild(divIdenticalModLists)
        appWrapper.appendChild(resultWrapper)
        fadeInElement(divIdenticalModLists)
    } else {

        let ulMissingModsList = document.createElement('ul')

        let divMissingModsText = document.createElement('div')
        divMissingModsText.classList.add('resultContainerTextDiv')
        divMissingModsText.textContent = 'Missing mods'

        let divMissingModsContainer = document.createElement('div')
        divMissingModsContainer.id  = 'divMissingModsContainer'
        divMissingModsContainer.classList.add('resultContainer')
        divMissingModsContainer.appendChild(divMissingModsText)
        divMissingModsContainer.appendChild(ulMissingModsList)

        let ulMismatchedModsList = document.createElement('ul')

        let divMismatchedModsText = document.createElement('div')
        divMismatchedModsText.classList.add('resultContainerTextDiv')
        divMismatchedModsText.textContent = 'Mismatched mods'

        let divMismatchedModsContainer = document.createElement('div')
        divMismatchedModsContainer.id  = 'divMismatchedModsContainer'
        divMismatchedModsContainer.classList.add('resultContainer')
        divMismatchedModsContainer.appendChild(divMismatchedModsText)
        divMismatchedModsContainer.appendChild(ulMismatchedModsList)

        let ulExtraModsList = document.createElement('ul')

        let divExtraModsText = document.createElement('div')
        divExtraModsText.classList.add('resultContainerTextDiv')
        divExtraModsText.textContent = 'Extra mods'

        let divExtraModsContainer = document.createElement('div')
        divExtraModsContainer.id  = 'divExtraModsContainer'
        divExtraModsContainer.classList.add('resultContainer')
        divExtraModsContainer.appendChild(divExtraModsText)
        divExtraModsContainer.appendChild(ulExtraModsList)

        resultWrapper.appendChild(divMissingModsContainer)
        resultWrapper.appendChild(divMismatchedModsContainer)
        resultWrapper.appendChild(divExtraModsContainer)

        for (let modReport of modReports) {

            let modReportText = document.createElement('li')
            modReportText.classList.add('listItemModReportEntry')

                switch (modReport.getReportType()) {

                    case ModReport.MOD_MISSING:
                        let missingMod = modReport.getMod()
                        modReportText.textContent = missingMod.getModName() + ' [' + missingMod.getModVersion() + ']'
                        ulMissingModsList.appendChild(modReportText)
                        break
                    case ModReport.MOD_UNEXPECTED:
                        let unexpectedMod = modReport.getMod()
                        modReportText.textContent = unexpectedMod.getModName() + ' [' + unexpectedMod.getModVersion() + ']'
                        ulExtraModsList.appendChild(modReportText)
                        break
                    case ModReport.MOD_VERSION_MISMATCH:
                        let versionMismatchedMod = modReport.getMod()
                        modReportText.textContent = versionMismatchedMod.getModName() + ' [' + modReport.getMismatchedValue() + '] -> [' + versionMismatchedMod.getModVersion() + ']'
                        ulMismatchedModsList.appendChild(modReportText)
                        break
                        case ModReport.MOD_FILENAME_MISMATCH:
                        // Surprisingly, no thing here. I find it unlikely that a mod has same version BUT a different filename. I guess print something onscreen?

                }

        }

        appWrapper.appendChild(resultWrapper)

    }

}