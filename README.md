# Riddle Game - JavaScript Terminal Project

A terminal game that asks the player riddles, measures how long each riddle took, and shows statistics at the end.

This repository is a **template**. The folders and files are ready, and every file has a comment that describes what should be written in it. Write all the code yourself.

## Getting started

1. Clone this repository.
2. Run `npm install` (this installs `prompt-sync`).
3. Fill in each file according to the comment inside it.
4. Run the game with `node app.js` directly in the terminal (not through a piped command).

## Folder structure

```
riddle-game/
├── app.js
├── package.json
├── riddles/
│   ├── index.js
│   ├── r1.js
│   ├── r2.js
│   ├── r3.js
│   ├── r4.js
│   └── r5.js
└── classes/
    ├── Riddle.js
    └── Player.js
```

## Tasks

### Riddle files

**Task 1: Create the riddles** (`riddles/r1.js` to `riddles/r5.js`)

- Each file exports a riddle object with `id`, `name`, `taskDescription` and `correctAnswer`.
- Example:

```js
// riddles/r1.js
export default {
  id: 1,
  name: "Easy Math",
  taskDescription: "What is 5 + 3?",
  correctAnswer: "8"
};
```

- Write 5 riddles of your own.

**Task 2: Load all riddles at once** (`riddles/index.js`)

- Import all five riddles and export them together as one array.

### Classes

**Task 3: The Riddle class** (`classes/Riddle.js`)

- Properties: `id`, `name`, `taskDescription`, `correctAnswer`.
- Method `ask(prompt)`:
  - Show the riddle.
  - Ask for user input.
  - Keep asking until the correct answer is given.

**Task 4: The Player class** (`classes/Player.js`)

- Properties: `name`, `times[]` (array of time durations per riddle).
- Methods:
  - `recordTime(start, end)`
  - `showStats()` - show total and average time.

### Game logic (`app.js`)

**Task 5: Set up terminal input**

- Install `prompt-sync` (already listed in `package.json`, so `npm install` is enough).
- Set it up:

```js
import PromptSync from 'prompt-sync';
const prompt = PromptSync();
```

**Task 6: Ask for the player name**

- Show a welcome message.
- Use `prompt` to ask: "What is your name?"
- Create a `Player` object with the name.

**Task 7: Use all the riddles**

- In `app.js`, import the array from `riddles/index.js`.

**Task 8: Main game loop**

- Loop through all riddles:
  - Record `startTime` with `Date.now()`.
  - Create a `Riddle` object and call `ask()`.
  - Record `endTime`.
  - Save the time using `player.recordTime()`.

**Task 9: Show final stats**

- After all riddles:
  - Show total time.
  - Show average time per riddle.

### Bonus (optional)

**Task 10: Multiple choice riddles**

- Create a `MultipleChoiceRiddle` class that inherits from `Riddle`.
- Add a `choices[]` property.
- Show numbered options.
- Accept numeric input and compare it to the correct answer.
- Create the file `classes/MultipleChoiceRiddle.js` yourself.

## Final deliverables

- Project folders and files ready.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
🛠 Phase 2: Riddle Game Extension — Database & New Features
We are improving the Riddle Game with a database (json-server + fetch) and new functionality!
⚙️ 0. Setup: json-server
The database is a local server called json-server. It reads one file, db.json, and turns every array in it into an API address. Your code talks to it only with fetch, exactly like any other API (GET, POST, PUT, DELETE).
Install json-server (once):
npm install json-server@0.17.4
Add a script to package.json:
"scripts": {
  "server": "json-server --watch db.json --port 3000"
}
Open two terminals:
Terminal 1: npm run server (keep it open, this is the database).
Terminal 2: node app.js (the game).
Check that the server works: open http://localhost:3000/riddles in the browser. You should see your riddles as JSON.
New folder structure:
riddle-game/
├── app.js
├── db.json            <- new: the database
├── package.json
├── api/               <- new: all the fetch calls
│   ├── riddlesApi.js
│   └── playersApi.js
└── classes/
    ├── Riddle.js
    └── Player.js
The riddles/ folder is not needed anymore. The riddles now live in db.json.
The API. json-server gives you these addresses automatically:
Method
Address
What it does
GET
/riddles
Get all riddles
GET
/riddles/1
Get the riddle with id 1
POST
/riddles
Add a new riddle (json-server creates the id by itself)
PUT
/riddles/1
Replace the riddle with id 1
DELETE
/riddles/1
Delete the riddle with id 1
GET
/players?name=Yishai
Find players by name (returns an array)


The same addresses exist for /players.
Write all the fetch calls in the api/ folder, one async function for each action:
api/riddlesApi.js: getAllRiddles(), createRiddle(riddle), updateRiddle(id, riddle), deleteRiddle(id).
api/playersApi.js: findPlayerByName(name) returns the player, or undefined if there is no such player. createPlayer(name) adds a new player with lowestTime: null. updatePlayer(player) saves the player's new lowestTime. getAllPlayers() returns all the players.
Remember:
fetch returns a Promise. Use async / await (or .then()).
Check res.ok. fetch does not throw an error on 404 or 500.
For POST and PUT send headers: { "Content-Type": "application/json" } and body: JSON.stringify(...).
Use try / catch, so the game shows a clear message if the server is not running.
app.js is an ES module, so you can use await directly at the top level of the file.

📁 1. Riddle Database Refactor
Current: You have separate .js files exporting riddles individually.
New: Move all riddles into one file, as an array of objects, similar to the School CRUD exercise.
✅ Example:
db.json
{
  "riddles": [
    {
      "id": 1,
      "name": "Easy Math",
      "taskDescription": "What is 5 + 3?",
      "correctAnswer": "8"
    },
    {
      "id": 2,
      "name": "Riddle of Sound",
      "taskDescription": "I speak without a mouth. What am I?",
      "correctAnswer": "echo"
    }
  ],
  "players": []
}

Important:
The DB is one file, db.json, and json-server serves it (see section 0).


db.json must be valid JSON (double quotes, no comma after the last item).



🕹 2. Riddle CRUD Options
Add a main menu that lets the user choose an action:
What do you want to do?
1. Play the game
2. Create a new riddle
3. Read all riddles
4. Update an existing riddle
5. Delete a riddle
6. View leaderboard
0. Exit

Functionality:
Option
Description
Create
Add a new riddle to the DB
Read
Show all riddles in the DB
Update
Change details of an existing riddle by ID
Delete
Remove a riddle by ID

✅ Example - Creating a new riddle:
Enter riddle name: Hard Math  
Enter description: What is 12 x 12?  
Enter correct answer: 144  

The new riddle gets saved to db.json (with a POST request).

👤 3. Player Database
Add a players array to db.json to track players and their best times (in seconds):
db.json
"players": [
  {
    "id": 1,
    "name": "Yishai",
    "lowestTime": 72
  },
  {
    "id": 2,
    "name": "Sarah",
    "lowestTime": 65
  }
]


🎮 4. Show "Time to Beat"
When a player starts a game:
Check if they already exist in the players DB.


If they do and they have a time, show:
Hi Yishai! Your previous lowest time was 72 seconds.

If not, add them to the DB with no lowestTime yet (null).



🏁 5. Update Player Time
After finishing the game:
If the player has no recorded time, save their time.


If their current time is lower than their saved lowestTime, update it.


✅ Example:
Great job, Yishai!  
Your time: 68 seconds  
New record! Time updated.


🏆 6. Leaderboard
Add an option in the main menu to view the leaderboard:
Load all players from the DB.


Skip players who never finished a game (lowestTime is null).
Sort by lowestTime ascending (fastest first).


Show results:


🏆 Leaderboard:
1. Sarah - 65 seconds
2. Yishai - 68 seconds


💡 Summary of Changes
✅ Move riddles to a single DB file (db.json), served by json-server
 ✅ Use fetch for every database action
 ✅ Add CRUD options for riddles
 ✅ Create and manage a player database
 ✅ Show "time to beat" before playing
 ✅ Update player's best time after playing
 ✅ Add leaderboard sorted by best times

- 5 riddles defined.
- Working `Riddle` and `Player` classes.
- `app.js` runs the full game.
- Terminal input with `prompt-sync`.
- Time tracking for each riddle.
- Final stats display.
- Optional: multiple choice riddles.
