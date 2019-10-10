class snakeGame{
    constructor(x,y){
        this.movement = new createVector(1,0)
        this.time=100
        this.alive = true
        this.position = [[],[]]
        this.windowPosition = new createVector(x,y)
        this.points = 0
        this.point =new createVector(1,1)
    }
    getInputs(){
        let returnList = []
        for(let i = 0; i < 4;i++){
            returnList.push(0)
        }
        if(this.checkForDeath(this.position[0][this.position[0].length-1]+this.movement.x, this.position[1][this.position[1].length-1]+this.movement.y)){
            returnList[0]=1
        }
        if(this.checkForDeath(this.position[0][this.position[0].length-1]+this.movement.y, this.position[1][this.position[1].length-1]-this.movement.x)){
            returnList[1]=1
        }
        if(this.checkForDeath(this.position[0][this.position[0].length-1]-this.movement.y, this.position[1][this.position[1].length-1]+this.movement.x)){
            returnList[2]=1
        }
        let vectorx = this.point.x - this.position[0][this.position[0].length -1]
        let vectory = this.point.y - this.position[1][this.position[1].length -1]
        returnList[3] = Math.acos(((vectorx * this.movement.x) + (vectory * this.movement.y)) / Math.sqrt(Math.pow(vectorx, 2) + Math.pow(vectory, 2))) /Math.PI
        if(this.movement.x != 0){
            if((vectory * this.movement.x) > 0){
                returnList[3] = -returnList[3]
            }
        } else {
            if((vectorx * -this.movement.y) > 0){
                returnList[3] = -returnList[3]
            }
        }
        if(returnList[0]==0){
            let ooip = 0
        }
        return(returnList)
    }
    start(){
        this.time =100
        this.movement.x = 1
        this.movement.y = 0
        this.alive = true
        this.position = [[],[]]
        this.position[0].push(20)
        this.position[1].push(20)
        this.points =0
        this.randomPoint()
    }
    randomPoint(){
        this.point.x=Math.round(Math.random()*35)+3
        this.point.y=Math.round(Math.random()*35)+3
    }
    show(scale,best){
        fill(color(522,522,522))
        if(this.alive==false){
            fill(color(522,0,0))
        }
        rect(scale+(this.windowPosition.x*best),scale+(this.windowPosition.y*best),scale*38,scale*38)
                for(let ii = 0; ii < this.position[0].length;ii++){
            rect((this.windowPosition.x*best)+(scale*this.position[0][ii]),(this.windowPosition.y*best)+(scale*this.position[1][ii]),scale,scale)
        }
        fill(color(522,0,0))
        rect((this.windowPosition.x*best)+(this.point.x*scale),(this.windowPosition.y*best)+(this.point.y*scale),scale,scale)
        if(best == 0){
            this.show(3,1)
        }
    }
    move(){
        this.time-=1
        this.position[0].push(this.position[0][this.position[0].length-1]+this.movement.x)
        this.position[1].push(this.position[1][this.position[1].length-1]+this.movement.y)
        if(this.checkForDeath(this.position[0][this.position[0].length-1], this.position[1][this.position[1].length-1])){
            this.alive=false
        }
        if(this.position[0][this.position[0].length-1]==this.point.x && this.position[1][this.position[1].length-1]==this.point.y){
            this.points +=1
            this.time=100
            this.randomPoint()
        }else{
            this.position[0].shift()
            this.position[1].shift()
        }
    }
    checkForDeath(x,y){
        if(this.time==0){
            return(true)
        }
        if(x == 0 || y == 0 || x == 39 || y == 39){
            return(true)
        }
        for(let i = 0; i < this.position[0].length - 2; i++){
            if(x == this.position[0][i] && y == this.position[1][i]){
                return(true)
            }
        }
        return(false)
    }
    giveSnakeInput(dirInput){
      let temp =0
        switch(dirInput){
            case 1:
                temp = this.movement.x
                this.movement.x= this.movement.y
                this.movement.y = -temp
                break;
            case 2:
                temp = this.movement.x
                this.movement.x= -this.movement.y
                this.movement.y = temp
                break;
        }
    }
}