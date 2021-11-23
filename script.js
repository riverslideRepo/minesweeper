let mns=new MineSweeper();

mns.renderCover= ()=>{
    let lower=document.getElementById("lower");
    lower.classList.remove("active");

    let table=document.createElement("table");
    for(let i=0;i<mns.rows;i++){
        let tr=document.createElement("tr");
        table.appendChild(tr);
        for(let j=0;j<mns.cols;j++){
            let td=document.createElement("td");
            tr.appendChild(td);

            let innerDiv=document.createElement("div");
            td.appendChild(innerDiv);
            innerDiv.id="c_"+i+"_"+j;

            innerDiv.setAttribute("hb-mns-cover-value","-");
            td.addEventListener("mouseup",(event)=>{
                //alert(event.button);
                if(event.button==0){
                    mns.getInput(i,j);
                }else if(event.button==2){
                    //alert()
                    mns.flagUp(i,j);
                }
                
            },false);
            
            let tsTime;
            td.addEventListener("touchstart",()=>{
                let d=new Date();
                tsTime=d.getTime();
                //alert(tsTime)
            },false);
            td.addEventListener("touchend",()=>{
                let d=new Date();
                let teTime=d.getTime();
                
                if((teTime-tsTime)>=300){
                    mns.flagUp(i,j);
                    //alert(teTime-tsTime);
                }
            },false)
        }
    }

    let board=document.getElementById("board");
    board.innerHTML="";
    board.appendChild(table);
}
mns.showWin=()=>{
    let lower=document.getElementById("lower");
    lower.innerHTML="You won in "+mns.timeCount+"s";
    lower.classList.add("active");
}
mns.showLost=()=>{
    let lower=document.getElementById("lower");
    lower.innerHTML="Try again";
    lower.classList.add("active");
}
mns.showTimer=()=>{
    document.getElementById("timer_count").innerText=mns.timeCount;
}
mns.showFlags=()=>{
    document.getElementById("flag_count").innerText=mns.flags+"/"+mns.noOfMines;
}
mns.showAllMines=()=>{
    let mines=mns.mines;
    for(let i=0;i<mines.length;i++){
        let row=mines[i].row;
        let col=mines[i].col;
        mns.coverArr[row][col]='*';
        let cell=document.getElementById("c_"+row+"_"+col);
        cell.setAttribute("hb-mns-cover-value","*");
        cell.innerText="";  
    }
} 
mns.showHint=(row,col)=>{
    mns.coverArr[row][col]=mns.arr[row][col];
    let cell=document.getElementById("c_"+row+"_"+col);
    cell.setAttribute("hb-mns-cover-value",mns.arr[row][col]);
    cell.innerText=mns.arr[row][col];
    
}
mns.flagUp=(row,col)=>{
    if(mns.gameState==GAMESTATES.playing){
        let cell=document.getElementById("c_"+row+"_"+col);
        if(mns.coverArr[row][col]=="-"){
            mns.coverArr[row][col]="F";
            mns.flags++;
            cell.setAttribute("hb-mns-cover-value","F");
        }else if(mns.coverArr[row][col]=="F"){
            mns.coverArr[row][col]="-";
            mns.flags--;
            cell.setAttribute("hb-mns-cover-value","-");
        }
    }
    mns.showFlags();
}
mns.showFloodFill=(row,col)=>{
    if(col<0 || row<0 || col>=mns.cols || row>=mns.rows){
        return;
    }

    let cell=document.getElementById("c_"+row+"_"+col);
    let cellCoverValue=cell.getAttribute("hb-mns-cover-value").trim();

    if(mns.arr[row][col]==0 && (cellCoverValue=="-" || cellCoverValue=="F")){
        //console.log(row+","+col);
        mns.coverArr[row][col]="."
        cell.setAttribute("hb-mns-cover-value","."); 
        cell.innerText="";
        
        mns.showFloodFill(row,col-1);
        mns.showFloodFill(row,col+1);
        mns.showFloodFill(row-1,col);
        mns.showFloodFill(row+1,col);
        mns.showFloodFill(row-1,col-1);
        mns.showFloodFill(row-1,col+1);
        mns.showFloodFill(row+1,col-1);
        mns.showFloodFill(row+1,col+1);      

        
    }else if(mns.arr[row][col]>=1 && mns.arr[row][col]<=8 && (cellCoverValue=="-" || cellCoverValue=="F")){
        mns.coverArr[row][col]=mns.arr[row][col]
        cell.setAttribute("hb-mns-cover-value",mns.arr[row][col]);
        cell.innerText=mns.arr[row][col];
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

function restart(){
    mns.restartGame();
}

const setRowsField = document.getElementById('setRows');
const setColsField = document.getElementById('setCols');
const setBombsField = document.getElementById('setBombs');

window.onload=()=>{
    mns.renderCover(); 
    
    document.oncontextmenu=()=>{
        return false;
    }

    mns.restartGame();
    //mns.showAllMines();

    setRowsField.value=mns.rows;
    setColsField.value=mns.cols;
    setBombsField.value=mns.noOfMines;


    setRowsField.addEventListener("change",()=>{
        mns.rows=parseInt(setRowsField.value);
        mns.restartGame();
        setBombsField.setAttribute("max",Math.floor(setRowsField.value * setColsField.value * 2 / 3));
    });
    setColsField.addEventListener("change",()=>{
        mns.cols=parseInt(setColsField.value);
        mns.restartGame();
        setBombsField.setAttribute("max",Math.floor(setRowsField.value * setColsField.value * 2 / 3));
    });
    setBombsField.addEventListener("change",()=>{
        mns.noOfMines=parseInt(setBombsField.value);
        mns.restartGame();
    });
}
