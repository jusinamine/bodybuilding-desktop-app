const { app, BrowserWindow, ipcMain} = require('electron');
const bodyDiet = require('./bodyprog');
let mainWindow;
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

function createWindow () {
  // Cree la fenetre du navigateur.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // et charger le fichier index.html de l'application.
  win.loadFile('template/index.html')

  return win
}

app.whenReady().then(()=>{
  mainWindow = createWindow()
});

// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  createWindow()

})

ipcMain.on('requestHandler', (event, data) => {

  if(data.type === 'personProgram'){
  
    let diet;
    let sexe = data.data.program[0];
    let metabolism = data.data.program[3];

    mainWindow.webContents.executeJavaScript(`
        document.querySelectorAll(".print-bx")[0].classList.remove('display-none');
        document.querySelectorAll(".main-bx")[0].classList.add('display-none');
   `);
    if(data.data.program[1] == 3){ //if user choosed the cutting diet
      mainWindow.webContents.executeJavaScript(`
        document.querySelectorAll("#cutting")[0].classList.remove('display-none');
        document.querySelectorAll("#bulking")[0].classList.add('display-none');
        document.querySelectorAll("#weight-loss")[0].classList.add('display-none');
      `);
      diet = bodyDiet.cuttingDiet(data.data.weight,sexe,data.data.program[2]);
      
      //change diet values in mainwindow
      mainWindow.webContents.executeJavaScript(`
      items = document.querySelectorAll('#cutting .row .col .info');
      for(i=0;i+2<items.length;i+=3){
          if(i+2<18){
              if(i==0){
                  items[i+2].children[1].innerText = "${diet[0][2]}";
              }
              else{
                  items[i+2].children[1].innerText = "0";
              }
              items[i].children[1].innerText = "${(diet[0][0]/6).toFixed(2)}";
              items[i+1].children[1].innerText = "${(diet[0][1]/6).toFixed(2)}";
          }
          else if(i>=18 && i<36){
              if(i==18){
                  items[i+2].children[1].innerText = "${diet[1][2]}"
              }
              else{
                  items[i+2].children[1].innerText = "0"
              }
              items[i].children[1].innerText = "${(diet[1][0]/6).toFixed(2)}"
              items[i+1].children[1].innerText = "${(diet[1][1]/6).toFixed(2)}"
          }
          else if(i>=36 && i<54){
              items[i+2].children[1].innerText = "0"
              items[i].children[1].innerText = "${(diet[2][0]/6).toFixed(2)}"
              items[i+1].children[1].innerText = "${(diet[2][1]/6).toFixed(2)}"
          }
      }
     `);
      
    }
    if(data.data.program[1] == 5){ //if user choosed the weightloss diet

      mainWindow.webContents.executeJavaScript(`
        document.querySelectorAll("#cutting")[0].classList.add('display-none');
        document.querySelectorAll("#bulking")[0].classList.add('display-none');
        document.querySelectorAll("#weight-loss")[0].classList.remove('display-none');
      `);
      diet = bodyDiet.weightlossDiet(data.data.weight,sexe);
      
      mainWindow.webContents.executeJavaScript(`
      items = document.querySelectorAll('#weight-loss .row .col .info');
      for(i=0;i+2<items.length;i+=3){
            if(i+2<9){
                if(i==0) items[i+2].children[1].innerText = "${diet[0][2]}";
                else items[i+2].children[1].innerText = "0";

                items[i].children[1].innerText = "${(diet[0][0]/3).toFixed(2)}";
                items[i+1].children[1].innerText = "${(diet[0][1]/3).toFixed(2)}";
            }
            if(i+2>=18 && i+2<27){
                
                if(i==18) items[i+2].children[1].innerText = "${diet[1][2]}";
                else items[i+2].children[1].innerText = "0";

                items[i].children[1].innerText = "${(diet[1][1]/3).toFixed(2)}";
                items[i+1].children[1].innerText = "${(diet[1][2]/3).toFixed(2)}";
            }
            if(i+2>=36 && i+2<45){
                items[i].children[1].innerText = "${(diet[2][0]/3).toFixed(2)}";
                items[i+1].children[1].innerText = "${(diet[2][1]/3).toFixed(2)}";
                items[i+2].children[1].innerText = "0";
            }
        }
      `);
    }
    if(data.data.program[1] == 4){ //if user choosed bulking diet
      mainWindow.webContents.executeJavaScript(`
        document.querySelectorAll("#cutting")[0].classList.add('display-none');
        document.querySelectorAll("#bulking")[0].classList.remove('display-none');
        document.querySelectorAll("#weight-loss")[0].classList.add('display-none');
      `);
      diet = bodyDiet.bulkingDiet(data.data.weight,sexe,data.data.program[2],metabolism);

      if(metabolism == 8){ //metabolism fast
        mainWindow.webContents.executeJavaScript(`
        document.querySelectorAll("#bulking .row")[0].classList.remove('display-none');
        document.querySelectorAll("#bulking .row")[1].classList.remove('display-none');
        document.querySelectorAll("#bulking .row")[2].classList.add('display-none');
        document.querySelectorAll("#bulking .row")[3].classList.add('display-none');
        `);
        mainWindow.webContents.executeJavaScript(`
        items = document.querySelectorAll('#bulking .row .col .info');
        for(i=0;i+2<items.length;i+=3){
          if(i+2<18){
            items[i].children[1].innerText = "${(diet[0][0]/6).toFixed(2)}";
            items[i+1].children[1].innerText = "${(diet[0][1]/6).toFixed(2)}";
            items[i+2].children[1].innerText = "${(diet[0][2]/6).toFixed(2)}";
          }else if(i+2>=18 && i<36){
            items[i].children[1].innerText = "${(diet[1][0]/6).toFixed(2)}";
            items[i+1].children[1].innerText = "${(diet[1][1]/6).toFixed(2)}";
            items[i+2].children[1].innerText = "0";
          }
        }
        `);
      }
      else if(metabolism == 9){ //metabolism avg
        diet = bodyDiet.bulkingDiet(data.data.weight,sexe,data.data.program[2],metabolism);
        mainWindow.webContents.executeJavaScript(`
        document.querySelectorAll("#bulking .row")[0].classList.add('display-none');
        document.querySelectorAll("#bulking .row")[1].classList.add('display-none');
        document.querySelectorAll("#bulking .row")[2].classList.remove('display-none');
        document.querySelectorAll("#bulking .row")[3].classList.remove('display-none');
        `);
        mainWindow.webContents.executeJavaScript(`
        items = document.querySelectorAll('#bulking .row .col .info');
        for(i=18;i+2<items.length;i+=3){
          if(i+2<54){
            items[i].children[1].innerText = "${(diet[0][0]/6).toFixed(2)}";
            items[i+1].children[1].innerText = "${(diet[0][1]/6).toFixed(2)}";
            items[i+2].children[1].innerText = "${(diet[0][2]/6).toFixed(2)}";
          }else if(i+2>=54 && i+2<72){
            items[i].children[1].innerText = "${(diet[1][0]/6).toFixed(2)}";
            items[i+1].children[1].innerText = "${(diet[1][1]/6).toFixed(2)}";
            items[i+2].children[1].innerText = "${(diet[1][2]/6).toFixed(2)}";
          }
        }
        `);
      }
    }
    
  }
})