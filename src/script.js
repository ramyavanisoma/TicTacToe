var player='X';
var comp='O';
var array=[-1, -1, -1, -1, -1, -1, -1, -1,-1];

/* - - - 
//Logic for CheckBoxes...
- - - */
$('#checkboxX').click(function(){
  $( "#checkboxO").prop( "checked", false );
  player='X';
    comp='O';
  if($("#checkboxX").prop("checked")===false){
     $( "#checkboxX").prop( "checked", true);
    
  }
  
});
$('#checkboxO').click(function(){
  $( "#checkboxX").prop( "checked", false );
  player='O';
   comp='X';
  if($("#checkboxO").prop("checked")===false){
     $( "#checkboxO").prop( "checked", true);
     
  }
});
/* - - - 
//End of Checkbox Logic..... Hello vaniiii
- - - */

var gameStart=false;

  $('#start').click(function() {
    $('#checkboxO').prop('disabled', true);
     $('#checkboxX').prop('disabled', true);
     $('#start').text('Game Started');
     $('#start').addClass('disable-click');
    gameStart=true;
});
var whoStarts="player";
var playerTurn=true;
var winner;

/* - - -
//Player Turn Logic...
- - -*/
function play(ele){
  if(gameStart===true && $(ele).text()==='' && playerTurn===true){
    console.log("playerturn: "+playerTurn);
     $(ele).text(player);
    playerTurn=false;
    updateValues();
    if(isDone()){
      display();//display message
      time=5;
      settimer();
    }
    else{
       compTurn();
    }
   
  }
}
/* - - - 
//End of Player Turn Logic...
- - - */

function updateValues(){
   array[0]=$('#1').text()==='' ? -1:$('#1').text()===player? 1:2 ;
   array[1]=$('#2').text()==='' ? -1:$('#2').text()===player? 1:2 ;
   array[2]=$('#3').text()==='' ? -1:$('#3').text()===player? 1:2 ;
   array[3]=$('#4').text()==='' ? -1:$('#4').text()===player? 1:2 ;
   array[4]=$('#5').text()==='' ? -1:$('#5').text()===player? 1:2 ;
   array[5]=$('#6').text()==='' ? -1:$('#6').text()===player? 1:2 ;
   array[6]=$('#7').text()==='' ? -1:$('#7').text()===player? 1:2 ;
   array[7]=$('#8').text()==='' ? -1:$('#8').text()===player? 1:2 ;
   array[8]=$('#9').text()==='' ? -1:$('#9').text()===player? 1:2 ;
}


/*- - -
//Logic to know if GameOver
- - - */
function isDone(){
 
  function whoWins(num1,num2,num3){
    var num=num1+num2+num3;
    if(num===3 && num1===num2 && num2===num3){
      winner=player;
      return true;
    }
    else if(num===6){
      winner=comp;
      return true;
    }
    else{
      return false;
    }
  }
  
   if(whoWins(array[0],array[1],array[2]) || whoWins(array[3],array[4],array[5])|| whoWins(array[6],array[7],array[8])||    whoWins(array[0],array[3],array[6])|| whoWins(array[1],array[4],array[7]) || whoWins(array[2],array[5],array[8]) ||  whoWins(array[0],array[4],array[8]) ||  whoWins(array[2],array[4],array[6])){
   return true;
   }
  else{
    var done=true;
  for(let i=0;i<array.length;i++){
    if(array[i]===-1){
      console.log( "done or not "+array[i]);
      done=false;
      break;
    }
  }
  if(done){
    winner='draw';
  }
    console.log("done: "+done);
  return done;
  }
}
/* - - - 
//GameOver Logic Ends here...
- - - */

/* - - - 
//Display Message
- - - */
function display(){
  $('#buttons').css('opacity','0.2');
  $('#display').css('color','#44025c');
  $('#start').text('Game Resets in...');
  $('#timer').show();
  if(winner===player){
     $('#display').text('YOU WON');
  }
  else if(winner===comp){
     $('#display').text('YOU LOSE');
  }
  else if(winner==='draw'){
    $('#display').text('ITS A DRAW');
  }
}
/* - - - 
//End of Display Message
- - - */

/* - - -
//Logic for Computer Turn
- - - */
function compTurn(){
  if(playerTurn===false){
    console.log("playerTurn in comp: "+playerTurn);
    function findBlock(){
      if($('#5').text()===''){
        return 5;
      }
      var sum=[];
      sum[0]=[array[0]+array[1]+array[2],0,1,2];
      sum[1]=[array[3]+array[4]+array[5],3,4,5];
      sum[2]=[array[6]+array[7]+array[8],6,7,8];
      sum[3]=[array[0]+array[3]+array[6],0,3,6];
      sum[4]=[array[1]+array[4]+array[7],1,4,7];
      sum[5]=[array[2]+array[5]+array[8],2,5,8];
      sum[6]=[array[0]+array[4]+array[8],0,4,8];
      sum[7]=[array[2]+array[4]+array[6],2,4,6];
      var sumOne;
      var sumThree;
     
      for(let i=0;i<sum.length;i++){
        if(sum[i][0]===3){
          sumThree=i;
          break;
        }
        if(sum[i][0]===1){
          sumOne=i;
        }
      }
      
      function findIndex(val){
        if(array[sum[val][1]]===-1){
          return 1;
        }
        else if(array[sum[val][2]]===-1){
          return 2;
        }
        else return 3;
      }
      console.log("sumthree:"+sumThree);
      console.log('sumone:'+sumOne);
      var index;
    if(sumThree!==undefined){
       index=findIndex(sumThree);
      return sum[sumThree][index]+1;
     }
    else if(sumOne!==undefined){
       index=findIndex(sumOne);
      return sum[sumOne][index]+1;
     } 
    else{
        for(let i=0;i<array.length;i++){
          if(array[i]===-1){
            return i+1;
          }
        }
    }
    }
    
    var block=findBlock();
    console.log(block);
    $("#"+block).text(comp);
    updateValues();
    if(isDone()){
      display();
      time=5;
      settimer();
    }
    else{
      playerTurn=true;
    }
    
  }
}
/* - - -
//End of Computer logic
- - - */

$('#reset').click(function(){
  reset();
});


function settimer(){
  var interval=setInterval(timer,1000);
  var time=5;
  function timer(){
    document.getElementById('timer').innerHTML=time--;
    if(time==-1){
      clearInterval(interval);
      reset();
    }
  }
}


function reset(){
   $('#checkboxO').prop('disabled',false);
   $('#checkboxX').prop('disabled',false);
   $('#start').text('Start');
   $('#display').text('');
   $('#buttons').css('opacity','1');
   $(".btn").text('');
   $('#timer').hide();
   $('#start').removeClass('disable-click');
    gameStart=false;
   $('#start').click(function(){
     gameStart=true;
     playerTurn=true;
  });
}

