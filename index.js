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

const inputTextWrapper = document.getElementById('inputTextWrapper');
const inputText        = document.getElementById('inputText')

inputText.addEventListener('input', () => {

    const pastedText = inputText.value

    if (pastedText.length == 1) {
        scoldUserForTypingAndRetry()
    }

})

function scoldUserForTypingAndRetry() {
    inputText.disabled = true
    inputText.value = "Paste, don't type."
    animate(inputTextWrapper, {
        color      : ['#ff0000', '#000000'],
        duration   : 1000,
        ease       : 'inExpo', 
        onComplete : () => {
            inputText.value    = ''
            inputText.disabled = false
            inputTextWrapper.style.color = 'white'
            inputText.focus()
        }
    })
}