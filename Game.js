class segment extends p5.Vector{
    constructor(x,y,windowPosition){
        super(x,y)
        this.next
        this.windowPosition = windowPosition
    }
    show(hue,gradient,best,colour){
        if(typeof this.next =="object"){
            this.next.show(hue+gradient,gradient,best,colour)
        }
        let scale = Math.floor(Math.floor(width/10)/38)
        if(best==0){scale=Math.floor((width-40)*2/7)/38}
        fill(color(colour,255,0,Math.round(gradient+hue)))
        rect(10+(best*this.windowPosition.x)+(scale*(this.x-1)),10+(best*this.windowPosition.y)+(scale*(this.y-1)),scale,scale)
    }
    checkForDeath(x,y){
        if((x % 39)==0 || (y % 39)==0){
            return(true)
        }
        if(typeof this.next =="object"){
            if(this.x==x && this.y==y){return true}
            return(this.next.checkForDeath(x,y))
        }
        return(false)
    }
}
class snake{
    constructor(windowPosition){
        this.tail = new segment(20,20,windowPosition)
        this.head = this.tail
        this.movement = new createVector(0,1)
    }
    show(best,colour,points){this.tail.show(25,230/points,best,colour)}
    checkForDeath(x,y){return(this.tail.checkForDeath(x,y))}
    move(){
        this.head.next = new segment(this.head.x+this.movement.x,this.head.y+this.movement.y,this.head.windowPosition)
        this.head = this.head.next
    }
    shorten(){
        this.tail = this.tail.next
    }
}
class snakeGame{
    constructor(x,y){
        this.time=100
        this.alive
        this.windowPosition = new createVector(x,y)
        this.snake
        this.colour = 0
        this.points
        this.point
    }
    getInputs(){
        let returnList = [0,0,0]
        for(let counter = 0; counter<3;counter++){
            let selfDir = Math.round(Math.pow(Math.E,-counter))
            let other = Math.round(Math.sin(2*counter))
            if(this.snake.checkForDeath(this.snake.head.x+(selfDir*this.snake.movement.x)+(other*this.snake.movement.y),this.snake.head.y+(selfDir*this.snake.movement.y)-(other*this.snake.movement.x))){
                returnList[counter]=1
            }
        }
        let vector = new createVector(this.point.x - this.snake.head.x,this.point.y - this.snake.head.y)
        returnList.push(Math.acos(((vector.x * this.snake.movement.x) + (vector.y * this.snake.movement.y)) / Math.sqrt(Math.pow(vector.x,2) + Math.pow(vector.y,2))) /Math.PI)
        if(this.snake.movement.x != 0){
            if((vector.y * this.snake.movement.x) > 0){
                returnList[3] = -returnList[3]
            }
        } else {
            if((vector.x * -this.snake.movement.y) > 0){
                returnList[3] = -returnList[3]
            }
        }
        return(returnList)
    }
    start(){
        this.time =100
        this.alive = true
        this.points =1
        this.point =new createVector(10,10)
        this.snake = new snake(this.windowPosition)
        this.randomPoint()
    }
    randomPoint(){
        let temp = true
        while(temp){
            temp=false
            this.point.x=Math.round(Math.random()*37)+1
            this.point.y=Math.round(Math.random()*37)+1
            if(this.snake.checkForDeath(this.point.x,this.point.y)){
                temp = true
            }
        }
    }
    show(best){
        let scale = Math.floor(Math.floor(width/10)/38)
        if(best==0){scale=Math.floor((width-40)*2/7)/38}
        fill(color(255,255,255))
        if(this.alive==false){
            fill(color(255,0,0))
        }
        push()
        strokeWeight(3)
        stroke(color(this.colour,this.colour,0))
        rect(10+(this.windowPosition.x*best),10+(this.windowPosition.y*best),scale*38,scale*38)
        pop()
        this.snake.show(best,this.colour,this.points)
        fill(color(255,0,0))
        rect(10+(this.windowPosition.x*best)+((this.point.x-1)*scale),10+(this.windowPosition.y*best)+((this.point.y-1)*scale),scale,scale)
    }
    move(){
        this.time-=1
        this.snake.move()
        if(this.snake.checkForDeath(this.snake.head.x,this.snake.head.y) || this.time==0){
            this.alive=false
        }
        if(this.snake.head.x == this.point.x && this.snake.head.y == this.point.y){
            this.points ++
            this.time=100
            this.randomPoint()
        }else{
            this.snake.shorten()
        }
    }
    giveSnakeInput(dirInput){
      let temp
        switch(dirInput){
            case 1:
                temp = this.snake.movement.x
                this.snake.movement.x= this.snake.movement.y
                this.snake.movement.y = -temp
                break;
            case 2:
                temp = this.snake.movement.x
                this.snake.movement.x= -this.snake.movement.y
                this.snake.movement.y = temp
                break;
        }
    }
}
