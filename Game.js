class snakeGame{
    constructor(x,y){
        this.movement
        this.time=100
        this.colour = 552
        this.scale = Math.floor(Math.floor(width/10)/39)
        this.alive
        this.position
        this.windowPosition = new createVector(x,y)
        this.points
        this.point
    }
    getInputs(){
        let returnList = []
        for(let i = 0; i < 3;i++){
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
        let vector = new createVector(this.point.x - this.position[0][this.position[0].length -1],this.point.y - this.position[1][this.position[1].length -1])
        returnList.push(Math.acos(((vector.x * this.movement.x) + (vector.y * this.movement.y)) / Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))) /Math.PI)
        if(this.movement.x != 0){
            if((vector.y * this.movement.x) > 0){
                returnList[3] = -returnList[3]
            }
        } else {
            if((vector.x * -this.movement.y) > 0){
                returnList[3] = -returnList[3]
            }
        }
        return(returnList)
    }
    start(){
        this.time =100
        this.movement= new createVector(1,0)
        this.alive = true
        this.position = [[20],[20]]
        this.points =1
        this.point =new createVector(10,10)
        this.randomPoint()
    }
    randomPoint(){
        this.point.x=Math.round(Math.random()*37)+1
        this.point.y=Math.round(Math.random()*37)+1
    }
    show(best){
        let tempscale = this.scale
        if(best==0){tempscale=Math.floor((width-40)*2/7)/38}
        fill(color(255,255,this.colour))
        if(this.alive==false){
            fill(color(255,Math.round((255-this.colour)/2.5),0))
        }
        rect(10+(this.windowPosition.x*best),10+(this.windowPosition.y*best),tempscale*38,tempscale*38)
        for(let ii = 0; ii < this.position[0].length;ii++){
            rect(10+(this.windowPosition.x*best)+(tempscale*(this.position[0][ii]-1)),10+(this.windowPosition.y*best)+(tempscale*(this.position[1][ii]-1)),tempscale,tempscale)
        }
        fill(color(255,0,0))
        rect(10+(this.windowPosition.x*best)+((this.point.x-1)*tempscale),10+(this.windowPosition.y*best)+((this.point.y-1)*tempscale),tempscale,tempscale)
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
        if((x%39) == 0 || (y%39) == 0 || this.time==0){return(true)}
        for(let i = 0; i < this.position[0].length - 2; i++){
            if(x == this.position[0][i] && y == this.position[1][i]){return(true)}
        }
        return(false)
    }
    giveSnakeInput(dirInput){
      let temp
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

