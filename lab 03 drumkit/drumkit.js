'use strict'
const sounds =document.querySelectorAll('.sound');
const recordbtn =document.querySelector('.record-btn');
const stopbtn=document.querySelector('.stop-btn');
const playbtn =document.querySelector('.play-btn');
const tracksbtn =document.querySelectorAll('.track-btn')
let recordingTime;
let songContainer;
let trackContainer;
let trackCheck=false;
const keyMap =[...sounds].reduce((map,key)=>{
map[key.dataset.note]=key
return map
},{})

recordbtn.addEventListener('click',recording);
stopbtn.addEventListener('click',saveSongs);
playbtn.addEventListener('click',playSong);
function recording(){
  if(trackCheck===true){
 recordbtn.classList.toggle('active');
  
  if(isRecordng()){
    startRecording()
  }else 
  stopRecording();
}}
function isRecordng(){
  return recordbtn !=null&& recordbtn.classList.contains('active');
}
function startRecording(){
  
  recordingTime=Date.now()
  trackContainer=[]
  songContainer =[]
  playbtn.classList.remove('show');
  stopbtn.classList.remove('show');
};
function stopRecording(){
  // playSong()
  playbtn.classList.add('show');
  stopbtn.classList.add('show');
}
function playSong(){
  if(songContainer.length===0) return
  playbtn.classList.toggle('active');
  songContainer.forEach(note=>{
    setTimeout(()=>{
      playNote(keyMap[note.key])
    },note.startTime)
  })
  //todo:active cllas
 
}

/////////////////////seting keys and sound///////////////
const keys={
  sound:["q","w","e","r","t","y","u","i","o",]
}
//if index != -1 play sound at position qwww
document.addEventListener('keydown',e=>{
  if(e.repeat) return
 const key=e.key
 const keyIndex=keys.sound.indexOf(key)
 if(keyIndex>-1)playNote(sounds[keyIndex]);
});
// play sound for each element you click
sounds.forEach(sound=>{
  sound.addEventListener('click',()=>playNote(sound));
});
//playing sound
function playNote(sound){
  if(isRecordng()) recordNote(sound.dataset.note)
  const noteAudio =document.getElementById(sound.dataset.note);
  noteAudio.currentTime=0;
  noteAudio.play();
  sound.classList.add('active');
  noteAudio.addEventListener('ended',()=>{
    sound.classList.remove('active');
  })
}
function recordNote(note){
  if(trackCheck===true){
  songContainer.push({
    key:note,
    startTime:Date.now()- recordingTime,
  })};
}//////////////////////////////////
tracksbtn.forEach(track => {
  track.addEventListener('click',()=>activeTrack(track))
});
function activeTrack(track){
  for(let i=0;i<tracksbtn.length;i++){
    tracksbtn[i].dataset.note=`trackbtn${i}`
  }
  trackCheck=true;
  track.classList.toggle('activeGreen');
  if(stopbtn!=null)saveSongs(track.dataset.note)
  
}
function saveSongs(track){
 if(trackCheck===true){
  trackContainer.push({
    trak:track,
    songs:songContainer});
  console.log(trackContainer);
 }};