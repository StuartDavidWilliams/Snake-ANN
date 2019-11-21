class graph{ 
    constructor(){
      this.bestList=[]
      this.meanList=[]
      this.bestSoFar = 1
      this.makeGraph()
    }
  show(best,mean){
      this.bestList.push(best)
      this.meanList.push(mean)
      if(best>this.bestSoFar){this.bestSoFar=best}
      this.makeGraph()
      push()
      strokeWeight(2)
      noFill()
      beginShape()
      stroke(color(0,0,0))
      for(let i =0;i<this.bestList.length;i++){
          vertex(70+2*Math.floor((width-40)*2/7)+((i)*Math.floor((width-40)*12/31)/(this.bestList.length-1)),Math.floor((width-40)*2/7)-20-((this.bestList[i]*Math.floor(width-40)*7/31)/(this.bestSoFar)))
      }
      endShape()
      strokeWeight(2)
      beginShape()
      stroke(color(0,0,255))
      for(let i =0;i<this.bestList.length;i++){
          vertex(70+2*Math.floor((width-40)*2/7)+((i)*Math.floor((width-40)*12/31)/(this.meanList.length-1)),Math.floor((width-40)*2/7)-20-((this.meanList[i]*Math.floor(width-40)*7/31)/(this.bestSoFar)))
      }
      endShape()
      stroke(color(0,0,0))
      strokeWeight(1)
      pop()
  }
  makeGraph(){
    fill(color(255,255,255))
    rect(30+2*Math.floor((width-40)*2/7),10,Math.floor((width-40)*3/7),Math.floor((width-40)*2/7))
    noFill()
    beginShape()
    vertex(70+2*Math.floor((width-40)*2/7), 10)
    vertex(70+2*Math.floor((width-40)*2/7), Math.floor((width-40)*2/7)-20)
    vertex(width, Math.floor((width-40)*2/7)-20)
    endShape()
    fill(color(0,0,0))
    text("Generations", 70+2*Math.floor((width-40)*2/7)+Math.floor((width-40)*6/31),Math.floor((width-40)*2/7))
    text(this.bestSoFar, 45+2*Math.floor((width-40)*2/7),Math.floor((width-40)*2/7)-20-Math.floor(width-40)*7/31)
    text(this.bestList.length, 65+2*Math.floor((width-40)*2/7)+Math.floor((width-40)*12/31),Math.floor((width-40)*2/7))
    push()
    translate(65+2*Math.floor((width-40)*2/7),Math.floor((width-40)/7)-20)
    rotate(Math.PI*3/2)
    text("Points", 0,0)
    pop()
  }
}
class netDisplay{
    static create(){
    let temp=[4,12,12,3]
    fill(color(255,255,255))
    rect(20+Math.floor((width-40)*2/7),10,Math.floor((width-40)*2/7),Math.floor((width-40)*2/7))
    for(let i = 0;i<3;i++){
        for(let k = 0;k<temp[i];k++){
                for(let h =0; h<temp[i+1];h++){
                   line((20+Math.floor((width-40)*2/7))+((i+1)*(Math.floor((width-40)*2/7)/5)),(10+((k+1)*Math.floor((width-40)*2/7)/(temp[i]+1))),(20+Math.floor((width-40)*2/7))+((i+2)*(Math.floor((width-40)*2/7)/5)),(10+((h+1)*Math.floor((width-40)*2/7)/(temp[i+1]+1))))
            }
        }
    }
    fill(color(0,0,0))
    text("Front",Math.floor((width-40)*2/7)+((Math.floor((width-40)*2/7)/5))-30,(10+(Math.floor((width-40)*2/7)/5)))
    text("Left",Math.floor((width-40)*2/7)+((Math.floor((width-40)*2/7)/5))-30,(10+(Math.floor((width-40)*4/7)/5)))
    text("Right",Math.floor((width-40)*2/7)+((Math.floor((width-40)*2/7)/5))-30,(10+(Math.floor((width-40)*6/7)/5)))
    text("Angle",Math.floor((width-40)*2/7)+((Math.floor((width-40)*2/7)/5))-30,(10+(Math.floor((width-40)*8/7)/5)))
    text("Forward",40+Math.floor((width-40)*2/7)+(4*(Math.floor((width-40)*2/7)/5)),(10+(Math.floor((width-40)*2/7)/4)))
    text("Right",40+Math.floor((width-40)*2/7)+(4*(Math.floor((width-40)*2/7)/5)),(10+(Math.floor((width-40)*4/7)/4)))
    text("Left",40+Math.floor((width-40)*2/7)+(4*(Math.floor((width-40)*2/7)/5)),(10+(Math.floor((width-40)*6/7)/4)))
                }
static showNet(net){
    for(let i = 0;i<4;i++){
        for(let k = 0;k<net.layers[i].length;k++){
            fill(color((255*(net.layers[i][k].input)),0,(255*-(net.layers[i][k].input))))
            ellipse(20+Math.floor((width-40)*2/7)+((i+1)*(Math.floor((width-40)*2/7)/5)),(10+((k+1)*Math.floor((width-40)*2/7)/(net.layers[i].length+1))),15)
        }
    }
}
}

