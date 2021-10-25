let tc=new Tictactoe();
let inputFromUser=false;


tc.setSignToCell=function (sign,cell){
    inputFromUser=false;

    // if(tc.currentTurn.playerType=="computer"){
    //     setTimeout(()=>{
    //         let ocell=document.querySelector("#c"+cell[0]+"_"+cell[1]+" .innerCell");

    //         if(sign=='o'){
            
    //             window.setTimeout(function(){
    //                 ocell.classList.add("activeC");
    //             },10);

    //         }else{
                
    //             window.setTimeout(function (){
    //                 ocell.classList.add("activeD");
    //             },10)
    //         }

    //         inputFromUser=true;
    //     },300);
        
    // }else{
        let ocell=document.querySelector("#c"+cell[0]+"_"+cell[1]+" .innerCell");

        if(sign=='o'){
        
            window.setTimeout(function(){
                ocell.classList.add("activeC");
            },10);

        }else{
            
            window.setTimeout(function (){
                ocell.classList.add("activeD");
            },10)
        }

        inputFromUser=true;
    //}
    
    
        

}

tc.showRestartGame=function (){
    let cells=document.querySelectorAll(".innerCell");
    for(let i=0;i<cells.length;i++){
        cells[i].classList.remove('activeC');
        cells[i].classList.remove('activeD');
    }
    let marker=document.getElementById("marker");
    marker.style.transform="scale(0)";
    marker.style.display="none";

    let lower=document.getElementById("lower");
    lower.classList.remove("active");
    
}

tc.showWin=function (){
    /////show win message here and scratch the line too
    // console.log(player);
    let player=tc.currentTurn;
    let won=tc.winPath;

    let lower=document.getElementById("lower");
    lower.innerHTML=player.name+" wins";
    lower.classList.add("active");
    // console.log(won);

    ////change score visual animation{defect!!!}
    document.querySelector("#"+player.id+" .score").classList.add("change");
    setTimeout(()=>{document.querySelector("#"+player.id+" .score").classList.remove("change");},500);


    let marker=document.getElementById("marker");
   
    marker.classList.add("active");
    marker.style.display="block";
    let sr=won.path.start[0];
    let sc=won.path.start[1];
    let er=won.path.end[0];
    let ec=won.path.end[1];

    let left,top;

    let jjj=10;
    // if(this.playType=="p2c" &&  player.playerType=="computer"){
    //     jjj=600;
    // }else{
    //     jjj=10;
    // }

    if(sr==er){
        //left is always 0
        left=0;
        top=(sr+1)/3*100-(100/6);
        marker.style.left=left+"%";
        marker.style.top="calc("+top+"% - 3px)";
        marker.style.width="100%";
        marker.style.transform="scale(0,1)";
        window.setTimeout(function (){
            marker.style.transform="scale(1,1)";
    
       },jjj);

    }else if(sc==ec){
        //top is always 0
        top=0;
        left=(sc+1)/3*100-(100/6);
        marker.style.left=left+"%";
        marker.style.top=top+"%";
        marker.style.width="100%";
        marker.style.transform="rotate(90deg) scale(0,1)";
        window.setTimeout(function (){
            marker.style.transform="rotate(90deg) scale(1,1)";
    
       },jjj);

    }else if(sr==0 && sc==0 && er==2 && ec==2){
        ///Diag1
        left=0;
        top=0;
        marker.style.left="calc("+left+"% + 3px)";
        marker.style.top=top+"%";
        marker.style.width="141%";
        marker.style.transform="rotate(45deg) scale(0,1)";
        window.setTimeout(function (){
                marker.style.transform="rotate(45deg) scale(1,1)";
        
        },jjj);
    }else if(sr==0 && sc==2 && er==2 && ec==0){
        //Diag2
        left=100;
        top=0;
        marker.style.left="calc("+left+"% - 3px)";
        marker.style.top=top+"%";
        marker.style.transform="rotate(135deg) scale(0,1)";
        marker.style.width="141%";
       window.setTimeout(function (){
            marker.style.transform="rotate(135deg) scale(1,1)";
    
       },jjj);
    }

    
   

}

// tc.showChangedType=function (){}
 tc.showChangedSign=function (){
    let player1=tc.player1;
    let player2=tc.player2;

    let p1_sign=document.querySelector("#upper #player1 .sign");
    let p2_sign=document.querySelector("#upper #player2 .sign");

     setTimeout(()=>{
     
     p1_sign.innerHTML=player1.sign.toUpperCase();
     
     
     p2_sign.innerHTML=player2.sign.toUpperCase();

    },150);

    
    if(player1.sign=="x"){
        p1_sign.classList.remove("turn_o");
        p1_sign.classList.add("turn_x");
        p2_sign.classList.remove("turn_x");
        p2_sign.classList.add("turn_o");
    }else{
       p1_sign.classList.remove("turn_x");
       p1_sign.classList.add("turn_o");
       p2_sign.classList.remove("turn_o");
       p2_sign.classList.add("turn_x");
    }


 }
 tc.showCurrentTurn=function (){
    // console.log(player);
    let player=this.currentTurn;
    if(player.id=="player1"){
        document.querySelector("#upper #player1").classList.add("active");
        document.querySelector("#upper #player2").classList.remove("active");
    }else if(player.id=="player2"){
        document.querySelector("#upper #player2").classList.add("active");
        document.querySelector("#upper #player1").classList.remove("active");
    }
 }
 tc.showScoreBoard=function (){
    let player1=tc.player1;
    let player2=tc.player2;
    setTimeout(()=>{
    
    let p1_score=document.querySelector("#upper #player1 .score");
    p1_score.innerHTML=player1.timeWon;
    let p2_score=document.querySelector("#upper #player2 .score");
    p2_score.innerHTML=player2.timeWon;



    ///auto save score to localstorage

    },250);

 }

tc.showDraw=function (){
    let lower=document.getElementById("lower");
    lower.innerHTML="Match Draw";
    lower.classList.add("active");
    
}

tc.showChangePlayerName=function(){
    let player1Name=tc.player1.name;
    let player2Name=tc.player2Name;
    
    document.querySelector("#menu #player1_name").innerText=player1Name;
    document.querySelector("#menu #player2_name").innerText=player2Name;
    
    document.querySelector("#upper #player1 .name").innerText=this.player1.name;
    document.querySelector("#upper #player2 .name").innerText=this.player2.name;
    
}

tc.showChangedType=function (){
    
    if(tc.playType=="p2p"){
        document.getElementById("two_player_mode").checked=true;

        document.querySelector("#menu #name2").style.display="block";

        document.querySelector("#menu #level").style.display="none";
    }else{
        document.getElementById("two_player_mode").checked=false;

        document.querySelector("#menu #name2").style.display="none";

        document.querySelector("#menu #level").style.display="block";
    }
}

function press(cell){
    if(inputFromUser==true){
        tc.getInput(cell);
    }
   
}

function restart(){
    tc.restartGame();
    
}

function changeSign(){
    tc.changeSign();
}

function changePlayType(obj){
    //alert(obj.checked)
    if(obj.checked){
        tc.changeType("p2p");
    }else{
        tc.changeType("p2c");
    }

}



function changePlayerName(obj){
    if(obj.id=="player1_name"){
        tc.changePlayerName(tc.player1,obj.innerText);
    }else if(obj.id=="player2_name"){
        tc.changePlayerName(tc.player2,obj.innerText);
    }
}

let boolMenu=false;
function showMenu(){

    if(!boolMenu){
        document.querySelector("header").classList.add("open_menu");
    }else{
        document.querySelector("header").classList.remove("open_menu");
    }
    boolMenu=!boolMenu;    
    // alert(boolMenu);
}

function init(){
    tc.showChangePlayerName();
    tc.restartGame();
    inputFromUser=true;
    //afterTwoPlayerCheckbox();
    tc.showChangedType();
}
window.onload=init();