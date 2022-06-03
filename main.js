class AnswerButton {

    constructor(elementID){
        this.element = document.getElementById(elementID);
        this.visible = false;
        this.active = true;
    }

    show(){
        this.visible = true;
        this.element.style.display = "block";
    }

    hide(){
        this.visible = false;
        this.element.style.display = "none";
    }
}

const yesButton = new AnswerButton("yes");
const noButton = new AnswerButton("no");
const thirdButton = new AnswerButton("third");
let currentQuestion = "intro";

let questionBox = new TextBox("question",true,window.innerWidth-10,400);

yesButton.show();
noButton.show();
thirdButton.show();



let hideButtons = () => {
yesButton.element.style.animationName = "none";
noButton.element.style.animationName = "none";
thirdButton.element.style.animationName = "none";
yesButton.element.style.animationName = "hideButtons";
noButton.element.style.animationName = "hideButtons";
thirdButton.element.style.animationName = "hideButtons";
setTimeout(()=>{
    yesButton.element.style.display = "none";
    noButton.element.style.display = "none";
    thirdButton.element.style.display = "none";
},750)
}

let showButtons = () => {
    yesButton.element.style.display = "none";
    noButton.element.style.display = "none";
    thirdButton.element.style.display = "none";
    yesButton.element.style.animationName = "none";
    noButton.element.style.animationName = "none";
    
    yesButton.element.style.display = "block";
    yesButton.element.style.animationName = "showButtons";
    noButton.element.style.display = "block";
    noButton.element.style.animationName = "showButtons";
    if (thirdButton.visible === true){
    thirdButton.element.style.animationName = "none";
    thirdButton.element.style.display = "block";
    thirdButton.element.style.animationName = "showButtons";
    }
}

let finalAnswer = (answer,list) => {
    questionBox.letterBuffer = [];
    questionBox.clearAll();
    questionBox.renderText(answer,"undertaleMono",40,20,200,200,5,defaultFormatTextList,defaultLetterAnim,true);
    if (list.length > 1){
        let text = list.join("  ");
        questionBox.renderText(text,"undertaleMono",25,10,200,350,5,defaultFormatTextList,defaultLetterAnim,true); 
    }
}

let askQuestion = (questionID,questionText,yesText,noText,thirdText,list) => {
    currentQuestion = questionID;
    questionBox.letterBuffer = [];
    questionBox.clearAll();
    questionBox.renderText(questionText,"undertaleMono",40,20,200,200,5,defaultFormatTextList,defaultLetterAnim,true);

    if (list.length > 1){
        let text = list.join("  ");
        questionBox.renderText(text,"undertaleMono",25,10,200,350,5,defaultFormatTextList,defaultLetterAnim,true); 
    }

    if (thirdText === ""){
        thirdButton.hide();
    } else {
        thirdButton.show();
    }

    yesButton.element.innerHTML = yesText;
    noButton.element.innerHTML = noText;
    thirdButton.element.innerHTML = thirdText;

    setTimeout(()=>{
        showButtons();
    },100)
}


let clickedYes = () => {
hideButtons();
setTimeout(()=>{
    if (currentQuestion === "list1algeo"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "AP Calculus I AB",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "list1al"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "AP Calculus I AB",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "algebra2"){
        askQuestion("list1al","Here's a list of courses. Have you taken any of them?","Yes","No","",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "intro"){
        askQuestion("algebra2","Have you taken Algebra 2?","Yes","No","",[]);
    }
    
    if (currentQuestion === "algebra2geo"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics",
            "PreCollege Math"
        ])
    }

    if (currentQuestion === "geometry"){
        askQuestion("algebra2geo","Have you taken Algebra 2?","Yes","No","",[]);
    }
    
    if (currentQuestion === "list1intro"){
        askQuestion("list2intro","Here's a list of courses. Have you taken any of them?","Yes","No","",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "list3intro"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "AP Calculus I AB",
            "AP Calculus II BC",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "list2intro"){
        askQuestion("list3intro","Here's a list of courses. Have you taken any of them?","Yes","No","",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "AP Calculus I AB",
            "Statistics",
            "AP Statistics"
        ])
    }
    

    
},1100)
}

let clickedNo = () => {
hideButtons();
setTimeout(()=>{
    if (currentQuestion === "list3intro"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "AP Calculus I AB",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "list1al"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "intro"){
        askQuestion("geometry","Have you taken Geometry?","Yes","No","",[]);
    } else
    if (currentQuestion === "geometry"){
        finalAnswer("Geometry is your next math class. Thanks for using this website!",[]);
    }
    if (currentQuestion === "algebra2"){
        finalAnswer("Algebra 2 is your next math class. Thanks for using this website!",[]);
    }
    if (currentQuestion === "algebra2geo"){
        finalAnswer("Algebra 2 is your next math class. Thanks for using this website!",[]);
    }
    if (currentQuestion === "list1algeo"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics"
        ])
    }
    if (currentQuestion === "list1intro"){
        finalAnswer("These are the courses you can currently take. Thanks for using this website!",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics"
        ])
    }
},1100)
}

let clickedThird = () => {
hideButtons();
setTimeout(()=>{
    if (currentQuestion === "intro"){
        askQuestion("list1intro","Here's a list of courses. Have you taken any of them?","Yes","No","",[
            "College Algebra",
            "Trigonometry with Analytic Geometry",
            "Pre-Calculus",
            "Statistics",
            "AP Statistics"
        ])
    }
    
},1100)
}


setTimeout(()=>{
    askQuestion("intro","What is the most recent math course you have taken?","Geometry","Algebra 1","Algebra 2",[]);
},100)







