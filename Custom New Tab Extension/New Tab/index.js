document.getElementsByClassName("sr")[0].focus()
document.getElementsByClassName("sr")[0].select()
                                                                                                                                                                                                                                                             str3241 = "Dev mode"; str3422 = "5389"
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var bg_local = localStorage.getItem("bg")
        if (bg_local == null){
            document.body.style.backgroundImage = "url('background.jpg')"
        } else{
            document.body.style.backgroundImage = "url('" + bg_local + "')"
        }

        document.getElementsByClassName("notepad")[0].value = localStorage.getItem("note")
    }
}

$(".sr").on("keypress",function(e) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    var key = e.keyCode;
    if (key == 13){
        urlSearch(e)
    }
});

function urlSearch(){
    var input = document.getElementsByClassName("sr")[0].value

    window.location.href = "https://www.google.com/search?q=" + formatSearch(input);
}

function formatSearch(str){
    return str.replace(" ", "+")
}
document.getElementById('backg-picker').onchange = function(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        document.body.style.backgroundImage = "url('" + event.target.result + "')"
        localStorage.setItem("bg", event.target.result)
    };

    reader.readAsDataURL(selectedFile);
}

document.getElementsByClassName('save-text')[0].onclick = function() {
    if (document.getElementsByClassName("notepad")[0].value == str3241){
        document.getElementById("dev-panel-bt").hidden = false
        return null
    }
    localStorage.setItem("note", document.getElementsByClassName("notepad")[0].value)
    console.log(document.getElementsByClassName("notepad")[0].value)
}

for (const item of document.getElementsByClassName('dev-locked')){
    item.hidden = true
}

document.getElementById("recent").addEventListener("keydown", consoleEnter)

async function consoleEnter(event){
    if (event.keyCode == 13){
      event.preventDefault()
      var val = document.getElementById("recent").innerHTML
      
      if (val.includes("./autoblink")){
        window.location.href = "autoblink.html"
        resetInput()
        consoleMessage("Taking you to autoblinker...")
        beginConsoleInput()
      } else if (val.split(" ")[0] == "print" || val.split(" ")[0] == "echo"){
        var splitted = val.split(" ")
        var built = "";
        for (var i = 1; i < splitted.length; i++){
          built += splitted[i] + " "
        }
        resetInput()
        consoleMessage(built)
        beginConsoleInput()
      } else if (val == "ide" || val == "code" || val == "python"){
        window.location.href = "https://www.programiz.com/python-programming/online-compiler/"
      } else if (val == "virus"){
        window.close()
      } else if (val == "clear"){
        localStorage.clear()
        resetInput()
        consoleMessage("Local storage cleared. Refresh page or use command 'refresh' for it to take effect.")
        beginConsoleInput()
      } else if (val == "get-ls-data"){
        resetInput()
        consoleMessage("Background Image Data: <a href='" + localStorage.getItem("bg") + "'>Right Click -> Open in new tab (it's broken)</a>")
        consoleMessage("Notes Data: " + localStorage.getItem("note"))
        beginConsoleInput()
      } else if (val == "refresh"){
        window.location.reload()
      } else if (val == "hacker"){
        var out1 = consoleMessage(randomIntFromInterval(0, 1))
        while (true){
          out1.innerHTML += randomIntFromInterval(0, 1)
          await sleep(10)
          out1.scrollIntoView()
        }
      } else if (val.split(" ")[0].includes("temp-new-tab")){
        var strip = val.split(" ")
        var link = strip[1]
        var time = strip[2]
        if (!link.includes("https://")){
          link = "https://" + link
        }
        newTab = window.open(link)
        resetInput()
        consoleMessage("Opening '" + link + "' for " + time + " minutes.")
        await sleep(time * 1000 * 60)
        newTab.close()
        consoleMessage("Times up!")
        beginConsoleInput()
      } else if (val == "help"){
        resetInput()
        consoleMessage("./[launcher] - Opens a page from the filesystem. [launcher]: page | Avalible Pages: 'autoblink'")
        consoleMessage("ide | code | python - Opens an online python ide.")
        consoleMessage("print | echo [message] - Prints [message].")
        consoleMessage("clear - Clears localStorage. [REQUIRES REFRESH]")
        consoleMessage("get-ls-data - Prints data from localStorage.")
        consoleMessage("refresh - Refreshes the tab.")
        consoleMessage("temp-new-tab [link] [minutes] - Opens [link] for [minutes]. After [minutes] has passed, it closes.")
        consoleMessage("help - Prints this page.")
        beginConsoleInput()
      } else if (val.split(" ")[0] == "open"){
        var link = val.split(" ")[1]
        if (!link.includes("https://")){
          link = "https://" + link
        }
        window.location.href = link
      } else if (val.split(" ")[0] == "words"){
        let count
        var split = val.split(" ")
        count = split.length - 1
        resetInput()
        consoleMessage("Word Count: " + count)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "add"){
        var split = val.split(" ")
        let added = parseInt(split[1])
        for (var i = 2; i < split.length; i++){
          added += parseInt(split[i])
        }
        resetInput()
        consoleMessage(added)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "subtract"){
        var split = val.split(" ")
        let subbed = parseInt(split[1])
        for (var i = 2; i < split.length; i++){
          subbed -= parseInt(split[i])
        }
        resetInput()
        consoleMessage(subbed)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "multiply"){
        var split = val.split(" ")
        let mult = parseInt(split[1])
        for (var i = 2; i < split.length; i++){
          mult *= parseInt(split[i])
        }
        resetInput()
        consoleMessage(mult)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "divide"){
        var split = val.split(" ")
        let div = parseInt(split[1])
        for (var i = 2; i < split.length; i++){
          div /= parseInt(split[i])
        }
        resetInput()
        consoleMessage(div)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "list-add"){
        var split = val.split(" ")
        let add = parseInt(split[1])
        let oldAdd = add
        let limit = parseInt(split[2])
        resetInput()
        for (var i = 0; i < limit; i++){
          consoleMessage(add)
          add += oldAdd
        }
        beginConsoleInput()
      } else if (val == "./hamster") {
        while (true){
          await sleep(0)
          await window.open('https://i1.sndcdn.com/avatars-9URsF3lojdMu57Tw-Pnwj3Q-t500x500.jpg')
        }
      } else {
        resetInput()
        consoleMessage("Unknown Command.")
        beginConsoleInput()
      }
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetInput(){
  var recent = document.getElementById("recent")
  recent.id = ""
  recent.contentEditable = false
}

function consoleMessage(message){
  const newMessage = document.createElement("p")
  newMessage.innerHTML = message
  newMessage.class = "console-outputted"
  newMessage.style.color = "lime"
  newMessage.style.marginBottom = "0px"
  document.getElementsByClassName("console")[0].appendChild(newMessage)
  newMessage.scrollIntoView()

  return newMessage
}

function beginConsoleInput(){
  const newPreInput = document.createElement("p")
  newPreInput.innerHTML = "dev> "
  newPreInput.class = "console-outputted"
  newPreInput.style.display = "inline-block"
  newPreInput.style.marginBottom = "0px"
  newPreInput.style.color = "lime"
  document.getElementsByClassName("console")[0].appendChild(newPreInput)

  const newInput = document.createElement("p")
  newInput.class = "console-outputted"
  newInput.style.display = "inline-block"
  newInput.id = "recent"
  newInput.focus()
  newInput.contentEditable = true
  newInput.style.color = "lime"
  document.getElementsByClassName("console")[0].appendChild(newInput)
  newInput.addEventListener("keydown", consoleEnter)
  newInput.autocomplete = false 
  newInput.autocorrect = false
  newInput.autocapitalize = false
  newInput.spellcheck = false
  newInput.style.marginBottom = "0px"
  newInput.style.outline = "none"
}














class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  
  document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });