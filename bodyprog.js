/*1:'برنامج مخصص للرجال',
  2:'برنامج مخصص للنساء',
  3:'تنشيف',
  4:'تضخيم',
  5:'تخسيس',
  6:'طبيعي',
  7:'غير طبيعي',
  8:'سرعة أيض سريعة',
  9:'سرعة أيض متوسطة' */
//arabic const
const PROTEINE = 'دهون';
const CARBS = 'كارب';
const FATS = 'دهون'

var bodyProg = (weight,sexe,goal,metabolism,trainNature) =>{
    let proteine = null;
    let carbs = null;
    let fats = null;
    console.log(sexe==1);
    if(sexe == 1){ //male case
        if(trainNature == 6){//natural case
            proteine = 3.5*weight;
        }
        else if(trainNature == 7){//not natural case
            proteine = 3*weight;
        }
    
        if(goal == 3){ //cutting case
            carbs = 4*weight;
            fats = 0.5*weight;
         
            return [
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الأول من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,weight*5.5],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الثاني من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,0]        
            ];
        }
        else if(goal == 5){ //weightloss
            carbs = weight*1.5;
            proteine = weight*2.5;
            fats = weight*0.5;

            return [
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الأول من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,weight*4],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الثاني من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,0]        
            ];
        }
        else if(goal == 4){ //bulking case
            carbs = 5.5*weight;
            fats = 1.5*weight;
            if(metabolism == 9){//metabolism normal
                return [
                    ['4','أيام تدريب تتناول فيهم'],
                    [PROTEINE,proteine],
                    [CARBS,carbs],
                    [FATS,fats],
                    ['3','أيام راحة تتناول فيهم'],
                    [PROTEINE,proteine],
                    [CARBS,4*weight],
                    [FATS,fats],
                ];
            }else{ //metabolism fast
                return [
                    [PROTEINE,proteine],
                    [CARBS,carbs],
                    [FATS,fats],
                    ['في الأسبوع السادس'],
                    [PROTEINE,proteine],
                    [CARBS,weight*2.5],
                    [FATS,0]     
                ];
            }
        }
    }
    else if(sexe == 2){
        fats = weight*0.5;
        if(goal == 3){ //cutting case
            carbs = 2*weight;
            proteine = 2.5*weight;
            return [
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الأول من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,weight*3],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الثاني من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,0]        
            ];
        }else if(goal == 5){ //weightloss
            carbs = weight*1.5;
            proteine = weight*1;

            return [
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,fats],
                ['في اليوم الأول من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,weight*2.5],
                [FATS,fats,'في الوجبة الأولى فقط'],
                ['في اليوم الثاني من الأسبوع السادس'],
                [PROTEINE,proteine],
                [CARBS,carbs],
                [FATS,0]        
            ];
        }else if(goal == 4){ //bulking case
            carbs = 4*weight;
            proteine = 2.2*weight;
            if(metabolism == 9){//metabolism normal
                return [
                    ['4','أيام تدريب تتناول فيهم'],
                    [PROTEINE,proteine],
                    [CARBS,2*weight],
                    [FATS,fats],
                    ['3','أيام راحة تتناول فيهم'],
                    [PROTEINE,proteine],
                    [CARBS,1.5*weight],
                    [FATS,fats],
                ];
            }else{ //metabolism fast
                return [
                    [PROTEINE,proteine],
                    [CARBS,carbs],
                    [FATS,fats],
                    ['في الأسبوع السادس'],
                    [PROTEINE,proteine],
                    [CARBS,weight*1],
                    [FATS,0]     
                ];
            }
        }
    }
}

module.exports = {
    bodyDiet : bodyProg
}