let games = []
let NNs = []
let amount = 300
let box = amount
let grapher
function setup(){
    makeScreen()
    setButton()
    createSnakes()
    startSnakes()
}
//
function createSnakes(){
    for(let yCounter = 0;yCounter<amount/10;yCounter++){
        for(let hCounter =0;hCounter<10;hCounter++){
            games.push(new snakeGame(hCounter*width/10,50+(yCounter*width/10)+(width*2/7)))
            NNs.push(new neuralNetwork())
        }
    }
}
function getMean(){
    let temp = 0
    for(let counter =0;counter<amount;counter++){temp+=games[counter].points}
    return(temp/amount)
}
function setButton(){
    let button = createButton("Follow best")
    button.position(10, (width*2/7)+25)
    button.mousePressed(function(){box=amount})
}
function makeScreen(){
    let tempwidth = screen.width
    if(screen.width<1366){tempwidth=1366}
    createCanvas(tempwidth-30, (tempwidth*2/7) + (tempwidth*amount/100));
    background(0)
    frameRate(20)
    grapher = new graph()
    netDisplay.create()
}
function drawScreen(){
    fill(color(0,0,0))
    rect(0,0,30+Math.floor((width-40)*2/7),Math.floor((width)*2/7))
    rect(0,Math.floor((width)*2/7),width,height)
}
function runNetsAndCheckIfDead(){
    let check = true
    for(let counter = 0;counter<amount;counter++){
        if(games[counter].alive){
            check = false
            games[counter].giveSnakeInput(NNs[counter].runNet(games[counter].getInputs()))
            games[counter].move()
        }
    }
    return(check)
}
function makeList(limit){
    let list = []
    for(let counter = 0;counter<limit;counter++){list.push(counter)}
    return(list)
}
function resetColour(){
    for(let counter = 0; counter<amount;counter++){games[counter].colour = 0}
}
function makeNextGen(){
    resetColour()
    let list = qsort(games,makeList(amount))
    NNs[amount-1]=new neuralNetwork()
    for(let counter =0;counter<(amount/6)-1;counter++){
        NNs[list[Math.round(counter+(amount*5/6))]]=copyNet(breed(copyNet(NNs[list[counter]]),copyNet(NNs[list[Math.round(Math.random()*amount/8)]])))
        games[list[Math.round(counter+(amount*5/6))]].colour = 522
        let mutate = Math.round(Math.random()*50)
        if(mutate ==5){NNs[list[Math.round(counter+(amount*5/6))]].mutate()}
    }
    for(let counter = (amount-5); counter<amount;counter++){NNs[list[counter]] = copyNet(NNs[list[0]])}
}
function copyNet(net){
    let newNet = new neuralNetwork()
    for(let layerCounter =0;layerCounter< 4;layerCounter++){
        for(let nodeCounter = 0;nodeCounter<newNet.layers[layerCounter].length;nodeCounter++){
            for(let weightCounter = 0;weightCounter<3;weightCounter++){newNet.layers[layerCounter][nodeCounter].weights[0]=net.layers[layerCounter][nodeCounter].weights[weightCounter].slice()}
        }
    }
    return(net)
}
function draw(){
    drawScreen()
    if(runNetsAndCheckIfDead()){
        grapher.show((games[(best())]).points,getMean())
        makeNextGen()
        startSnakes()
    }
    showSnakes()
}
function startSnakes(){
    for(let counter = 0;counter<amount;counter++){
        games[counter].start()
    }
}
function showSnakes(){
    let tempBox = box
    if(tempBox==amount){tempBox = best()}
    games[tempBox].show(0)
    netDisplay.showNet(NNs[tempBox])
    fill(color(0,0,0))
    text(games[tempBox].points,12,22)
    for(let counter = 0;counter<amount;counter++){
            games[counter].show(1)
    }
}
function best(){
    let returnBest =0
    for(let counter =1;counter<amount;counter++){
        if(games[returnBest].points < games[counter].points){
            returnBest=counter
        }
    }
    return(returnBest)
}
function breed(mum,dad){
    mum.rateNet()
    dad.rateNet()
    let newNet = new neuralNetwork()
    for(let layerCounter =0;layerCounter<4;layerCounter++){
        for(let nodeCounter =0;nodeCounter<newNet.layers[layerCounter].length;nodeCounter++){
            for(let weightCounter =0;weightCounter<newNet.layers[layerCounter][nodeCounter].weights[0].length;weightCounter++){
                for(let typeCounter = 0;typeCounter<3;typeCounter++){newNet.layers[layerCounter][nodeCounter].weights[typeCounter][weightCounter]=(Math.random()-0.5)*Math.round(Math.random())}
            }
        }
    }
    newNet = copyNet(passGenetics(copyNet(passGenetics(newNet,dad,6)),mum,13))
    return(newNet)
}
function passGenetics(newNet,parent,num){
    let tempList = makeList(newNet.layers[2].length)
    let bestLayer2 = qsort(parent.layers[1],tempList)
    let bestLayer3 = qsort(parent.layers[2],tempList)
    for(let i =0;i<parent.layers[0].length;i++){
        for(let k =parent.layers[1].length/2;k<parent.layers[1].length;k++){
            for(let h = 0; h<3;h++){newNet.layers[0][i].weights[h][k%num]=parent.layers[0][i].weights[h][bestLayer2[k%6]]}
        }
    }
    for(let i =parent.layers[1].length/2;i<parent.layers[1].length;i++){
        for(let k =parent.layers[1].length/2;k<parent.layers[2].length;k++){
            for(let h = 0; h<3;h++){newNet.layers[1][i%num].weights[h][k%num]=parent.layers[1][bestLayer2[i%6]].weights[h][bestLayer3[k%6]]}
        }
    }
    for(let i =parent.layers[1].length/2;i<parent.layers[1].length;i++){
        for(let k =0;k<parent.layers[3].length;k++){
            for(let h = 0; h<3;h++){newNet.layers[2][i%num].weights[h][k]=parent.layers[2][bestLayer3[i%6]].weights[h][k]}
        }
    }
    return(newNet)
}
function mouseClicked(){
    let tempbox = Math.floor((mouseX-10)*10/width)+10*Math.floor((mouseY-(width*2/7)-60)*10/width)
    if(tempbox>=0 && tempbox<=amount){window.scrollTo(0, 0);box = tempbox}
}
function qsort(items,list){
    if(list.length == 0){
     return([])
    }
    let smaller = []
    let bigger = []
    let pivot = list[0]
    for(let ii = 1; ii <list.length;ii++){
      if(items[pivot].points < items[list[ii]].points){
        bigger.push(list[ii])
      }else{
       smaller.push(list[ii])
      }
    }
    return(((qsort(items,bigger)).concat(pivot)).concat(qsort(items,smaller)))
  }
