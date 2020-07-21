let player = {

    name: "USS Schwarzenneger",

    hull:20,

    firepower:5,

    accuracy: .7,

    attack(ship) {

        let prob = Math.random();

        if(prob <= this.accuracy) { // player hits alien ship

            ship.hull-= this.firepower; // apply damage to alien ship

            console.log("%cHit alien "+ ship.name + " with "+this.firepower + " damage!", "font-size:12pt; font-weight:bold; color:blue");

            

        }

        else { // player misses alien ship

            console.log("Missed alien " + ship.name); 

        }

    }

};

class alienShip {

    constructor(index) {

        this.name="Ship " + (index+1);

        this.hull = Math.floor(Math.random()*4) + 3; // hull range is between 3 and 6

        this.firepower =Math.floor(Math.random()*3) + 2; // firepower range is between 2 and 4

        this.accuracy =(Math.floor(Math.random()*3) + 6)/10; // accuracy is between .6 and .8

    }

 

    attack (ship) {

        let prob = Math.random();

        if(prob <= this.accuracy) { // alien ship hits player ship

            ship.hull-= this.firepower; // apply damage to player ship

            console.log("%cYou have been hit with "+ this.firepower +" damage.", "font-size:12pt; font-weight:bold; color:blue");

            console.log("You have "+ ship.hull + " hull remaining.");

        }

        else { // alien ship misses player ship

            console.log("You have been missed.");

        }

    }

 

};

let aliens = []; // array of alien ships objects

for(let i=0; i<6; i++) {

    aliens[i]=new alienShip(i); // creating alien ships objects

}

 

let gameOver = false;

let count =0; // used for iterating through the alien ships array

 

while(!gameOver && count<6) { // go through all alien ships while player ship is neither destroyed nor retreated

    console.log("Attacking alien " + aliens[count].name);

    player.attack(aliens[count]); // player attacks alien ship

    console.log("Alien "+ aliens[count].name + " has " + aliens[count].hull + " hull remaining");

    if(aliens[count].hull <=0) { // alien ship is destroyed

        console.log("%c Destroyed " + aliens[count].name,"font-size:14pt; font-weight:bold; color:red");

        if(count <5){  // still alien ships remaining.

            let choice = prompt("Would you like to attack the next ship or retreat?");

            if(choice ==="attack") {

                count++;  // go on to next alien ship

            }

            else{ //player retreats

                gameOver=true;

            }

        }

        else { // destroyed all alien ships

            count++; // count breaks out of the game loop

        }

    }

    else { //alien ship survived player attack

        console.log("You are being attacked by alien "+ aliens[count].name);

        aliens[count].attack(player); // alien ship attacks player

        if(player.hull <=0) { // player ship is destroyed

            console.log("%c Sorry, your ship has been destroyed!", "font-size:14pt; font-weight:bold; color:red");

            gameOver = true;

        }

    }

}

 

if(count === 6) { // all the six ships have been destroyed

    console.log("%cYou have destroyed all six alien ships! You win!", "font-size:20pt; font-weight:bold; color:green");

}

else { //player retreated or was destroyed

    console.log("%cGame over! You lose!", "font-size:20pt; font-weight:bold; color:green");

}