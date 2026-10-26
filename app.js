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
import riddles from "./classes/riddles/index.js";
import MultipleChoiceRiddle from "./classes/MultipleChoiceRiddle.js";

const prompt = PromptSync();

const name = prompt("Hey what your name? ");
console.log( "Welcome:)  "+name);
let level = prompt("Choose difficulty: easy / medium / hard: ").trim().toLowerCase();

while (level!="easy" &&level!="medium"&&level!="hard") {
  console.log("Invalid difficulty! Try again.");
  level = prompt("Choose difficulty: easy / medium / hard: ").trim().toLowerCase();
}

const player =new Player(name);

const filteredRiddles = riddles.filter(riddle =>{
        if(riddle.difficulty==level){
               return true;
        }
        return false;
    });
// arr for riddles

for (let i = filteredRiddles.length - 1; i > 0; i--) {
   let j = Math.floor(Math.random() * (i + 1));
   let temp = filteredRiddles[i];

   filteredRiddles[i] = filteredRiddles[j];

   filteredRiddles[j] = temp;
}




for (let riddleData of filteredRiddles)  {
    
    // 1. יצירת אובייקט Riddle מהנתונים של החידה
    const riddle = new Riddle(
    riddleData.id,
    riddleData.name,
    riddleData.taskDescription,
    riddleData.correctAnswer,
    riddleData.timeLimit,
  riddleData. hint 
    );
    // 2. שמירת זמן ההתחלה
    let start = Date.now();

    // 3. הפעלת החידה באמצעות ask
    riddle.ask(prompt);

    // 4. שמירת זמן הסיום
    let end = Date.now();
    // 5. שמירת הזמן אצל השחקן
    player.recordTime(start, end, riddle.timeLimit, riddle.usedHint);
}

const bonusRiddle = new MultipleChoiceRiddle(
    6,
    "Capital Cities",
    "What is the capital of France?",
    "2",
    ["London", "Paris", "Rome", "Madrid"]
    
);


let startBonus = Date.now();

bonusRiddle.ask(prompt);

let endBonus = Date.now();
player.recordTime(startBonus, endBonus);
player.showStats();








