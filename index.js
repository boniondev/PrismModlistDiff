import { Modlist } from "./modlist.js"
import { animate } from "./libs/anime-4.3.6-modules/animation/index.js"

const inputTextWrapper = document.getElementById('inputTextWrapper')
const inputText        = document.getElementById('inputText')

let firstModList  = ''
let secondModList = ''

fadeInElement(inputTextWrapper)
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
            inputText.removeEventListener('input', _on_inputText_input)
            fadeOutInputTextWrapper()
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

function fadeOutInputTextWrapper() {
    animate(inputTextWrapper, {
        opacity    : [1,0],
        duration   : 1000,
        easy       : 'inExpo',
        onComplete : () => {
            inputTextWrapper.remove()
            compareModLists()
        }
    })
}

function compareModLists() {

    const parsedFirstModList  = new Modlist(firstModList)
    const parsedSecondModList = new Modlist(secondModList)

    const modReports = parsedFirstModList.compare(parsedSecondModList)

    showResults(modReports)

}

function showResults(modReports) {

    const appWrapper = document.getElementById('appWrapper')

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

        let divMissingModsText = document.createElement('div')
        divMissingModsText.classList.add('resultContainerTextDiv')
        divMissingModsText.textContent = 'Missing mods'

        let divMissingModsContainer = document.createElement('div')
        divMissingModsContainer.id  = 'divMissingModsContainer'
        divMissingModsContainer.classList.add('resultContainer')
        divMissingModsContainer.appendChild(divMissingModsText)

        let divMismatchedModsText = document.createElement('div')
        divMismatchedModsText.classList.add('resultContainerTextDiv')
        divMismatchedModsText.textContent = 'Mismatched mods'

        let divMismatchedModsContainer = document.createElement('div')
        divMismatchedModsContainer     = 'divMismatchedModsContainer'
        divMismatchedModsContainer.classList.add('resultContainer')
        divMismatchedModsContainer.appendChild(divMismatchedModsText)

        let divExtraModsText = document.createElement('div')
        divExtraModsText.classList.add('resultContainerTextDiv')
        divExtraModsText.textContent = 'Extra mods'

        let divExtraModsContainer = document.createElement('div')
        divExtraModsContainer     = 'divExtraModsContainer'
        divExtraModsContainer.classList.add('resultContainer')
        divExtraModsContainer.appendChild(divExtraModsText)

        for (let modReport of modReports) {



        }
    }

}