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

        var new_body = document.createElement("body");
        new_body.style = "display: block !important;";
        new_body.id = "new_body";
        new_body.style = "width: 0px !important;";
        document.documentElement.appendChild(new_body);
        var command_bar = document.createElement("auto-extension-command-bar");
        command_bar.id = "commands-auto-extension";
        command_bar.contentEditable = true
        command_bar.style = "border-style: solid !important; color: white !important; resize: none !important; width: 1200px !important; background-color: rgb(105, 105, 105) !important; font-size: 40px !important; border-width: 2px !important; border-color: rgb(9, 141, 255) !important; top: 20px !important; position: fixed !important; left: 20px !important; display: none !important; border-radius: 5px 5px 0px 0px !important; z-index: 9999999 !important; padding: 10px !important; line-height: 48px !important; overflow: hidden !important; box-sizing: unset !important; height: 50px !important;";
        var style = new_body.appendChild(document.createElement("style"));
        style.innerHTML = "#commands-auto-extension:focus { outline: none !important; border: 2px solid rgb(9, 141, 255); }";
        var back = document.createElement("div");
        back.style = "position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 9999999; display: none;";
        var preview = document.createElement("auto-extension-preview-element");
        preview.id = "preview-auto-extension";
        preview.contentEditable = false
        preview.disabled = true 
        preview.style = "-webkit-box-sizing: unset !important; border-style: solid !important; color: white !important; resize: none !important; width: 1200px !important; background-color: rgb(105, 105, 105) !important; font-size: 40px !important; border-width: 2px !important; border-color: rgb(120, 120, 120) rgb(9, 141, 255) rgb(9, 141, 255) !important; top: 89px !important; position: fixed !important; left: 20px !important; display: none !important; border-radius: 0px 0px 5px 5px !important; z-index: 9999999 !important; font-family: consolas !important; padding: 10px !important; line-height: 45px !important; overflow: hidden !important; box-shadow: none !important; user-select: none !important; box-sizing: unset !important; height: 50px !important;";
        new_body.prepend(preview);
        new_body.prepend(command_bar);
        new_body.prepend(back);

        command_bar.addEventListener("keydown", function(e) {
          if (e.which == 13) {
              var command = command_bar.innerHTML;
              e.preventDefault();
      
              if (command.startsWith(":")){
                  command = command.substring(1);
                  command.replace(" ", "");
                  if (!command.includes("https://") || !command.includes("http://") || !command.includes("edge://") || !command.includes("file://") || !command.includes("chrome://")){
                      command = "https://" + command;
                  }
                  document.location.href = command;
              } else if (command.startsWith("+")){
                  command = command.substring(1);
                  command.replace(" ", "");
                  if (!command.includes("https://") || !command.includes("http://") || !command.includes("edge://") || !command.includes("file://") || !command.includes("chrome://")){
                      command = "https://" + command;
                  }
                  if (command == "") {
                      window.open("edge://newtab")
                  } else {
                      window.open(command);
                  }
              } else if (command.startsWith("=")){
                  command = command.substring(1);
                  window.open("https://google.com/search?q=" + command);
              } else if (command.toLowerCase() == "refresh" || command.toLowerCase() == "reload" || command.toLowerCase() == "r"){
                  document.location.reload();
              } else if (command.startsWith("def")){
                  command = command.substring(3);
                  command.replace(" ", "");
                  window.open("https://www.dictionary.com/browse/" + command);
              } else if (command.startsWith("syn")){
                  command = command.substring(3);
                  command.replace(" ", "");
                  window.open("https://www.thesaurus.com/browse/" + command);
              } 
      
              if (preview.innerHTML != "Command not found"){
                  command_bar.innerHTML = "";
                  command_bar.style.display = "none";
                  back.style.display = "none";
                  preview.style.display = "none";
                  document.activeElement.blur();
              }
          }
      });
      
      setInterval(function(){
          var command = command_bar.innerHTML;
      
          if (command.startsWith(":")){
              preview.innerHTML = "Go to " + command.substring(1);
          } else if (command.startsWith("+")){
              preview.innerHTML = "Open " + command.substring(1);
          } else if (command.startsWith("=")){
              preview.innerHTML = "Search " + command.substring(1);
          } else if (command.toLowerCase() == "refresh" || command.toLowerCase() == "reload" || command.toLowerCase() == "r"){
              preview.innerHTML = "Reload Page";
          } else if (command.startsWith("def")){
              preview.innerHTML = "Define " + command.substring(3);
          } else if (command.startsWith("syn")){
              preview.innerHTML = "Synonym of " + command.substring(3);
          } else if (command != ""){
              preview.innerHTML = "Command not found";
          } else {
              preview.innerHTML = "";
          }
      }, 50)
      
      document.addEventListener("keydown", function(e) {
          if (e.ctrlKey && e.shiftKey && e.altKey) {
              if (command_bar.style.display == "none") {
                  command_bar.style.display = "block";
                  back.style.display = "block";
                  preview.style.display = "block";
                  if (getSelectionText() != "") {
                      command_bar.innerHTML = "=" + getSelectionText().replace("\\n", " ");
                  }
                  command_bar.focus();
              }
          }
      
          if (e.which == 27) {
              if (command_bar.style.display == "block") {
                  command_bar.style.display = "none";
                  back.style.display = "none";
                  preview.style.display = "none";
                  document.activeElement.blur();
              }
          }
      });
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
      } else if (val.split(" ")[0] == "open"){
        var link = val.split(" ")[1]
        if (!link.includes("https://")){
          link = "https://" + link
        }
        window.location.href = link
      } else if (val.split(" ")[0] == "count"){
        var splitted = val.split(" ")
        var built = "";
        for (var i = 1; i < splitted.length; i++){
          built += splitted[i] + " "
        }
        resetInput()
        consoleMessage("Words: " + built.split(" ").length)
        consoleMessage("Characters: " + built.length)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "add"){
        // print the sum of all the next arguments
        var splitted = val.split(" ")
        var built = 0;
        for (var i = 1; i < splitted.length; i++){
          built += parseInt(splitted[i])
        }
        resetInput()
        consoleMessage("Sum: " + built)
        beginConsoleInput()
      } else if (val.split(" ")[0] == "subtract") {
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
      } else if (val.split(" ")[0] == "sqrt"){
        var split = val.split(" ")
        let sqrt = parseInt(split[1])
        resetInput()
        consoleMessage(Math.sqrt(sqrt))
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
      }  else if (val.split(" ")[0] == "hack"){
        var splitted = val.split(" ")
        var built = ""
        for (var i = 1; i < splitted.length; i++){
          built += splitted[i] + " "
        }
        resetInput()
        consoleMessage("Hacking...")
        await sleep(3000)
        consoleMessage("Hacked! Opening website...")
        await sleep(100)
        var tab = window.open(built)
        tab.alert("This website has been hacked!")
        var element = tab.document.createElement("iframe", {width: 560, height: 315, src: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", frameborder: 0, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"})
        tab.document.body.appendChild(element)
        beginConsoleInput()
      } else if (val == "./hampter") {
        while (true){
          await sleep(0)
          await window.open('https://i1.sndcdn.com/avatars-9URsF3lojdMu57Tw-Pnwj3Q-t500x500.jpg')
        }
      } else if (val.split(" ")[0] == "setstoragekey"){
        var split = val.split(" ")
        var key = split[1]
        var val = split[2]
        localStorage.setItem(key, val)
        resetInput()
        consoleMessage("Set " + key + " to " + val + ".")
        beginConsoleInput()
      } else if (val.split(" ")[0] == "clearstoragekey"){
        var key = val.split(" ")[1]
        localStorage.removeItem(key)
        resetInput()
        consoleMessage("Cleared " + key + ".")
        beginConsoleInput()
      } else if (val.split(" ")[0] == "getstoragekey"){
        var key = val.split(" ")[1]
        resetInput()
        consoleMessage(localStorage.getItem(key))
        beginConsoleInput()
      } else if (val == "./rickroll"){
        resetInput()
        consoleMessage("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"></iframe>")
        beginConsoleInput()
      } else if (val == "./get-free-robux"){
        resetInput()
        consoleMessage("Getting free Robux...")
        await sleep(3000)
        consoleMessage("Success!")
        consoleMessage("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"></iframe>")
        beginConsoleInput()
      } else if (val == "./get-free-vbucks"){
        resetInput()
        consoleMessage("Getting free V-Bucks...")
        await sleep(3000)
        consoleMessage("Success!")
        consoleMessage("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"></iframe>")
        beginConsoleInput()
      } else if (val == "./get-free-diamonds"){
        resetInput()
        consoleMessage("Getting free Diamonds...")
        await sleep(3000)
        consoleMessage("Success!")
        consoleMessage("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"></iframe>")
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random"){
        var split = val.split(" ")
        var min = parseInt(split[1])
        var max = parseInt(split[2])
        resetInput()
        consoleMessage(randomIntFromInterval(min, max))
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random-element"){
        resetInput()
        consoleMessage(getRandomElement())
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random-string"){
        resetInput()
        consoleMessage(getRandomString(val.split(" ")[1]))
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random-color"){
        resetInput()
        var color = getRandomColor()
        var mess = consoleMessage(color)
        mess.style.color = color
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random-number-game"){
        resetInput()
        randomNumberGame()
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random-image"){
        resetInput()
        consoleMessage(getRandomImage(val.split(" ")[1], val.split(" ")[2]))
        beginConsoleInput()
      } else if (val.split(" ")[0] == "random-uuid"){
        resetInput()
        var uuid = generateUUID()
        consoleMessage(uuid)
        consoleMessage("<a href='https://namemc.com/profile/" + uuid + "'>Click to view NameMC profile with this UUID</a>")
        beginConsoleInput()
      } else if (val == "help"){
        resetInput()
        consoleMessage("<b>Commands:</b>")
        consoleMessage("<b>help</b> - Prints this message.")
        consoleMessage("<b>clear</b> - Clears the localStorage.")
        consoleMessage("<b>clearstoragekey [key]</b> - Clears a key from local storage.")
        consoleMessage("<b>getstoragekey [key]</b> - Gets a key from local storage.")
        consoleMessage("<b>setstoragekey [key] [val]</b> - Sets a key in local storage.")
        consoleMessage("<b>random [min] [max]</b> - Generates a random number between two numbers.")
        consoleMessage("<b>random-element</b> - Gets a random element from the DOM.")
        consoleMessage("<b>random-string [length]</b> - Generates a random string of a certain length.")
        consoleMessage("<b>random-color</b> - Generates a random color.")
        consoleMessage("<b>random-number-game</b> - Starts a random number game.")
        consoleMessage("<b>random-image [width px] [height px]</b> - Generates a random image.")
        consoleMessage("<b>random-uuid</b> - Generates a random UUID.")
        beginConsoleInput()
      } else if (val == "money-game"){
        resetInput()
        var game = new MoneyGame()
        game.start()
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

function randomIntFromInterval(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
  newPreInput.innerHTML = "dev>\u00A0 "
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
  newInput.scrollIntoView()
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`!@#$%^&*()-=[];',./~_+{}|:<>?    ";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// Pick a random element from the DOM
function getRandomElement() {
  var elements = document.querySelectorAll("*");
  var element = elements[Math.floor(Math.random() * elements.length)].outerHTML.toString()
  console.log(element)
  return element;
}

// generate a random image made of pixels
function getRandomImage(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  var r, g, b, a;
  for (var i = 0, n = data.length; i < n; i += 4) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    a = 256;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  }
  ctx.putImageData(imageData, 0, 0);
  var img = document.createElement("img")
  img.src = canvas.toDataURL();
  return img.outerHTML;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// A random number game where a bot will guess a number between 1 and 100
function randomNumberGame(){
  var number = randomIntFromInterval(1, 100)
  var botGuess = randomIntFromInterval(1, 100)
  var guess = botGuess
  var tries = 0
  while (guess != number){
    tries++
    consoleMessage("Bot: " + botGuess)
    if (guess > number){
      botGuess--
      consoleMessage("Game: Too High!")
    } else if (guess < number){
      consoleMessage("Game: Too Low!")
      botGuess++
    }
    guess = botGuess
  }
  consoleMessage("")
  consoleMessage("Bot guessed the number in " + tries + " tries.")
  consoleMessage("")
}

function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class MoneyGame {
  constructor() {
    this.money = 0
    this.money_per_enter = 1
    this.money_per_second = 0

    this.buyable_items = [
      new Item("Printer", 10, "Prints another dollar every enter.", 0),
      new Item("Printer-3000", 1000, "Gain another dollar every second.", 0),
    ]
  }

  start(){
    consoleMessage("Welcome to the Money Game!")
    consoleMessage("Money: " + numberWithCommas(this.money))
    consoleMessage("")
    consoleMessage("You can earn money by pressing enter.")
    consoleMessage("To get to the store, type 'store'.")
    beginConsoleInput()
    document.getElementById("recent").removeEventListener("keydown", consoleEnter)
    document.getElementById("recent").addEventListener("keydown", this.entered)
  }

  buy(item){
    if (this.money >= item.cost){
      this.money -= item.cost
      item.amount++
      item.cost = Math.floor(item.cost * 1.5)
      consoleMessage("You bought " + item.name + " for $" + numberWithCommas(item.cost) + ".")
    } else {
      consoleMessage("You don't have enough money to buy " + item.name + ".")
    }
  }

  entered(val){
    if (val == "store"){
      consoleMessage("")
      consoleMessage("Store")
      consoleMessage("")
      for (var i = 0; i < this.buyable_items.length; i++){
        var item = this.buyable_items[i]
        consoleMessage(item.name + ": $" + numberWithCommas(item.cost) + " - " + item.description)
      }
      consoleMessage("")
      consoleMessage("To buy an item, type 'buy <item name>'.")
      beginConsoleInput()
    } if (val == "exit"){
      consoleMessage("")
      consoleMessage("You exited the store.")
      consoleMessage("")
      beginConsoleInput()
    } else if (val.startsWith("buy ")) {
      var name = val.substring(4)
      var item = this.buyable_items.find(i => i.name == name)
      if (item != undefined){
        this.buy(item)
      } else {
        consoleMessage("You can't buy " + name + ".")
      }
    } else {
      this.money += this.money_per_enter
      consoleMessage("You earned $" + numberWithCommas(this.money_per_enter) + ". You now have $" + numberWithCommas(this.money) + ".")
    }

    document.getElementById("recent").addEventListener("keydown", this.entered)
  }

  async updateMoneyPerSecond(){
    this.money += this.money_per_second
    await sleep(1000)
    this.updateMoneyPerSecond()
  }
}

class Item {
  constructor(name, cost, description, amount) {
    this.name = name
    this.cost = cost
    this.description = description
    this.amount = amount
  }
}