
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
        personInfo.age = parseInt(document.getElementById("age-p").value); 
        personInfo.height = parseInt(document.getElementById("height-p").value);
        personInfo.weight = parseInt(document.getElementById("weight-p").value);

        for(var i=0; i<choiceSelected.length;i++)   personInfo.program.push(choiceSelected.item(i).innerTex);
        console.log(personInfo);
        
    }
    
});
