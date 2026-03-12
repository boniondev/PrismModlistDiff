import { Modlist } from "./modlist"

const listInputForm         = document.getElementById("listInputForm")
const listOneInputText      = document.getElementById("listOneInputText")
const listTwoInputText      = document.getElementById("listTwoInputText")

listInputForm.addEventListener("submit", (e) => {

    e.preventDefault()

    if (listOneInputText.textContent == '' && listTwoInputText.textContent == ''){
        // Cry about it here
    }

    const targetModList  = new Modlist(listOneInputText.textContent)
    const currentModList = new Modlist(listTwoInputText.textContent)

    const modReports = targetModList.compare(currentModList)

    if (modReports.length == 0) {
        console.log("They be the same!!!")
    }

})
