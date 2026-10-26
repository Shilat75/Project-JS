// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle



class Player{
  
    constructor(name){
        this.name=name;
        this.times=[];
    }
    recordTime(start, end,timeLimit, usedHint){
       let time= end-start;
       if (time>timeLimit*1000){
        console.log("Too slow! 5 seconds penalty applied.")
         time=time+5000;
       }
       if(usedHint==true){
        time=time+10000;
       }
       this.times.push(time);
    }

   showStats() {
    let totalTime = 0;

    for (let num of this.times) {
        totalTime += num;
    }

    let average = totalTime / this.times.length;

    console.log(totalTime + " and the average is: " + average);
}

}

export default Player;