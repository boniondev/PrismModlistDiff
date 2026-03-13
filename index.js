import { Modlist } from "./modlist.js"
import { animate } from "./libs/anime-4.3.6-modules/animation/index.js"

/*
const listInputForm         = document.getElementById("listInputForm")
const listOneInputText      = document.getElementById("listOneInputText")
const listTwoInputText      = document.getElementById("listTwoInputText")

listInputForm.addEventListener("submit", (e) => {

    e.preventDefault()

    if (listOneInputText.value == '' && listTwoInputText.value == ''){
        // Cry about it here
    }

    const targetModList  = new Modlist(listOneInputText.value)
    const currentModList = new Modlist(listTwoInputText.value)

    const modReports = targetModList.compare(currentModList)

    if (modReports.length == 0) {
        console.log("They be the same!!!")
    } else {
        console.log(modReports)
    }

})
*/

const inputTextWrapper = document.getElementById('inputTextWrapper')
const inputText        = document.getElementById('inputText')

let firstModList  = ''
let secondModList = ''

fadeInInputTextWrapper()
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
            fadeInInputTextWrapper()
            inputText.disabled = false
            inputTextWrapper.style.color = 'white'
            inputText.focus()
        }
    })
}

function fadeInInputTextWrapper() {
    animate(inputTextWrapper, {
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

    const before = Date.now()

    const parsedFirstModList  = new Modlist(firstModList)
    const parsedSecondModList = new Modlist(secondModList)

    const modReports = parsedFirstModList.compare(parsedSecondModList)

    console.log(firstModList)
    console.log(parsedFirstModList)

    console.log("Checking took " + (Date.now() - before) + "ms")
    console.log(modReports)
}