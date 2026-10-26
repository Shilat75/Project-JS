// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct



 class Riddle{

    constructor(id, name, taskDescription, correctAnswer,timeLimit,hint){
        this.id=id;
        this.name=name;
        this.taskDescription=taskDescription;
        this.correctAnswer=correctAnswer;
        this.timeLimit = timeLimit;
        this.hint= hint;
        this.usedHint = false;
    }

     ask(prompt){
    
     console.log(this.name +" "+ this.taskDescription);
     console.log(" Type 'hint' to receive a clue (adds 10 seconds penalty)");
     let answer = prompt(this.taskDescription);
      console.log("Hint:", this.hint);
     
 while (answer !== this.correctAnswer) {

    if (answer === "hint" && this.hint) {
        console.log(this.hint);
        this.usedHint = true;
    } else {
        console.log("The your answer not correct");
    }
    answer = prompt(this.taskDescription);
   }

  }
}


 export default Riddle;