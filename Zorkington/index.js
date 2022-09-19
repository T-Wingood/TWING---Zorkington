const { constants } = require('buffer');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start(); //! Starts Program

async function start(){ // Opening Prompt - enter game, check game info, exit game.
    const welcomeMessage = `Welcome to coding challenge week 2.\n Type "P" to play the game. \n Type "I" for game info (start here for first time players)\n Type "W" for win route (provides direct inputs to meet the story requirements)\n Type "Q" to quit\n >_`;
let answer = await ask (welcomeMessage);
switch (answer.toLowerCase()){ // opening prompt responses, change case " " to adjust key inputs. Change welcomeMessage as needed. 
    case "p":
        console.log("Starting the Game...\n\n\n")
        roomOneOutdoors()
        break
    case "i":
        gameInfo()
        break
    case "w":
        winRoute()
        break
    case "q":
        process.exit()
    default:
        await ask (">_")       
}
function gameInfo(){ // Information pertaining to the game: objective, appropriate inputs
    console.log ("\nWelcome to the coding challenge game. Your objective is to enter the ENDGAME password into the ENDGAME machine\nHere are some helpful inputs.\n\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n")
    start()
}
function winRoute(){ //Quick guide on winning the game based on assignment objectives
  console.log(`\n1)Type "jump"\n2)Type "use code 1234"\n3)Type "use foyer door"\n4)Type "use code 4321"\n5)Type "use foyer door"\n6)Type "use lobby door"\n7)Type "use foyer door"\n8)Type "pickup paper"\n9)Type "inventory\n10)Type "check room inventory"\n11)Type "drop paper"\n12)Type "inventory"\n13)Type "check room inventory"\n14)Type "use bathroom door"\n15)Type "use foyer door"\n16)Type "use garden door"\n17)Type "pickup coy pond"\n18)Type "use overlook door"\n19)Type "use endgame door"\n20)Type "use computer"\n21)Type "input 802"\n22)Type "use computer"\n\n\n`)
  start()

}

//! ------------------------ Background Functions that the game uses, keep within this scope of the program


function addToInventory(someList, someItem) { //Allows addition of items to an inventory if possible
	let matchFound = false 
	for (let i = 0; i < someList.length; i++){ //Loop allowing the searching of the items within the list.
		if (someList[i].includes(someItem)){
			matchFound = true
			if (matchFound = true){
				someList[i][1] = someList[i][1] //doublecheck indexing before editing, or the search functionality will not work
			}
		} 
	} 
	if (matchFound != true){ //edit area if wanting to change the behavior if a item is not already found in the inventory. - default set to "add to inventory"
		someList.push([someItem]) 
	}
	return someList
}
function removeFromInventory(someList, someItem) { // Allows removal of items an inventory.
	let matchFound = false 
	let filteredList = []
	for (let i = 0; i < someList.length; i++){
		if (someList[i].includes(someItem)){ // doublecheck indexing before editing, or the search functionality will not work
			matchFound = true
			if (matchFound = true){
				someList[i] = someItem.splice
				filteredList = someList.filter(element => {return element !== undefined}) // filter to allow us to remove the undefined statement in returned arrays
			} 
		}
	}return filteredList
}

let inventory = [ //! Player Inventory 
  "carkeys",
];

//! Door Locks - If additional doors or items are made with a lock, place up here to ensure that the door remains unlocked once the user unlocks the door or item.

door2Unlocked = false 
doorSevenUnlocked = false


//! ---------------------------Game Functions - Anything related working through the game.

async function room(){ //? ROOM TEMPLATE - USE IF you want to create more rooms! - Room # "increase sequentially" - Name of Room

    let roomInventory  = []; // Adjustname let room"number of roomInventory -- input items you want the player to pick up 
    
    function getRoomXXXItem(Item) { // "getRoom"roomNumber""(Item"roomNumber") --> used in the switch to provide inputs to user.
      let itemNames = {
        //"input":"output",  
        "search area": "searches area for items...",
          "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
          "hints":"",
          "lookat":"",
          "pickup":"",
          "drop":"",
          "input":"",
          "use":"",
      }
        return itemNames[Item] // itemNames["item"] must getroom ("item")
    }
    roomComplete = false // Place room number name in (ie. room1Complete = false)
    const welcomeMessage = `WHATEVER YOU WANT THE FIRST THING READ GOES HERE\n >_`;
    let answer = await ask (welcomeMessage);
        while (roomComplete!= true){ //! update to reflect the room number
          switch(answer){ // Switch that allows different scenarios based on response.
            case "search area":
            case "info":
            case "hints":  
              console.log(getRoom(answer)) //! update to reflect the getRoom function names
              answer = await ask (">_") // Each incorrect response will prompt the user to allow another attempt.
              break
            case "use code ####":
                console.log(getRoomXYZitem(answer)) //! UPDATE ROOM id
                doorUnlocked = true //! update door locked section if wanting to use a locked door. ]
                answer = await ask (">_")
                break
            case "open door":
              console.log(getitem(answer))
              if (doorUnlocked == true){ // check function to ensure the door is unlocked.
                console.log ("You unlocked the door, and move to the next room")
                roomXYZFoyer() //! update location if wanting to use this as a area transition
                answer = await ask (">_")
                break
              } else {
                console.log("The door is locked.")
                answer = await ask (">_")
                break
              }
            case "inventory": // Check your inventory function - leave as is. 
              console.log ("You check your pockets...")
              console.log(inventory)
              answer = await ask (">_")
              break
            case"pick up XYZ": // Pick up Items - these are placed in the player inventory.
                console.log("You pick up the XYZ DESCRIPTION")
                addToInventory(inventory,"XYZ")
                answer = await ask (">_")
                break
            case"drop XYZ": // Drop Items - these are placed into the rooms inventory 
                console.log("You drop the XYZ")
                removeFromInventory(inventory,"XYZ")
                addToInventory(roomXYZInventory,"XYZ") //! remember to reference the correct inventory
                answer = await ask (">_")
                break
            default: 
              console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
              answer = await ask (">_")
            }
        }
}
async function roomOneOutdoors(){ // Room 1 - OutDoors // Starting Room of Game

let roomOneInventory = [];

function getRoomOneItem(ItemOne){ // Room1 - case returns when user inputs 
   // If inputting new cases, and want a response from the game, must fill in a below. "input : response from game"
    let itemNames = { //player "input": game "output"
      "search area": "There isn't much here, but there is a sign to look at",
      "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
      "hints":"Try 'use code 1234'",
      "lookat sign": "Welcome to the Burlington Code Academy, Come to the overlook!. \n If the door is locked, type 'use code 1234' to enter",
      "use door": "You knock on the door, nothing happens",
      "open door": "The door is locked",
      "lookat keypad": "You look at the keypad",
      "use code 1234": "You try 1234 in the keypad, and it unlocks.\n You enter the building Lobby"
  }
  return itemNames[ItemOne]
}
room1Complete = false
const welcomeMessage = `You are standing outdoors on Main Street between Church and South Winooski.\nThere is a door here.\nA keypad sits on the handle.\nOn the door is a handwritten sign.\n >_`;
let answer = await ask (welcomeMessage);

while (room1Complete != true) //! update to reflect the room number
  switch(answer){ //Every case requires a return from "getRoomOneItem"
    case "search area":
    case "info":
    case "hints":
    case "use door":
    case "lookat sign":
    case "open door":
    case "lookat keypad":
      console.log(getRoomOneItem(answer))
      answer = await ask (">_") // Each imcorrect response will prompt the user to allow another attempt.
      break
    case "use code 1234":
      console.log(getRoomOneItem(answer))
      roomTwoLobby()
      answer = await ask (">_")
      break
    case "inventory":
      console.log ("You check your pockets...")
      console.log(inventory)
      answer = await ask (">_")
      break
    default: 
      console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
      answer = await ask (">_")
  } 
}
async function roomTwoLobby(){ // Room 2 - Lobby

let roomTwoInventory = [];

function getRoomTwoitem(ItemTwo) { // Room 2 - case returns when user inputs
  let itemNames = {
      "search area": "There is nothing here really worth taking, but the desk looks promising",
      "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
      "hints":"Did you look at the desk?",  
      "lookat desk": "You look at the desk, its a little cluttered, and there is a crumpled note that says 4321 on it. I bet I could 'use code 4321'",
      "lookat chair": "It looks pretty uncomfortable, i bet whoever sits there has a lot of backpain.",
      "lookat robot": "Its stare is a little unsettling",
      "lookat cookie": "It looks yummy",
      "take cookie": "You cannot take someone's cookie. What if they really wanted that cookie?",
      "take robot": "The robot glares at you for trying to take it",
      "take chair": "Its so bulky that you can't pick it up",
      "use foyer door": "You check the door",
      "use code 4321": "The keypad beeps, and the door unlocks",
      "lookat keypad": "9 numbers + 0 "
  }
    return itemNames[ItemTwo]
}
room2Complete = false
const welcomeMessage = `You enter the lobby and see a desk, a robot, a chair, a cookie and a door that says foyer"\n >_`;
let answer = await ask (welcomeMessage);
    while (room2Complete!= true){ //! update to reflect the room number
      switch(answer){ // Switch that allows different scenarios based on response.
        case "search area":
        case "info":
        case "hints":
        case "lookat desk":
        case "lookat chair":
        case "lookat robot":
        case "lookat cookie":
        case "lookat keypad":
        case "take robot":
        case "take chair":    
        case "take cookie":  
          console.log(getRoomTwoitem(answer))
          answer = await ask (">_") // Each incorrect response will prompt the user to allow another attempt.
          break
        case "use code 4321":
            console.log(getRoomTwoitem(answer))
            door2Unlocked = true //! lock gate - any edits must also edit line 80 
            answer = await ask (">_")
            break
        case "use foyer door":
          console.log(getRoomTwoitem(answer)) 
          if (door2Unlocked == true){ //! lock gate - any edits must also edit line 80
            console.log ("The door was unlocked, and you move to the Foyer")
            roomThreeFoyer()
            answer = await ask (">_")
            break
          } else {
            console.log("The door is locked.")
            answer = await ask (">_")
            break
          }
        case "inventory":
          console.log ("You check your pockets...")
          console.log(inventory)
          answer = await ask (">_")
          break
        default: 
          console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
          answer = await ask (">_")
        }
    }
}
async function roomThreeFoyer(){ // Room 3 - Foyer

let roomThreeInventory = [];

function getRoomThreeItem(itemThree){ // Room 3 - case returns when user inputs 
let itemNames = {
    "search area": "I see a paper, but nothing else worth picking up.",
    "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
    "hints":"have you picked up the paper, its also worth dropping.\nIts been awhile since you started, it may be worth going to the bathroom.",
    "lookat sofa": "3 wide with a flannel covering. Appropriate for the area.",
    "lookat paper": "Its a paper containing random articles and opinions.",
    "use lobby door": "You walk back into the lobby",
    "use bathroom door": "You walk into the bathroom",
    "use garden door:": "You walk into the garden",
}
  return itemNames[itemThree]
}

const welcomeMessage = `You enter a foyer and you see a paper on the ground, a sofa against the wall, a plant, and two doors. One is the bathroom and the other is the garden"\n >_`;
let answer = await ask (welcomeMessage);
room3Complete = false 
  while (room3Complete != true){ //! update to reflect the room number
    switch(answer){ // Switch that allows different scenarios based on response.
      case "search area":
      case "info":
      case "hints":
      case "lookat paper":
      case "lookat sofa":
        console.log(getRoomThreeItem(answer))
        answer = await ask (">_") // Each imcorrect response will prompt the user to allow another attempt.
        break
      case "pickup paper":
        console.log("You pick up the paper containing random articles and opinions")
        addToInventory(inventory,"paper")
        answer = await ask (">_")
        break
      case "drop paper":
        console.log("You drop the paper")
        removeFromInventory(inventory,"paper")
        addToInventory(roomThreeInventory,"paper") 
        answer = await ask (">_")
        break
      case "use lobby door":
        console.log(getRoomThreeItem(answer))
        roomTwoLobby()
        answer = await ask (">_")
        break
      case "use bathroom door":
        console.log(getRoomThreeItem(answer))
        roomFourBathroom()
        answer = await ask (">_")
        break
      case "use garden door":
        roomFiveGarden()
        answer = await ask (">_")
        break
      case "check room inventory": //? For testing purposes -- allows admin to check the room inventory to see removoal of item
        console.log("Hello admin - the room contains...")
        console.log(roomThreeInventory)
        answer = await ask (">_")
        break
      case "inventory":
        console.log ("You check your pockets...")
        console.log(inventory)
        answer = await ask (">_")
        break
      default: 
        console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
        answer = await ask (">_")
    }
}
}
async function roomFourBathroom(){ // Room 4 - Bathroom 

    let roomfourInventory  = []; 
    
    function getRoomFourItem(ItemFour) { 
      let itemNames = {
        "search area": "You look around and see toliet paper roll, a door leading to the foyer, and a keycard that says 'ENDGAME keycode'",
        "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
        "hints":"Have you 'search area' yet?\n There is a item in here you can look at or pick up\n'use foyer door' will get you out of the room",
        "lookat toliet":"Its quite clean",   
        "use toliet": "You flush the toliet, and stare at the spinning water",
        "lookat hand dryer": "The silver gleam is polished and smooth",
        "use hand dryer": "Your hands feel very warm",
        "lookat sink": "You wonder where the soap is",
        "use sink": "You wash your hands in the sink",
        "lookat keycard": "It says, input 802 into the ENDGAME computer to win",
        "use keycard": "You swipe the air 'woosh'",
        "pickup keycard": "You put the keycard in your pocket",
        "use foyer door": "You walk back into the Foyer"
          
      }
        return itemNames[ItemFour] 
    }
    room4Complete = false
    const welcomeMessage = `You walk into a unisex bathroom containing a toliet, a sink and a hand dryer\n >_`;
    let answer = await ask (welcomeMessage);
        while (room4Complete!= true){ //! update to reflect the room number
          switch(answer){ // Switch that allows different scenarios based on response.
            case "use toliet":
            case "use hand dryer":
            case "use sink":
            case "use keycard":
            case "lookat toliet":
            case "lookat hand dryer":
            case "lookat sink":
            case "lookat keycard":  
            case "search area":
            case "info":
            case "hints":
              console.log(getRoomFourItem(answer))
              answer = await ask (">_") // Each incorrect response will prompt the user to allow another attempt.
              break
            case "pickup keycard": // Pick up Items - these are placed in the player inventory. -- allows reference for user in the end game room
              console.log("You pick up the ENDGAME Keycard")
              addToInventory(inventory,"ENDGAME Kecard - # 802")
              answer = await ask (">_")
              break
            case "use foyer door":
              console.log(getRoomFourItem(answer))
              roomThreeFoyer()
              answer = await ask (">_")
              break
            case "inventory": // Check your inventory function - leave as is. 
              console.log ("You check your pockets...")
              console.log(inventory)
              answer = await ask (">_")
              break
            default: 
              console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
              answer = await ask (">_")
            }
        }
}
async function roomFiveGarden(){ // Room 5 - Garden

  let roomfiveInventory  = [];
  
  function getRoomFiveItem(ItemFive){
    let itemNames = {
        "search area": "There are no items here worth taking.",
        "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
        "hints":"'use foyer door' to get back to the foyer, or 'use overlook door' to move to the overlook",
        "lookat coy pond":"You see some rare black coy in there",
        "use coy pond":"You splash your foot into the coy pond, the fish scatter.",
        "pickup coy pond": "You fall into the water attempting to do the impossible.",
        "lookat flower":"Its quite a pretty flower, may be a hydrangia",
        "pickup flower":"You picked the only flower in the garden.",
        "lookat dirt": "Its 100% organic",
        "pickup dirt": "You decide you do not want dirt in your pockets.",
        "use dirt": "You take the dirt and put some in a hole",
        "lookat hose": "24ft, industrial grade",
        "use sitting area":"You take a seat, and its quite comfortable",

    }
      return itemNames[ItemFive]
  }
  roomFiveComplete = false
  const welcomeMessage = `You walk into the garden. You look around and see a single hydrangia, a coy pond, a sitting area, and a doorwary to an overlook. Its a very small garden.\n >_`;
  let answer = await ask (welcomeMessage);
      while (roomFiveComplete!= true){ //! update to reflect the room number
        switch(answer){ // Switch that allows different scenarios based on response.
          case "search area":
          case "info":
          case "hints": 
          case "lookat coy pond":
          case "use coy pond":
          case "pickup coy pond":
          case "lookat flower":
          case "pickup dirt":
          case "use dirt":
          case "lookat hose":
          case "use sitting area":
            console.log(getRoomFiveItem(answer)) //! update to reflect the getRoom function names
            answer = await ask (">_") // Each incorrect response will prompt the user to allow another attempt.
            break
          case "inventory": // Check your inventory function - leave as is. 
            console.log ("You check your pockets...")
            console.log(inventory)
            answer = await ask (">_")
            break
          case"pick up flower": // Pick up Items - these are placed in the player inventory.
              console.log("You pick the flower, i believe its a hydrangia")
              addToInventory(inventory,"hydrangia")
              answer = await ask (">_")
              break
          case"drop flower": // Drop Items - these are placed into the rooms inventory 
              console.log("You drop the flower")
              removeFromInventory(inventory,"hydrangia")
              addToInventory(roomThreeInventory,"hydrangia")
              answer = await ask (">_")
              break
          case "use foyer door":
              console.log ("You return to the foyer")
              roomThreeFoyer()
              answer = await ask (">_")
              break
          case "use overlook door":
              roomSixOverlook()
              answer = await ask (">_")
              break
          default: 
            console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
            answer = await ask (">_")
          }
      }
}
async function roomSixOverlook(){ // Room 6 - Overlook

  let roomSixInventory  = []; // Adjustname let room"number of roomInventory -- input items you want the player to pick up 
  
  function getRoomSixItem(ItemSix) { 
    let itemNames = {
        "search area": "There is nothing here worth taking",
        "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
        "hints":"Did you try 'use endgame door?'",
        "lookat view":"You look at the beautiful view, it is quite nice!",
        "lookat endgame door":"You look at the door, and it reads the end of the game is near!",
        "use endgame door":"You walk through the endgame door.",
    }
      return itemNames[ItemSix] // itemNames["item"] must getroom ("item")
  }
  roomSixComplete = false // Place room number name in (ie. room1Complete = false)
  const welcomeMessage = `You walk out to a beautiful overlook with view over the lake, and a door that says endgame room\n >_`;
  let answer = await ask (welcomeMessage);
      while (roomSixComplete!= true){ //! update to reflect the room number
        switch(answer){ // Switch that allows different scenarios based on response.
          case "search area":
          case "info":
          case "hints":
          case "lookat view":
          case "lookat endgame door":  
            console.log(getRoomSixItem(answer)) //! update to reflect the getRoom function names
            answer = await ask (">_") // Each incorrect response will prompt the user to allow another attempt.
            break
          case "inventory": // Check your inventory function - leave as is. 
            console.log ("You check your pockets...")
            console.log(inventory)
            answer = await ask (">_")
            break
          case "use garden door":
              roomFiveGarden()
              answer = await ask (">_")
              break
          case "use endgame door":
              console.log(getRoomSixItem(answer))
              roomSevenEndGame()
              answer = await ask (">_")
              break
          default: 
            console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
            answer = await ask (">_")
          }
      }
}
async function roomSevenEndGame(){ // Room 7 - EndGame room // End Room of Game

  let roomSevenInventory  = []; // Adjustname let room"number of roomInventory -- input items you want the player to pick up 
  
  function getRoomSevenItem(ItemSeven) { // "getRoom"roomNumber""(Item"roomNumber") --> used in the switch to provide inputs to user.
    let itemNames = {
        "search area": "The only thing in the room is a computer.",
        "info":"\nsearch area = allows you to look around to see what items are in room\ninfo = will bring up the game info.\nhints = gives you hints about the current room \nlookat 'XYZ' = look at a object in game\npickup 'XYZ' = allows you to place a item in your inventory if possible.\ndrop 'XYZ' = allows you to drop an item in your inventory.\ninventory = allows you to look at your inventory\ninput 'XYZ' = allows you to place something, such as a keycard into an object\nuse 'XYZ'= allows you to interact with an object\n",
        "hints":"Did you try to 'input' the special code found in the bathroom?\nTry input 'use computer'",
        "lookat computer":"It says 'to win game, input the special code",
        "pickup computer":"Its bolted down pretty well",
        "input 802":"The computer states input accepted, then a big button appears on the computer screen",
        "use computer":"You go to use the computer screen",

    }
      return itemNames[ItemSeven] // itemNames["item"] must getroom ("item")
  }
  roomSevenComplete = false // Place room number name in (ie. room1Complete = false)
  const welcomeMessage = `You enter the final room of the game, it contains a single computer terminal requesting a input.\n >_`;
  let answer = await ask (welcomeMessage);
      while (roomSevenComplete!= true){ //! update to reflect the room number
        switch(answer){ // Switch that allows different scenarios based on response.
          case "search area":
          case "info":
          case "hints":
          case "lookat computer":
          case "pickup computer":  
            console.log(getRoomSevenItem(answer)) //! update to reflect the getRoom function names
            answer = await ask (">_") // Each incorrect response will prompt the user to allow another attempt.
            break
          case "input 802": 
              console.log(getRoomSevenItem(answer))
              doorSevenUnlocked = true //! Lock Gate - any edits must also edit line 81
              answer = await ask (">_")
              break
          case "use computer":
            console.log(getRoomSevenItem(answer))
            if (doorSevenUnlocked == true){ //! Lock Gate - any edits must also edit line 81
              console.log ("You gained access to the computer, and won the game!!\n Congratulations!!!!")
              process.exit()
            } else {
              console.log("The computer says input required")
              answer = await ask (">_")
              break
            }
          case "use overlook door":
            roomSixOverlook()
            answer = await ask (">_")
            break
          case "inventory": // Check your inventory function - leave as is. 
            console.log ("You check your pockets...")
            console.log(inventory)
            answer = await ask (">_")
            break
          default: 
            console.log (`I do not know how to ${answer}`) // Default response if no scenario matched.
            answer = await ask (">_")
          }
      }
}
}
