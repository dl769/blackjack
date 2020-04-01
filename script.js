class Card {
    constructor(color, number){
        if(color == 1){
            this.color = "Clubs"
            this.colorIMG = "C"
        }
        if(color == 2){
            this.color = "Diamonds"
            this.colorIMG = "D"
            
        }
        if(color == 3){
            this.color = "Hearts"
            this.colorIMG = "H"
                
        }
        if(color == 4){
            this.color = "Spades"
            this.colorIMG = "S"
                
        }
        if(number == 11){
            this.number = "Jack"
            this.numberIMG = "J"
            this.subnumber = 10   
                
        }
        if(number == 12){
            this.number = "Queen"
            this.numberIMG = "Q"
            this.subnumber = 10   
        }
        if(number == 13){
            this.number = "King"
            this.numberIMG = "K"
            this.subnumber = 10
                
        }
        if(number == 14){
            this.number = "Ace"
            this.numberIMG = "A"
            this.subnumber = 10
                
        }
        if(number > 1 && number < 11){
            this.number = number
            this.numberIMG = number
            this.subnumber = number   
        }

    }
    
// get alertThisCard(){
//     window.alert(this.color+" "+this.number)
// }


}

let randCol = () => Math.floor(Math.random() * (4)) + 1;    //1->4
let randNum = () => Math.floor(Math.random() * (13)) + 2;   //2->14

var array = []
var audioCash  = new Audio('cashsound.mp3');

var thisTurnPC = []
var thisTurnPlayer = []
var value = 0
var balance = 10000
$(document).ready(function(){
   
   for (let c = 0; c < 20; c++){
        array[c] = new Card(randCol(), randNum());
   }

   $('#balance').html(balance+" $")

   console.log(array)
   
   triggerClick()

    console.log(array)

})

function triggerClick(){
    
    $('.coin').on('click', function() {
        if( parseInt(this.id) > balance ){
            window.alert('Balance is lower than 0! You dont own such money!')
        }
        else{
            value = value + parseInt(this.id)
            balance = balance - parseInt(this.id);
            if(balance>0) audioCash.play();
            $('#val').html("&nbsp&nbsp"+value+" $&nbsp&nbsp")
            $('#playerCash').html("&nbsp&nbsp"+balance+" $&nbsp&nbsp");
        }
      });
}

// function triggerClick(){
    
//     $('.coin').on('click', function() {
//         value = value + parseInt(this.id)
//         balance = balance - parseInt(this.id);
//         if(balance<0){
//             if(value = 0) playerHasLost();
//             window.alert('Balance is lower than 0! You dont own such money!')
//                 value = value - parseInt(this.id)

//             balance = balance + parseInt(this.id);
//         }
//         if(balance>0) audioCash.play();
//         $('#val').html("&nbsp&nbsp"+value+" $&nbsp&nbsp")
//         $('#playerCash').html("&nbsp&nbsp"+balance+" $&nbsp&nbsp");
//       });
// }

var sumPC = 0
var sumPerson = 0

function putTheCards(){

    if (value>0){
        $('#theText').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

    //2 cards to player
   thisTurnPlayer.push(array.pop())
   thisTurnPlayer.push(array.pop())
    $('#playersCards').html('<img src="img/PNG/'+thisTurnPlayer[0].numberIMG+thisTurnPlayer[0].colorIMG+'.png" id="cardOfPlayer"><img src="img/PNG/'+thisTurnPlayer[1].numberIMG+thisTurnPlayer[1].colorIMG+'.png" id="cardOfPlayer"></img>')

    //2 cards to PC
    thisTurnPC.push(array.pop())
    thisTurnPC.push(array.pop())
    $('#pcCards').html('<img src="img/PNG/'+thisTurnPC[0].numberIMG+thisTurnPC[0].colorIMG+'.png" id="card1OfPC"><img src="img/PNG/gray_back.png" id="card2OfPC"></img>')


    //enabling hit and stand, disabling deal
    $('#HitB').prop('disabled',null);
    $('#StandB').prop('disabled', null);
    $('#dealB').prop('disabled', 'true');
    }else{
        if (balance == 0) playerHasLost()
        if (balance > 0) window.alert('Please put a stake!')
    }
}

function hit(){
    thisTurnPlayer.push(array.pop())
    var len = thisTurnPlayer.length -1 //last element of array
    $('#playersCards').append('<img src="img/PNG/'+thisTurnPlayer[len].numberIMG+thisTurnPlayer[len].colorIMG+'.png" id="cardOfPlayer"></img>')

}

function stand(){


    for (var element of thisTurnPlayer){
        sumPerson=sumPerson+element.subnumber;
    }
    for (var element of thisTurnPC){
        sumPC=sumPC+element.subnumber;
    }

    maybePCWantsToHit()

    if  (sumPC < 22 && sumPerson < 22){
        if (sumPerson>sumPC) {
            audioCash.play();
           // window.alert("Person"+sumPC+"/"+sumPerson); 
            balance = balance + value*2;
            $('#theText').html('<img src="img/win_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

        }
        if (sumPerson<sumPC) {
            // window.alert("PC -"+sumPC+"/"+sumPerson); 
            balance = balance;
            $('#theText').html('<img src="img/youlose_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

        }
        if (sumPerson==sumPC) {
            // window.alert("Equal"+sumPC+"/"+sumPerson); 
            balance = balance + value;
            $('#theText').html('<img src="img/draw_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

        }
    }

    if (sumPC < 22 && sumPerson > 22){
        // window.alert("PC -"+sumPC+"/"+sumPerson)
        balance = balance;
        $('#theText').html('<img src="img/youlose_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

    }

    if (sumPC > 22 && sumPerson < 22){
        audioCash.play();
        // window.alert("Person"+sumPC+"/"+sumPerson)
        balance = balance + value*2;
        $('#theText').html('<img src="img/win_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')


    }

    
    $('#HitB').prop('disabled','true');
    $('#StandB').prop('disabled','true');

    $('#pcCards').html('<img src="img/PNG/'+thisTurnPC[0].numberIMG+thisTurnPC[0].colorIMG+'.png" id="card1OfPC"><img src="img/PNG/'+thisTurnPC[1].numberIMG+thisTurnPC[1].colorIMG+'.png" id="card2OfPC">')
    if(thisTurnPC.length > 2) {
        $('#pcCards').append('<img src="img/PNG/'+thisTurnPC[2].numberIMG+thisTurnPC[2].colorIMG+'.png" id="card2OfPC">');
    }
    //if pc has more than 2 cards then expose third one

    $('#playerCash').html("&nbsp&nbsp"+balance+" $&nbsp&nbsp");
    if (balance>99){
        setTimeout( function(){ 
            $('#theText').html('<img src="img/stake_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

            newTurn()
          }  , 2500 );
    }else playerHasLost();
}

function playerHasLost(){
    window.alert('You are a bankrupt!')
    $('#theText').html('<img src="img/outofcash_text.png" id="cardStackPhoto"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

    $('#val').html("&nbsp&nbsp0 $&nbsp&nbsp");
    $('#HitB').prop('disabled','true');
    $('#StandB').prop('disabled','true');
   
}
function maybePCWantsToHit(){
    var drawTheDecision = Math.floor(Math.random() * (2));
    
    if ((sumPC<16 && drawTheDecision == 1) || sumPC < 12){
        thisTurnPC.push(array.pop())
        var len = thisTurnPlayer.length -1 //last element of array
        sumPC = 0;
        for (var element of thisTurnPC){
            sumPC=sumPC+element.subnumber;
        }

        $('#pcCards').append('<img src="img/PNG/'+thisTurnPC[len].numberIMG+thisTurnPC[len].colorIMG+'.png" id="card2OfPC"></img>')
    }
}

function newTurn(){
    value = 0
    $('#val').html("&nbsp"+value+" $&nbsp")
    $('#pcCards').html('<img src="img/PNG/gray_back.png" id="cardOfPlayer"></img><img src="img/PNG/gray_back.png" id="card2OfPC"></img>')

    putCoins()
    sumPC = 0
    sumPerson = 0
    for (let c = 0; c < 20; c++){
        array[c] = new Card(randCol(), randNum());
   }
    thisTurnPC = []
    thisTurnPlayer = []
    $('#HitB').prop('disabled','true');
    $('#StandB').prop('disabled','true');
    $('#dealB').prop('disabled', null);
   
    
   
}

function putCoins(){
    console.log('putting the coins')
    $('#playersCards').html('<img src="img/PNG/z100.png" class="coin" id="100"><img src="img/PNG/z200.png" class="coin" id="200"><img src="img/PNG/z300.png" class="coin" id="300"><img src="img/PNG/z1000.png" class="coin" id="1000">')
    triggerClick()
}