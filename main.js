const prompt = require('prompt-sync')({sigint: true});

const hat = '👒';
const hole = '💥';
const fieldCharacter = '🌳';
const pathCharacter = '😀';


class Field {

    constructor (field=[[]]) {
        this.field = field;
        // this.posX = 0;
        // this.posY = 0;
        // this.field[0][0] = pathCharacter;
    }

    setPlayerLocation(){
    // Set spawn Character
        this.posY = Math.floor(Math.random()*10);
        this.posX = Math.floor(Math.random()*10);
        this.field[this.posY][this.posX] = pathCharacter;
    };

    playGame() {
    let playing = true;

    this.setPlayerLocation();

    while(playing) {
     
     this.print();
     this.playerWalk();

      if (!this.itWall()) {
        console.log('You Dorp Map 💥');
        playing = false;
        break;
      } else if (this.itHole()) {
        console.log('You Die 💀');
        playing = false;
        break;
      } else if (this.itHat()) {
        console.log('You win this game 🏆');
        playing = false;
        break;
      }
      this.field[this.posY][this.posX] = pathCharacter;
    }
  };
  
  playerWalk() {
    const  inputKey = prompt ('Which direction💬 [W,A,S,D]').toUpperCase();
    switch (inputKey) {
      case 'W' :
        this.posY -= 1;
        break;
      case 'S' :
        this.posY += 1;
        break;
      case 'A' :
        this.posX -= 1;
        break;
      case 'D' :
        this.posX += 1;
        break;
      default :
        console.log('Enter W, S, A or D. 😅');
        this.playerWalk();
        break;
    }    
  };

  itHat() {
    return  this.field[this.posY][this.posX] === hat;
  };

  itHole() {
    return this.field[this.posY][this.posX] === hole;
  };

  itWall() {
    return (
      //min
      this.posY >= 0 &&
      this.posX >= 0 &&
      //max
      this.posY < this.field.length &&
      this.posX < this.field.length 
    );
  };

  static genertaeField (height, width, holePercentage) {
    const field = [];
    // set spawn hole, field
    for (let y = 0; y < height; y++){
      const line =[];
      for (let x = 0; x < width; x++){
        let randomMath = Math.floor(Math.random()*100)+1;
        randomMath > holePercentage ? line.push(fieldCharacter) : line.push(hole) ;
      }
      field.push(line); 
    };

    // Random location for hat
    let rdHatY = Math.floor(Math.random()*height);
    let rdHatX = Math.floor(Math.random()*width);

    // Check ตำแหน่งซํ้ากับ Hat หรือไม่
    while ( rdHatY === hole && rdHatX === hole) {
      rdHatX = Math.floor(Math.random()*width);
      rdHatY = Math.floor(Math.random()*height);
    }

    // Add hat to field
    field[rdHatY][rdHatX] = hat;


    return field;

  };

  print() {
    const displayMap = this.field.map(row => {return row.join('')}).join('\n');
    console.log(displayMap);
  };

}

// const myField = new Field([
//   ['*', '░', 'O'],
//   ['░', 'O', '░'],
//   ['░', '^', '░'],
// ]);

let myField = new Field(Field.genertaeField(10, 10, 30));
myField.playGame();
