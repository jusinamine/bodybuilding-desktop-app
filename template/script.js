const {ipcRenderer} = require('electron')

const PROGRAM_PARAMS = {
    1:'برنامج مخصص للرجال',
    2:'برنامج مخصص للنساء',
    3:'تنشيف',
    4:'تضخيم',
    5:'تخسيس',
    6:'طبيعي',
    7:'غير طبيعي',
    8:'سرعة أيض سريعة',
    9:'سرعة أيض متوسطة'
};
let choices = document.querySelectorAll('.choice');
let button = document.querySelector('.btn-bx input');


let choicesText = [];
let checkClick = [];
let choiceSelected = null;
var parentChildes = null;
let targetText = null;
var targetClassIndex = null;
var oldClassIndex = null;

choices.forEach(element => {

    choicesText.push(element.innerText);
    checkClick.push(false);

    element.addEventListener('click', event => {

        targetText = event.target.innerText
        targetClassIndex = choicesText.indexOf(targetText);

        if(checkClick[targetClassIndex]){
            choices[targetClassIndex].classList.remove('selected');
            checkClick[targetClassIndex] = false;
        }
        else{
            parentChildes = choices[targetClassIndex].parentElement.children;

            for(var i=0; i < parentChildes.length;i++){
                parentChildes[i].classList.remove('selected');
                oldClassIndex = choicesText.indexOf(parentChildes[i].innerText);
                checkClick[oldClassIndex] = false;
            }
    
            choices[targetClassIndex].classList.add('selected');
            checkClick[targetClassIndex] = true;

        }
    });
});

button.addEventListener('click', (event) =>{
    let personInfo = {"weight":null, "height":null, "age":null, "program":[]};
    choiceSelected = document.getElementsByClassName('selected');

    if(choiceSelected.length < 4){
        console.log("error msg");
        
    }else{
        let choiceText = null;
        let choicesCoded = null;
        personInfo.age = parseInt(document.getElementById("age-p").value); 
        personInfo.height = parseInt(document.getElementById("height-p").value);
        personInfo.weight = parseInt(document.getElementById("weight-p").value);

        for(var i=0; i<choiceSelected.length;i++){
            choiceText = choiceSelected.item(i).innerText
            choicesCoded = Object.keys(PROGRAM_PARAMS).find(key => PROGRAM_PARAMS[key] === choiceText);
            personInfo.program.push(choicesCoded);
            
        }   
        console.log(personInfo.program);
        let data = {"data":personInfo, "type":"personProgram"};
        ipcRenderer.send('requestHandler',data);
    }
    
});


 