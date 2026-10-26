
import Riddle from "./Riddle.js";

class MultipleChoiceRiddle extends Riddle{

     constructor(id, name, taskDescription, correctAnswer,options,) {
        super(id, name, taskDescription, correctAnswer);
        this.options=options;
       this.difficulty ="easy";
       this.timeLimit="10"
       
    }
    ask(prompt) {

        console.log(this.taskDescription);
       for (let i = 0; i < this.options.length; i++){
        console.log((i + 1) + ". " + this.options[i]);
        }
        let answer = prompt("Choose an option: ");

        while(answer!==this.correctAnswer){
            console.log("EROR-Try egain")
             answer = prompt(" Choose an option: ");
           
        }
        

  }

}

export default MultipleChoiceRiddle;

