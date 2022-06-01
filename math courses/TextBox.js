const fonts = [
  new FontFace("undertaleMono", "url(./fonts/determinationmonoweb-webfont.woff)"),
  new FontFace("sans", "url(./fonts/sans-webfont.woff)"),
  new FontFace("vcrMono", "url(./fonts/vcr_osd_mono_1.001-webfont.woff)")
];

const defaultLetterAnim = (item,index) => {

  item.time = item.time - 10;
  
  // item.rPos.y = item.pos.y + 100;


  if(item.time<0){
    item.visible=true
  }

  if(item.visible){
    
    item.canvas.write(item.letter,item.font,item.size,item.rPos.x,item.rPos.y,"lightgrey");
    
  }

  if(item.canvas.letterBuffer[index+1] === undefined&&item.visible){
    setTimeout(() => item.canvas.stopAnim(),1);
  }

}

const decideFormatLetter = (letter,wait) => {
  if (letter==="`"){
    
    return ["`",wait];
    
  } 
  else if (letter==="|"){
    return ["",100];
  }
  else if (letter===" "){
    return [" ",0];
  }
  else {
    return [letter,wait];
  }
  
}

const defaultFormatTextList = (list,wait) => {
  let newList=[];
  let decider;

  for (let i =0; i<list.length; i++){
    
    
    decider = decideFormatLetter(list[i],wait);

    
    
    newList.push([decider[0],decider[1]]);

   
  }
  return newList;
}

//defines a single piece of active animated letter data
//animate must be a function intended to loop on a setInterval
class Letter {

  letter="";
  time=0;
  canvas;
  font="";
  visible=false;

  constructor(letter,x,y,time,canvas,font,size,visible,animate){

    this.pos=
    {
      x:x,
      y:y
    };

    this.rPos=
    {
      x:x,
      y:y
    };
    
    this.data = {};
    this.letter=letter;
    this.time=time;
    this.size=size;
    this.canvas=canvas;
    this.font=font;
    this.visible=visible;
    this.animate=animate;
  

    

  }

}

class TextBox {
  
  
    #canvas = document.createElement("canvas");
    #ctx = this.#canvas.getContext("2d");
  
    constructor (id,append,width,height) {
      
      this.loadFonts(fonts);
      let appender = document.getElementById(id);
      this.#canvas.width = width;
      //this.#canvas.height = 216 + 1000;
      this.#canvas.height = height;
      this.letterBuffer = [];
      this.frame = 0;

      if(append){
      appender.appendChild(this.#canvas);
      }
  
      }

    loadFonts(fonts){

      for(let i=0; i<fonts.length; i++){
        fonts[i].load().then((font)=>{
        
          document.fonts.add(font);
          console.log("Font loaded:");
          console.log(font);
        
         });
      }
    
    }
  
    //draw given text on the screen with font, size, color, at position x,y
    //font must be a FontFace and color must be a valid color
    write(text,font,size,x,y,color) {
        this.#ctx.font = size + "px" + " " + font;
        if(color===undefined){this.#ctx.fillStyle = "white";}
        else{this.#ctx.fillStyle = color;}
        this.#ctx.fillText(text, x,y,1000000000);
    }
  
    //returns the width of a given string of text with given font and size
    hypothesize(text,font,size){
      this.#ctx.font = size + "px" + " " + font;
      return this.#ctx.measureText(text).width;
    }
  
    clearRectangle(y,x){
        this.#ctx.clearRect(x,y,this.#canvas.width,breakLength);
    }
  
    clearAll(){
      this.#ctx.clearRect(0,0,this.#canvas.width,this.#canvas.height);
    }
  
    face(name){
      // let image = document.getElementsByClassName("sprite")[0];
      // image.className = name + " " + "sprite";
      // image.src = ""
      // this.#ctx.drawImage(image,1,1)
    }
  
  
    //draw a line on the box
    //just for fun
    line(x,y,x2,y2,color){
      this.#ctx.strokeStyle=color;
      this.#ctx.beginPath();
      this.#ctx.moveTo(x,y);
      this.#ctx.lineTo(x2,y2);
      this.#ctx.closePath();
      this.#ctx.stroke();
    }
  
    stopAnim(){
      clearInterval(this.curInterval);
    }
    
    startAnim(){
      this.frame=0;
      this.curInterval = setInterval(()=>this.drawLetters(), 10);
    }


    drawLetters(){
      
      this.frame++; 
      this.clearAll();
      if(this.frame%20==0){console.log("Hello!")}

      let list = this.letterBuffer;
      let letter;
      
      for (let i=0; i<list.length; i++){

      letter=list[i];
      
      letter.animate(letter,i);
    
      
      }
      
    }
  
    //sound must be a reference to a sound file - plays when each character appears
    //formatter is your custom markup formatting function, leave empty for default formatting
    //FORMATTER FUNCTION MUST HAVE THIS RETURN VALUE: ["",waitTimeInteger] 
    //text input should only contain "`" where a line break is to occur
    //adds Letter objects to a buffer and animates rendering of them one-by-one
  
    renderText(text,font,size,time,offsetX,offsetY,ySpacing,formatter,animation,center,sound){

      //will be generating our letters and reading any specified data
      let generateLetter = (letter) => {
        //test for data
        if(letter=="█"){
          
        }
        else
        {
          this.letterBuffer.push(new Letter(dialog[i][0],x,y,time,this,font,size,false,animation));
        }
    
      }
      

      this.clearAll();
      
      let dialog=text.split("");

      dialog = this.addBreaks(dialog,font,size,offsetX);

      if(formatter instanceof Function){
        dialog=formatter(dialog,time);
      };
      
      if(center){
        offsetX = this.#canvas.width/2 - this.hypothesize(text,font,size)/2-.5;
      };
      console.log(offsetX);

      let x = 0 + offsetX;
      let y = 0 + offsetY;
      
      console.log(dialog);
      
      for (let i = 0; i<dialog.length; i++){
        
        if(dialog[i][0]!="`"){
        
        this.letterBuffer.push(new Letter(dialog[i][0],x,y,time,this,font,size,false,animation));
        
        time=time+dialog[i][1];

        x += this.hypothesize(dialog[i][0],font,size);
    
        } else {
        y += ySpacing;
        x = 0 + offsetX;
        }
        
      }
      this.startAnim(this.letterBuffer,this,animation);
      
     
    }

    
  
    //line break algorithm
    //adds "`" into a string that contains regular amounts of spaces (normal written sentences)
    //makes sure text contains logically placed line breaks that keep the text from visually exceeding the textBox width
    
    addBreaks(list,font,size,offsetX){
      // console.log(list);
      if (this.hypothesize(list,font,size)>this.#canvas.width){
    
        let currentLength = 0;
        let readThrough = list.join("").split(/(\s+)/);
        let newList = readThrough;
    
        for (let i=0; i<readThrough.length; i++){
    
          currentLength = currentLength + this.hypothesize(readThrough[i],font,size);
    
          //deal with pesky lines
    
          let temp=readThrough[i].split("");
    
          if(temp.includes("|")){
    
    
          for (let j=0; j<temp.length; j++){

            if(temp[j]==="|"){currentLength = currentLength-this.hypothesize("|",font,size)}
    
          }
    
    
    
          //dealt with pesky lines
    
          }
    
          if (readThrough[i].includes("`")){
            currentLength=0;
            
          }
    
          if (readThrough[i].split("")[0]===" " && currentLength + this.hypothesize(readThrough[i+1],font,size)+offsetX>this.#canvas.width){
    
            currentLength=0;
            newList.splice(i,1,"`");
          }
          
    
        }
        
        return newList.join("").split("");
    
        }
        else
        {
        return list;
        }
    }
  
    
  }
