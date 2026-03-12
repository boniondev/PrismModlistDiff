const listInputForm         = document.getElementById("listInputForm")
const ListInputSubmitButton = document.getElementById("ListInputSubmitButton")
const listOneInputText      = document.getElementById("listOneInputText")
const listTwoInputText      = document.getElementById("listTwoInputText")

listInputForm.addEventListener("submit", (e) => {

    e.preventDefault()

    if (listOneInputText.textContent == '' && listTwoInputText.textContent == ''){
        // Cry about it here
    }

})
