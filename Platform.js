class graph{ 
    constructor(){
      this.bestList=[]
      this.bestSoFar = 1
    }
  show(best){
      this.bestList.push(best)
      if(best>this.bestSoFar){this.bestSoFar=best}
      this.makeGraph()
      noFill()
      beginShape()
      for(let i =0;i<this.bestList.length;i++){
          vertex(70+2*Math.floor((width-40)*2/7)+((i)*Math.floor((width-40)*12/31)/(this.bestList.length-1)),Math.floor((width-40)*2/7)-20-((this.bestList[i]*Math.floor(width-40)*7/31)/(this.bestSoFar)))
      }
      endShape()
  }
  makeGraph(){
    fill(color(522,522,522))
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
let games = []
let NNs = []
let amount = 200
let box = amount
let grapher = new graph()
function setup() {
    createCanvas(screen.width-30, ((screen.width)*2/7) + ((screen.width)*amount/100));
    background(0)
    let button
    button = createButton("Follow best")
    button.position(10, (width*2/7)+25)
    button.mousePressed(followBestClick)
    grapher.makeGraph()
    for(let yCounter = 0;yCounter<amount/10;yCounter++){
        for(let hCounter =0;hCounter<10;hCounter++){
            games.push(new snakeGame(hCounter*width/10,50+(yCounter*width/10)+(width*2/7)))
            NNs.push(new neuralNetwork())
            games[hCounter+(yCounter*10)].start()
        }
    }
}
function followBestClick(){box=amount}
function draw() {
    frameRate(20)
    fill(color(0,0,0))
    rect(0,0,30+2*Math.floor((width-40)*2/7),Math.floor((width)*2/7))
    rect(0,Math.floor((width)*2/7),width,height)
    let check = true
    for(let counter = 0;counter<amount;counter++){
        if(games[counter].alive){
            check = false
            games[counter].giveSnakeInput(NNs[counter].runNet(games[counter].getInputs()))
            games[counter].move()
        }
        
    }
    if(check==true){
    grapher.show(games[best()].points)
        let list = []
        for(let counter = 0;counter<amount;counter++){
            list.push(counter)
        }
        list = qsort(list)
        for(let h = 0; h<(amount*3/4);h++){
            NNs[list[Math.round(amount/4)+h]] = Object.assign(NNs[list[h%(amount/4)]])
            let ranNum = (Math.random()*1000)
            if(ranNum==0){
                NNs[list[Math.round(amount/4)+h]].mutate()
            }
        }
        for(let h = (amount-5); h<amount;h++){
            NNs[list[h]] = Object.assign(new neuralNetwork())
        }
        for(let g = 0;g<amount;g++){
          games[g].start()
        }
    }
    if(box==amount){
        let bestNet =best()
        games[bestNet].show(0)
        showNet(bestNet)
    }else{
        games[box].show(0)
        showNet(box)
    }
    for(let gg = 0;gg<amount;gg++){
            games[gg].show(1)
    }
}
function best(){
    let returnBest =0
    for(let i =1;i<amount;i++){
        if(games[returnBest].points < games[i].points){
            returnBest=i
        }
    }
    return(returnBest)
}
function breed(mum,dad){
    let temp = new neuralNetwork()
    for(let i =0;i<3;i++){
        for(let k = 0;k<dad.layers[i].length;k++){
            temp.layers[i][k].weights[0] = Object.assign(mum.layers[i][k].weights[0].map(function (num, idx) {
                return Math.tanh(num + dad.layers[i][k].weights[0][idx]);
              }))
              temp.layers[i][k].weights[1] = Object.assign(mum.layers[i][k].weights[1].map(function (num, idx) {
                return Math.tanh(num + dad.layers[i][k].weights[1][idx]);
            }))
        }
    }
    return(temp)
}
function mouseClicked(){
    let tempbox = Math.floor((mouseX-10)*10/width)+10*Math.floor((mouseY-(width*2/7)-60)*10/width)
    if(tempbox>=0 && tempbox<=amount){
        window.scrollTo(0, 0)
        box = tempbox
    }
}
function showNet(net){
    fill(color(522,522,522))
    rect(20+Math.floor((width-40)*2/7),10,Math.floor((width-40)*2/7),Math.floor((width-40)*2/7))
    for(let i = 0;i<4;i++){
        for(let k = 0;k<NNs[net].layers[i].length;k++){
            if(i!=3){
                for(let h =0; h<NNs[net].layers[i][k].weights[0].length;h++){
                   line((20+Math.floor((width-40)*2/7))+((i+1)*(Math.floor((width-40)*2/7)/5)),(10+((k+1)*Math.floor((width-40)*2/7)/(NNs[net].layers[i].length+1))),(20+Math.floor((width-40)*2/7))+((i+2)*(Math.floor((width-40)*2/7)/5)),(10+((h+1)*Math.floor((width-40)*2/7)/(NNs[net].layers[i+1].length+1))))
               }
            }
            fill(color((522*(NNs[net].layers[i][k].input)),0,(522*-(NNs[net].layers[i][k].input))))
            ellipse(20+Math.floor((width-40)*2/7)+((i+1)*(Math.floor((width-40)*2/7)/5)),(10+((k+1)*Math.floor((width-40)*2/7)/(NNs[net].layers[i].length+1))),15)
        }
    }
}

function qsort(list){
    if(list.length == 0){
      return([])
    }
    let smaller = []
    let bigger = []
    let pivot = list[0]
    for(let ii = 1; ii <list.length-1;ii++){
      if(games[pivot].points < games[list[ii]].points){
        bigger.push(list[ii])
      }else{
        smaller.push(list[ii])
      }
    }
    return(((qsort(bigger)).concat(pivot)).concat(qsort(smaller)))
  }
  
