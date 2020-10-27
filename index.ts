class RGB {
    R:number;
    G:number;
    B:number;

    constructor(initialR:number,initialG:number,initialB:number){
        this.R=initialR;
        this.G=initialG;
        this.B=initialB;
    }
    setNewValues(newR:number,newG:number,newB:number){
        this.R=newR;
        this.G=newG;
        this.B=newB;
    }
    convertFromCMYK(C:number,M:number,Y:number,K:number){
        console.log(C,M,Y,K)
        this.R=255*(1-C)*(1-K);
        this.G=255*(1-M)*(1-K);
        this.B=255*(1-Y)*(1-K)
    }
    updateInputs(){
        Rgbnumbers[0].value=this.R.toFixed(0).toString();
        Rgbsliders[0].value=this.R.toFixed(0).toString();
        Rgbnumbers[1].value=this.G.toFixed(0).toString();
        Rgbsliders[1].value=this.G.toFixed(0).toString();
        Rgbnumbers[2].value=this.B.toFixed(0).toString();
        Rgbsliders[2].value=this.B.toFixed(0).toString();
    }
}
class CMYK {
    C:number;
    M:number;
    Y:number;
    K:number;
    constructor(initialC:number,initialM:number,initialY:number,initialK:number)
    {
        this.C=initialC;
        this.M=initialM;
        this.Y=initialY;
        this.K=initialK;
    }
    setNewValues(newC:number,newM:number,newY:number,newK:number)
    {
        this.C=newC;
        this.M=newM;
        this.Y=newY;
        this.K=newK;
    }
    convertFromRGB(R:number,G:number,B:number){
        console.log(R,G,B)
        let k =1-Math.max(R,G,B);
        console.log(k)
        let c:number,m:number,y:number;
        if(k!==1){c =(1-R-k)/(1-k);
            m = (1-G-k)/(1-k);
            y = (1-B-k)/(1-k);
            this.setNewValues(c,m,y,k)}
        else {
            c =(1-R-k);
            m = (1-G-k);
            y = (1-B-k);
            this.setNewValues(c,m,y,k)
        }
        
        
    }
    updateInputs(){
        
        Cmyksliders[0].value=(this.C*100).toFixed(0).toString();
        Cmyksliders[1].value=(this.M*100).toFixed(0).toString();
        Cmyksliders[2].value=(this.Y*100).toFixed(0).toString();
        Cmyksliders[3].value=(this.K*100).toFixed(0).toString();
        Cmyknumbers[0].value=(this.C*100).toFixed(0).toString();
        Cmyknumbers[1].value=(this.M*100).toFixed(0).toString();
        Cmyknumbers[2].value=(this.Y*100).toFixed(0).toString();
        Cmyknumbers[3].value=(this.K*100).toFixed(0).toString();
    }
}
const RGBObject = new RGB(0,0,0);
const CMYKObject = new CMYK(0,0,0,1);
const canvas:HTMLCanvasElement = document.querySelector('#color') as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvas.width,canvas.height);
const Rgbsliders = document.querySelectorAll('.RGBslider') as NodeListOf<HTMLInputElement>;
const Rgbnumbers = document.querySelectorAll('.RGBnumber') as NodeListOf<HTMLInputElement>;
const Cmyksliders = document.querySelectorAll('.CMYKslider') as NodeListOf<HTMLInputElement>;
const Cmyknumbers = document.querySelectorAll('.CMYKnumber') as NodeListOf<HTMLInputElement>;
function changeRGBValue(this : HTMLInputElement){
    let index:string=this.getAttribute("index") as string;
    let value:number=+this.value;
    Rgbnumbers[+index].value=value.toString();
    Rgbsliders[+index].value=value.toString();
    RGBObject.setNewValues(+Rgbsliders[0].value,+Rgbsliders[1].value,+Rgbsliders[2].value)
    CMYKObject.convertFromRGB(RGBObject.R/255,RGBObject.G/255,RGBObject.B/255);
    CMYKObject.updateInputs();
    paintCanvas();
    
}

function changeCMYKValue(this : HTMLInputElement){
    let index:string=this.getAttribute("index") as string;
    let value:number=+this.value;
    Cmyksliders[+index].value=value.toString();
    Cmyknumbers[+index].value=value.toString();
    CMYKObject.setNewValues(+Cmyksliders[0].value/100,+Cmyksliders[1].value/100,+Cmyksliders[2].value/100,+Cmyksliders[3].value/100)
    RGBObject.convertFromCMYK(CMYKObject.C,CMYKObject.M,CMYKObject.Y,CMYKObject.K);
    RGBObject.updateInputs();
    paintCanvas();
    
}


const paintCanvas=()=>{
    ctx.fillStyle = `rgb(${RGBObject.R},${RGBObject.G},${RGBObject.B})`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
Rgbsliders.forEach((elem,index)=>{
    elem.addEventListener("input",changeRGBValue)
    elem.setAttribute("index",index.toString())
})
Rgbnumbers.forEach((elem,index)=>{
    elem.addEventListener("change",changeRGBValue)
    elem.setAttribute("index",index.toString())
})
Cmyknumbers.forEach((elem,index)=>{
    elem.addEventListener("change",changeCMYKValue)
    elem.setAttribute("index",index.toString())
})
Cmyksliders.forEach((elem,index)=>{ 
    elem.addEventListener("input",changeCMYKValue)
    elem.setAttribute("index",index.toString())
})