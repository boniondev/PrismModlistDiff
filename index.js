import { Modlist } from "./modlist.js"

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
    }

})
