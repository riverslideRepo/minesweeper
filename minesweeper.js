GAMESTATES={
    notStarted:0,
    playing:1,
    gemeOver:2,
    won:3
}
class MineSweeper{
    constructor(){
        ///min 4 and max 100
        this.rows=10;
        this.cols=10;
        //min 1 //max (rows*cols-1)
        this.noOfMines=15;

        this.arr=[];
        this.coverArr=[];
        this.mines=[];

        this.preapareGame()

        this.gameState=GAMESTATES.notStarted;

        this.timeCount=0;
    }

    restartGame(){
        this.arr=[];
        this.coverArr=[];
        this.mines=[];
        this.flags=0;

        this.preapareGame()

        this.gameState=GAMESTATES.notStarted;

        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer;
        this.timeCount=0;

        this.showTimer();
        this.showFlags();
    }
    
    preapareGame(){
        
        this.createBlankGame();
        this.getMines();
        this.renderCover();   
    }
    getMines(){
        let f=0;
        let existMines={};
        for(let i=0;i<this.noOfMines;i++){
            let min=0;
            let max=this.rows*this.cols-1;
            let counter=0;
            let random;
            
            while(counter<6000){
                random =Math.floor(Math.random() * (+max - +min)) + +min; 
                if(existMines[random]==true){
                    continue;
                }else{
                    existMines[random]=true;
                    f++;
                    break;
                }
            }

            
            let mineRow=Math.floor(random/this.cols);
            let mineCol=random%this.cols;
            // console.log(random)
            // console.log(mineRow)
            // console.log(mineCol)
            this.arr[mineRow][mineCol]=9;
            this.mines.push({row:mineRow,col:mineCol});

            ////set neighbours
            //left
            if(mineCol>0 && this.arr[mineRow][mineCol-1]!=9){
                this.arr[mineRow][mineCol-1]++;
                //console.log("l");

            }

            //right
            if(mineCol<(this.cols-1) && this.arr[mineRow][mineCol+1]!=9){
                this.arr[mineRow][mineCol+1]++;
                //console.log("r");

            }

            //top
            if(mineRow>0 && this.arr[mineRow-1][mineCol]!=9){
                this.arr[mineRow-1][mineCol]++;
                //console.log("t");

            }

            //bottom
            if(mineRow<(this.rows-1) && this.arr[mineRow+1][mineCol]!=9){
                this.arr[mineRow+1][mineCol]++;
                //console.log("b");

            }

            //top left
            if(mineCol>0 && mineRow>0 && this.arr[mineRow-1][mineCol-1]!=9){
                this.arr[mineRow-1][mineCol-1]++;
                //console.log("tl");

            }

            //top right
            if(mineCol<(this.cols-1) && mineRow>0 && this.arr[mineRow-1][mineCol+1]!=9){
                this.arr[mineRow-1][mineCol+1]++;
                //console.log("tr");
            }

            //bottom left
            if(mineCol>0 && mineRow<(this.rows-1) && this.arr[mineRow+1][mineCol-1]!=9){
                this.arr[mineRow+1][mineCol-1]++;
                //console.log("bl");

            }

            //bottom right
            if(mineCol<(this.cols-1) && mineRow<(this.rows-1) && this.arr[mineRow+1][mineCol+1]!=9){
                this.arr[mineRow+1][mineCol+1]++;
                //console.log("br");

            }
            
        }

        // console.log(this.arr)
        // console.log(f);
    }
    createBlankGame(){
        let arr;
        
        arr=[];
        for(let i=0;i<this.rows;i++){
            let tmp=[];
            for(let j=0;j<this.cols;j++){
                tmp.push(0);
            }
            arr.push(tmp);
        }
        this.arr=arr;
        //console.log(arr);

        arr=[];
        for(let i=0;i<this.rows;i++){
            let tmp=[];
            for(let j=0;j<this.cols;j++){
                tmp.push('-');
            }
            arr.push(tmp);
        }
        this.coverArr=arr;
    }

    renderCover(){
        console.log(this.arr);
        console.log(this.coverArr);
    }

    getInput(row,col){
        if(this.gameState==GAMESTATES.gameOver || this.gameState==GAMESTATES.won){
            return;
        }

        if(this.gameState==GAMESTATES.notStarted){
            this.gameState=GAMESTATES.playing;
            this.timer=setInterval(()=>{
                this.timeCount++;
                this.showTimer();
            },1000)
        }

        if(this.coverArr[row][col]=='F'){
            return;
        }

        if(row>=0 && row<this.rows && col>=0 && col<this.cols){
            this.postInput(row,col);
        }else{
            console.error("Inavalid input given...");
        }
    }

    postInput(row,col){
        
        ///others
        let mn=this.checkForMines(row,col);
        if(mn==true){
            this.showAllMines();
            clearInterval(this.timer);
            this.gameState=GAMESTATES.gameOver;
            this.showLost();
        }else if(this.checkHint(row,col)!=-1){

            if(this.coverArr[row][col]=='-'){
                this.showHint(row,col);

            }else if(this.coverArr[row][col]>=1 && this.coverArr[row][col]<=8){
                this.numberClick(row,col);
                return;
            }
            
        }else{
            this.showFloodFill(row,col);
        }

        ///check for win        
        let win=this.checkForWin();
        if(win==true){
            this.gameState=GAMESTATES.won;
            clearInterval(this.timer);
            this.showWin();
        }

        
    }

    numberClick(row,col){
        //check
        let Fcount=0;
        // let hypenCount=0;
        let Farr=[[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[-1,1],[1,-1],[1,1]];

        for(let i=0;i<8;i++){

            if((row+Farr[i][0] >=0 && row+Farr[i][0] < this.rows) && (col+Farr[i][1] >=0 && col+Farr[i][1] < this.cols)){

                if(this.coverArr[row+Farr[i][0]][col+Farr[i][1]]=='F'){

                    Fcount++;
                }

            }
        }

        if(Fcount==this.coverArr[row][col]){
            for(let i=0;i<8;i++){

                if((row+Farr[i][0] >=0 && row+Farr[i][0] < this.rows) && (col+Farr[i][1] >=0 && col+Farr[i][1] < this.cols)){

                    if(this.coverArr[row+Farr[i][0]][col+Farr[i][1]]=='-'){

                        this.getInput(row+Farr[i][0],col+Farr[i][1]);
                    }
                }
            }
        }else{
            return;
        }

    }

    checkForWin(){
        let m=0;
        let u=0;
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                if(this.arr[i][j]==9){
                    if(this.coverArr[i][j]=='-' || this.coverArr[i][j]=='F'){
                        m++;
                    }
                }else{
                    if(this.coverArr[i][j]=='.' || (this.coverArr[i][j]>=1 && this.coverArr[i][j]<=8)){
                        u++;
                    }
                    //console.log(this.coverArr[i][j])
                }
            }
        }
        //console.log(m+","+u)
        if(m==this.noOfMines && u==(this.cols*this.rows-this.noOfMines)){
            return true;
        }else{
            return false;
        }
        
    }

    flagUp(row,col){
        if(this.gameState==GAMESTATES.playing){
            if(this.coverArr[row][col]=="-"){
                this.coverArr[row][col]="F";
                this.flags++;
            }else if(this.coverArr[row][col]=="F"){
                this.coverArr[row][col]="-";
                this.flags--;
            }
        }

        this.showFlags();
    }

    checkForMines(row,col){
        if(this.arr[row][col]==9){
            return true;
        }else{
            return false;
        }
    }
    showAllMines(){
        let mines=this.mines;
        for(let i=0;i<mines.length;i++){
            let row=mines[i].row;
            let col=mines[i].col;
            this.coverArr[row][col]='*';
        }
        console.log(this.coverArr);
    }
    showGameOver(){
        console.log("Game Over");
    }
    checkHint(row,col){
        if(this.arr[row][col]>=1 && this.arr[row][col]<=8){
            return this.arr[row][col];
        }else{
            return -1;
        }
    }
    showHint(row,col){
        this.coverArr[row][col]=this.arr[row][col];
        console.log(this.coverArr);
    }

    showFloodFill(row,col){
        if(col<0 || row<0 || col>=this.cols || row>=this.rows){
            return;
        }

        if(this.arr[row][col]==0 && (this.coverArr[row][col]=="-" || this.coverArr[row][col]=="F")){
            //console.log(row+","+col);
            this.coverArr[row][col]=".";

            this.showFloodFill(row,col-1);
            this.showFloodFill(row,col+1);
            this.showFloodFill(row-1,col);
            this.showFloodFill(row+1,col);
            this.showFloodFill(row-1,col-1);
            this.showFloodFill(row-1,col+1);
            this.showFloodFill(row+1,col-1);
            this.showFloodFill(row+1,col+1);      

            
        }else if(this.arr[row][col]>=1 && this.arr[row][col]<=8 && (this.coverArr[row][col]=="-" || this.coverArr[row][col]=="F")){
            this.coverArr[row][col]=this.arr[row][col];
        }
            
    }

    showWin(){
        
        console.log("You won and took "+this.timeCount+" seconds.");
    }

    showLost(){
        console.log("Try Again!")
    } 
    
    showTimer(){
        console.log(this.timeCount);
    }

    showFlags(){
        console.log("Flags: "+this.flags+"/"+this.noOfMines);
    }


}