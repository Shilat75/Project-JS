// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.


import PromptSync from "prompt-sync";
import Player from "./classes/Player.js";
import Riddle from "./classes/Riddle.js";
import { createRiddle, deleteRiddle, getAllRiddles, updateRiddle } from "./api/riddlesApi.js";
import MultipleChoiceRiddle from "./classes/MultipleChoiceRiddle.js";
import {
    FindPlayerByName,
    createPlayer,
    updatePlayer,
    getAllPlayers
} from "./api/playersApi.js";

const prompt = PromptSync();
function showMenu() {
    console.log("\n=== RIDDLE GAME ===");
    console.log("1. Play game");
    console.log("2. Create riddle");
    console.log("3. Read all riddles");
    console.log("4. Update riddle");
    console.log("5. Delete riddle");
    console.log("6. Leaderboard");
    console.log("0. Exit");
}

async function playGame(){

  const name=prompt("Hey what your name?:");
  const player=new Player(name);

  let level=prompt("Choose difficulty: easy / medium / hard:").trim().toLowerCase();

  while(level!=="easy" && level!=="medium" && level!=="hard"){
    console.log("Invalid dificulty~ Try again.")

    level=prompt("Choose difficulty :easy/medium/hard").trim().toLocaleLowerCase();
  }
  const riddles=await getAllRiddles();

  const filteredRiddles= riddles.filter(riddle=>{
    return riddle.difficulty === level;
  })

  console.log("Number of riddles:", filteredRiddles.length);
  for (const riddleData of filteredRiddles){
    const riddle= new Riddle(
      riddleData.id,
      riddleData.name,
       riddleData.taskDescription,
        riddleData.correctAnswer,
        riddleData.timeLimit,
        riddleData.hint
    );

    const start =Date.now();
    riddle.ask(prompt);
    const end =Date.now();

    player.recordTime(
      start,
      end,
      riddle.timeLimit,
      riddle.usedHint
    );
  }
  player.showStats();

if (player.times.length === 0) {
    console.log("No riddles played");
    return;
}

const totalTime = player.times.reduce((sum, time) => sum + time, 0);

const existingPlayer = await FindPlayerByName(name);

if (!existingPlayer) {
    await createPlayer(name, totalTime);
    console.log("New Player saved!");
} else if (
    existingPlayer.lowestTime == null ||
    totalTime < existingPlayer.lowestTime
) {
    existingPlayer.lowestTime = totalTime;
    await updatePlayer(existingPlayer);
    console.log("New record saved!");
}
}


async function createNewRiddle() {

  const name=prompt("name riddle is:");
  const taskDescription=prompt("task deskreption is:");
  const correctAnswer=prompt("The correct Answer is :");
  const difficulty=prompt("the difficulty is :");
  const timeLimit=prompt("the time limit tp riddle is:");
  const hint=prompt("the hint is:");

 const newRiddle={
  name,taskDescription,correctAnswer,difficulty,timeLimit,hint
 };


  const result = await createRiddle(newRiddle);
  console.log("the creat riddle sucsses");
  console.log(result);

  
}




async function main() {
    let choice;

    do {
        showMenu();

        choice = prompt("Choose an option: ");

        switch (choice) {
            case "1":
                await playGame();
                break;

            case "2":
                console.log("Create riddle");
                await createNewRiddle();
                //createRiddle();
                break;

            case "3":
                console.log("Read all riddles");
                 const allriddles= await getAllRiddles();
                 console.log(allriddles);
                break;

            case "4":{

                console.log("Update riddle");
                 const id=prompt ("The id to riddel you want to update is:");
                 const name=prompt("name riddle is:");
                  const taskDescription=prompt("task deskreption is:");
                  const correctAnswer=prompt("The correct Answer is :");
                  const difficulty=prompt("the difficulty is :");
                  const timeLimit= Number(prompt("the time limit tp riddle is:"));
                  const hint=prompt("the hint is:");

                const newRiddle={
                  name,taskDescription,correctAnswer,difficulty,timeLimit,hint
                };
                 await updateRiddle(id,newRiddle);
                break;
              }
            case "5":{
                console.log("Delete riddle");
                const id=Number(prompt("Enter id of the Riddle you whant to delete?"));
                await deleteRiddle(id);
                console.log(`The riddle ${id} is Delet`);
                break;
              }

                      case "6": {
                console.log("Leaderboard:");

                const allPlayers = await getAllPlayers();

                console.log("All players:", allPlayers);
                const result = allPlayers.filter(player => {
                    return player.lowestTime != null;
                });

                result.sort((a, b) => a.lowestTime - b.lowestTime);

                result.forEach((player, index) => {
                    console.log(
                        `${index + 1}. ${player.name} - ${player.lowestTime / 1000} seconds`
                    );
                });

                break;
            }
            case "0":
                console.log("Goodbye!");
                break;

            default:
                console.log("Invalid option!");
        }

    } while (choice !== "0");
}

main().catch(error => {
    console.error("Application error:", error.message);
});


//

// const name = prompt("Hey what your name? ");
// console.log( "Welcome:)  "+name);
// let level = prompt("Choose difficulty: easy / medium / hard: ").trim().toLowerCase();

// while (level!="easy" &&level!="medium"&&level!="hard") {
//   console.log("Invalid difficulty! Try again.");
//   level = prompt("Choose difficulty: easy / medium / hard: ").trim().toLowerCase();
// }

// const riddles = await getAllRiddles();
// const player =new Player(name);

// const filteredRiddles = riddles.filter(riddle =>{
//         if(riddle.difficulty==level){
//                return true;
//         }
//         return false;
//     });
// // arr for riddles

// for (let i = filteredRiddles.length - 1; i > 0; i--) {
//    let j = Math.floor(Math.random() * (i + 1));
//    let temp = filteredRiddles[i];

//    filteredRiddles[i] = filteredRiddles[j];

//    filteredRiddles[j] = temp;
// }




// for (let riddleData of filteredRiddles)  {
    
//     // 1. יצירת אובייקט Riddle מהנתונים של החידה
//     const riddle = new Riddle(
//     riddleData.id,
//     riddleData.name,
//     riddleData.taskDescription,
//     riddleData.correctAnswer,
//     riddleData.timeLimit,
//   riddleData. hint 
//     );
//     // 2. שמירת זמן ההתחלה
//     let start = Date.now();

//     // 3. הפעלת החידה באמצעות ask
//     riddle.ask(prompt);

//     // 4. שמירת זמן הסיום
//     let end = Date.now();
//     // 5. שמירת הזמן אצל השחקן
//     player.recordTime(start, end, riddle.timeLimit, riddle.usedHint);
// }

// const bonusRiddle = new MultipleChoiceRiddle(
//     6,
//     "Capital Cities",
//     "What is the capital of France?",
//     "2",
//     ["London", "Paris", "Rome", "Madrid"]
    
// );


// let startBonus = Date.now();

// bonusRiddle.ask(prompt);

// let endBonus = Date.now();
// player.recordTime(startBonus, endBonus);
// player.showStats();








