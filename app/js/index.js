const {ipcRenderer} = require('electron');


//local functions
function closeSettingsPanes(){
  var panes = document.getElementsByClassName('settings_pane');
  for(var i=0; i<panes.length; i++){
    panes[i].style.display = 'none'
  }
}



ipcRenderer.on('cameraConnected', function(event, value){
  if(value){
    document.getElementById("no_camera_pane").style.display = 'none';
  }
  else{
    document.getElementById("no_camera_pane").style.display = 'block';
    document.getElementById("camera_status_display").style.backgroundColor = 'red';
  }
})

ipcRenderer.on('cameraState', function(event, value){
  switch (value) {
    case 'busy':
      document.getElementById("camera_status_display").style.backgroundColor = 'yellow';
      break;
    case 'ready':
      document.getElementById("camera_status_display").style.backgroundColor = 'green';
      break;
  }
})

ipcRenderer.on('armed', function(event, value){
  if(value){
    document.getElementById("fire_button").style.display = 'block';
    document.getElementById("cancel_fire_button").style.display = 'block';
  }
  else{
    document.getElementById("fire_button").style.display = 'none';
    document.getElementById("cancel_fire_button").style.display = 'none';
  }
})

ipcRenderer.on('displayForceArm', function(event, value){
  if(value){
    document.getElementById("force_arm_pane").style.display = 'block';
  }
  else {
    document.getElementById("force_arm_pane").style.display = 'none';
  }
})

ipcRenderer.on('recording', function(event, value){
  if(value){
    document.getElementById("recordingLight").style.display = 'block';
  }
  else {
    document.getElementById("recordingLight").style.display = 'none';
  }
})


//Alert Page
ipcRenderer.on('alert', function(event, value){
  document.getElementById('alert_message').innerHTML = value;
  document.getElementById('alert_pane').style.display = 'block';
})

//Pivot Page
ipcRenderer.on('pivotSetings', function(event, value){
  document.getElementById('pivot_pane').style.display = 'block';
})

ipcRenderer.on('updatePivotIP', function(event, value){
  document.getElementById('IP_pivot_0').value = value[0];
  document.getElementById('IP_pivot_1').value = value[1];
  document.getElementById('IP_pivot_2').value = value[2];
  document.getElementById('IP_pivot_3').value = value[3];
})

ipcRenderer.on('updatePivotBypass', function(event, value){
  document.getElementById('pivot_overide_check').checked = value;
})

//------------------------------------------------------------------------
//Mouse Clicks
document.getElementById("arm_button").onmousedown = function(){
  ipcRenderer.send('arm');
}

document.getElementById("fire_button").onmousedown = function(){
  ipcRenderer.send('fire');
}

document.getElementById("cancel_fire_button").onmousedown = function(){
  ipcRenderer.send('cancelFire');
}

document.getElementById("force_arm_yes").onmousedown = function(){
  ipcRenderer.send('forceArm', true);
}

document.getElementById("force_arm_no").onmousedown = function(){
  ipcRenderer.send('forceArm', false);
}

ipcRenderer.on('pivotArmConnection', function(event, value){
  if (value){
    document.getElementById("pivot_status_display").style.backgroundColor = 'green';
  }
  else {
    document.getElementById("pivot_status_display").style.backgroundColor = 'red';
  }
})

// Alert Page
document.getElementById("alert_button").onmousedown = function(){
  document.getElementById('alert_pane').style.display = 'none';
}

// Pivot Settings Page
document.getElementById("pivot_status").onmousedown = function(){
  ipcRenderer.send('pivotSettingsOpen');
  closeSettingsPanes();
  document.getElementById('pivot_pane').style.display = 'block';
}

document.getElementById("pivot_close_button").onclick = function(){
  document.getElementById('pivot_pane').style.display = 'none';
}

document.getElementById("pivot_IP_button").onclick = function(){
  var i;
  var input;
  var validInput = true;
  var ip = [0, 0, 0, 0];
  for(i=0; i<4; i++){
    input = parseInt(document.getElementById('IP_pivot_'+i).value);
    if(input>=0 & input<256){
      ip[i] = input;
    }
    else{
      document.getElementById('IP_pivot_'+i).value = '';
      validInput = false;
    }
  }

  if(validInput){
    ipcRenderer.send('setPivotIP', ip);
  }
}

document.getElementById("pivot_left_button").onclick = function(){
  ipcRenderer.send('movePivot', 'left');
}

document.getElementById("pivot_toggle_button").onclick = function(){
  ipcRenderer.send('movePivot');
}

document.getElementById("pivot_right_button").onclick = function(){
  ipcRenderer.send('movePivot', 'right');
}

document.getElementById("pivot_overide_check").onclick = function(){
  ipcRenderer.send('setPivotBypass', document.getElementById('pivot_overide_check').checked);
}


// Pivot Settings Page
document.getElementById("server_status").onclick = function(){
  ipcRenderer.send('pivotSettingsOpen');
  closeSettingsPanes();
  // document.getElementById('pivot_pane').style.display = 'block';
}
