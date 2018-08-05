var Window;
const {ipcMain} = require('electron');
var Camera = require('./camera.js');


exports.init = function(item){
  Window = item;
  Camera.init(Window);
}

//private functions
function arm(){
  //will check if all necesary devices are connected and will then arm
  //the system to capture a video
  if(Camera.arm(false) == 'wrongMode'){
    Window.webContents.send('displayForceArm', true);
  };
}

function deArm(){
  //will take teh system out of armed modeChanged
  Camera.deArm();
  Window.webContents.send('armed', false);
}

function fire(){
  Camera.startRec(5000, true);

}




//events handlers
Camera.events.on('armed', function(){
  Window.webContents.send('armed', true);
})

//gui events

ipcMain.on('arm', function(event){
  arm();
})

ipcMain.on('fire', function(event){
  fire();
})

ipcMain.on('cancelFire', function(event){
  deArm();
})

ipcMain.on('forceArm', function(event, value){
  Window.webContents.send('displayForceArm', false);
  if(value){
    Camera.arm(true);
  }
})
