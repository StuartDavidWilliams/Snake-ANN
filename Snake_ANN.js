class node{
    constructor(nextLayerAmount){
        this.input = 0
        this.points = 1
        this.outputs=[]
        this.weights = [[],[],[]]
        for(let i =0; i<nextLayerAmount+1;i++){
            this.newConnection()
        }
    }
    newConnection(){
        this.weights[0].push((Math.random()*2)-1)
        this.weights[1].push((Math.random()*2)-1)
        this.weights[2].push(Math.round(Math.random()*2))
    }
    hyperTan(input){
        return(Math.tanh(input))
    }
    derivedHyperTan(input){
        return(1-Math.pow(this.hyperTan(input),2))
    }
    process(){
        this.outputs=[]
        for(let k = 0; k < this.weights[0].length;k++){
            let inputToBeUsed = this.input
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
        for(let i = 0;i<this.weights[0].length;i++){
            for(let k = 0; k<2; k++){
                let ranNum = Math.round(Math.random()*5)
                if(ranNum ==1){this.weights[k][i]+=Math.random()-0.5}
            }
            let ranNum = Math.round(Math.random()*5)
            if(ranNum ==1){this.weights[2][i]+=Math.round(Math.random()*2)}
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
    rateNet(){
    this.resetRating()
        for(let i = 2;i>0;i--){
            for(let k = 0; k <this.layers[i].length;k++){
                for(let h = 0; h <this.layers[i+1].length;h++){
                    this.layers[i][k].points += ((Math.abs(this.layers[i][k].weights[0][h])*this.layers[i+1][h].points)+Math.abs(this.layers[i][k].weights[1][h]))
                }
            }
        }
        for(let i = 0;i<2;i++){
            for(let k = 0; k <this.layers[i+1].length;k++){
                for(let h = 0; h <this.layers[i].length;h++){
                this.layers[i+1][k].points += ((Math.abs(this.layers[i][h].weights[0][k])*this.layers[i+1][h].points)+Math.abs(this.layers[i][h].weights[1][k]))
                }
            }
        }
    }
    resetRating(){
        for(let i = 1;i<3;i++){
            for(let k = 0; k <this.layers[i].length;k++){this.layers[i][k].points=0}
        }
    }
    mutate(){
        let ranNum = Math.round(Math.random()*2)
        let ranNum2 = Math.round(Math.random()*(this.layers[ranNum].length-1))
        this.layers[ranNum][ranNum2].mutate()

    }
    clearInputs(){
        for(let i = 0; i <4;i++){
            for(let k = 0; k <this.layers[i].length;k++){this.layers[i][k].input=0}
        }
    }
    runNet(input){
        this.clearInputs()
        for(let i =0; i < 4;i++){this.layers[0][i].input = input[i]}
        for(let i = 0;i<3;i++){
            this.processCurrentLayer(i)
            this.inputToNextLayer(i)
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
    processCurrentLayer(currentLayer){
        for(let i = 0;i<this.layers[currentLayer].length;i++){this.layers[currentLayer][i].process()}
    }
    inputToNextLayer(currentLayer){
        for(let i = 0;i<this.layers[currentLayer].length;i++){
            for(let k = 0; k < this.layers[currentLayer][i].outputs.length;k++){
                (this.layers[currentLayer+1][k]).input += this.layers[currentLayer][i].outputs[k]
            }
        }
    }
}

