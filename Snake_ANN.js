class node{
    constructor(nextlayerAmount){
        this.nextlayerAmount = nextlayerAmount
        this.input = 0
        this.outputs=[]
        this.weights = [[],[],[]]
        for(let i =0; i<nextlayerAmount+1;i++){
            this.newconnection()
        }
    }
    newconnection(){
        this.weights[0].push((Math.random()*2)-1)
        this.weights[1].push((Math.random()*2)-1)
        this.weights[2].push(Math.round(Math.random(0)*2))
    }
    hyperTan(input){
        return(Math.tanh(input))
    }
    derivedHyperTan(input){
        return(1-Math.pow(this.hyperTan(input),2))
    }
    Process(){
        this.outputs=[]
        let inputToBeUsed = this.input
        for(let k = 0; k < this.weights[0].length;k++){
            switch(this.weights[2][k]){
                case 1:
                    inputToBeUsed=this.hyperTan(this.input)
                break;
                case 2:
                    inputToBeUsed = this.derivedHyperTan(this.input)
                break;
            }
            this.outputs.push((inputToBeUsed*this.weights[0][k])+this.weights[1][k])
        }
    }
    mutate(){
      let ranNum = Math.round(Math.random()*2)
        switch(ranNum){
            case 0:
                for(let i =0; i <this.weights[0].length;i++){
                    this.weights[0][i]=this.hyperTan(this.weights[0][i])
                    this.weights[1][i]=this.hyperTan(this.weights[1][i])
                }
              break;
            case 1:
                for(let i=0;i<this.weights[2].length;i++){
                    this.weights[2][i]=Math.round(Math.random()*2)
                }
                break;
            case 2:
                this.weights[0] = Object.assign(this.weights[0].map(function (num, idx) {
                      return num+((Math.random()/2)-0.25);
                     }))
                    this.weights[1] = Object.assign(this.weights[1].map(function (num, idx) {
                        return num+((Math.random()/2)-0.25);
                    }))
                break;
        }
    }
}
class neuralNetwork{
    constructor(){
        this.layers = [[],[],[],[]]
        let tempvals = [4,12,12,3,2]
        for(let i = 0; i <4;i++){
            for(let k = 0; k<tempvals[i];k++){
                this.layers[i].push(new node(tempvals[i+1]-1))
            }
        }
    }
    mutate(){
        let ranNum = Math.round(Math.random()*2)
        let ranNum2 = Math.round(Math.random()*(this.layers[ranNum].length-1))
        this.layers[ranNum][ranNum2].mutate()

    }
    clearInputs(){
        for(let i = 0; i <4;i++){
            for(let k = 0; k <this.layers[i].length;k++){
                this.layers[i][k].input=0
            }
        }
    }
    runNet(input){
        this.clearInputs()
        for(let i =0; i < 4;i++){
            this.layers[0][i].input = input[i]
        }
        for(let i = 0;i<3;i++){
            this.ProcessCurrentLayer(i)
            this.InputToNextLayer(i)
        }
        return(this.output())
    }
    output(){
        let temp = -100
        let valToReturn =0
        for(let i = 0; i<3;i++){
            if(temp< this.layers[3][i].input){
                valToReturn = i
                temp = this.layers[3][i].input
            }
        }
        return(valToReturn)
    }
    ProcessCurrentLayer(currentLayer){
        for(let i = 0;i<this.layers[currentLayer].length;i++){
            this.layers[currentLayer][i].Process()
        }
    }
    InputToNextLayer(currentLayer){
        for(let i = 0;i<this.layers[currentLayer].length;i++){
            for(let k = 0; k < this.layers[currentLayer][i].outputs.length;k++){
                (this.layers[currentLayer+1][k]).input += this.layers[currentLayer][i].outputs[k]
            }
        }
    }
}