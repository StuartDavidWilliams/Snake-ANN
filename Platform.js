let games = []
let NNs = []
let amount = 200
let box = 0
let bestList=[]
let followBest = true
function setup() {
    createCanvas(1330, 2800);
    for(let yCounter = 0;yCounter<20;yCounter++){
        for(let hCounter =0;hCounter<10;hCounter++){
            games.push(new snakeGame(60+(hCounter*120),(yCounter*120)+400))
            NNs.push(new neuralNetwork())
            games[hCounter+(yCounter*10)].start()
        }
    }
}
function draw() {
    background(0)
    frameRate(20)
    let check = true
    for(let counter = 0;counter<amount;counter++){
        if(games[counter].alive){
            check = false
            games[counter].giveSnakeInput(NNs[counter].runNet(games[counter].getInputs()))
            games[counter].move()
        }
        
    }
    if(check==true){
    bestList.push(games[best()].points)
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
    if(followBest){
        let bestNet =best()
        games[bestNet].show(10,0)
        showNet(bestNet)
    }else{
        games[box].show(10,0)
        showNet(box)
    }
    for(let gg = 0;gg<amount;gg++){
            games[gg].show(3,1)
    }
    graph()
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
function graph(){
    fill(color(522,522,522))
    rect(790,10,530,380)
    noFill();
    beginShape();
    vertex(810, 10);
    vertex(810, 370);
    vertex(1320, 370);
    endShape();
    beginShape();
    for(let i =0;i<bestList.length;i++){
        vertex(810+((i)*530/bestList.length),370-(bestList[i]*10))
    }
    endShape()
}
function mouseClicked(){
    window.scrollTo(0, 0)
    followBest=false
    box = Math.floor((mouseX-60)/120)+(Math.floor((mouseY-400)/120)*10)
    if(box<0||box>299){
        followBest=true
    }
}
function showNet(net){
    fill(color(522,522,522))
    rect(400,10,380,380)
    if(net!=300){
    for(let i = 0;i<4;i++){
        for(let k = 0;k<NNs[net].layers[i].length;k++){
            if(i!=3){
                for(let h =0; h<NNs[net].layers[i][k].weights[0].length;h++){
                   line(400+((i+1)*(380/5)),(10+((k+1)*380/(NNs[net].layers[i].length+1))),400+((i+2)*(380/5)),(10+((h+1)*380/(NNs[net].layers[i+1].length+1))))
               }
            }
            fill(color((522*(NNs[net].layers[i][k].input)),0,(522*-(NNs[net].layers[i][k].input))))
            ellipse(400+((i+1)*(380/5)),(10+((k+1)*380/(NNs[net].layers[i].length+1))),15)
            }
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