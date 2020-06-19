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

let cuttingDiet = (weight,sexe,nature) =>{
    let proteine = null;
    let carbs = null;
    let fats = null;
    if(sexe == 1){
        carbs = 4*weight;
        fats = 0.5*weight;

        if(nature ==6) proteine = 3.5*weight;
        else proteine = 3*weight;

        return [
            [proteine,carbs,fats],
            [proteine,weight*5.5,fats],
            [proteine,carbs,0]
        ];
    }
    else if(sexe ==2){
        proteine = 2.5*weight;
        carbs = 2*weight;
        fats = 0.5*weight;

        return [
            [proteine,carbs,fats],
            [proteine,weight*3,fats],
            [proteine,carbs,0]
        ];
    }
}
let weightlossDiet = (weight,sexe) =>{
    let proteine = null;
    let carbs = null;
    let fats = null;
    if(sexe == 1){
        proteine = 1.5*weight;
        carbs = 2.5*weight;
        fats = 0.5*weight;

        return [
            [proteine,carbs,fats],
            [proteine,weight*4,fats],
            [proteine,carbs,0]
        ];
    }
    else if(sexe ==2){
        proteine = 1*weight;
        carbs = 1.5*weight;
        fats = 0.5*weight;

        return [
            [proteine,carbs,fats],
            [proteine,weight*2.5,fats],
            [proteine,carbs,0]
        ];
    }
}

let bulkingDiet = (weight,sexe,nature,metabolism) =>{
    let proteine = null;
    let carbs = null;
    let fats = null;
    if(sexe == 1){
        carbs = 5.5*weight;
        fats = 1.5*weight;
        if(nature ==6) proteine = 3.5*weight;
        else proteine = 3*weight;

        if(metabolism == 9){
            return [
                [proteine,carbs,fats],
                [proteine,weight*4,fats]
            ]
        }else if(metabolism == 8){
            return [
                [proteine,carbs,fats],
                [proteine,weight*2.5,0],
            ];
        }
    }
    else if(sexe ==2){
        proteine = 2.2*weight;
        carbs = 4*weight;
        fats = 0.5*weight;

        if(metabolism == 9){
            return [
                [proteine,2*weight,fats],
                [proteine,1.5*weight,fats]
            ]
        }else if(metabolism == 8){
            return [
                [proteine,carbs,fats],
                [proteine,weight,0]
            ];
            
        }
    }
}

module.exports = {
    bulkingDiet : bulkingDiet,
    weightlossDiet: weightlossDiet,
    cuttingDiet: cuttingDiet
}