'use strict'
const pianoKeys = document.querySelectorAll('.key')
const recordbtn =document.querySelector('.record-btn');
const stopbtn=document.querySelector('.stop-btn');
const playbtn =document.querySelector('.play-btn');
const tracksbtn =document.querySelectorAll('.track-btn')
let recordingTime;
let songContainer;
let trackContainer;
let trackCheck=false;
const keyMap =[...pianoKeys].reduce((map,key)=>{
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

function playSound(newUrl) {
    console.log(newUrl)
    new Audio(newUrl).play()
}
function playSong(){
    if(songContainer.length===0) return
    playbtn.classList.toggle('active');
    songContainer.forEach(note=>{
      setTimeout(()=>{
        playNote(keyMap[note.key])
      },note.startTime)
    })
}
const abcd={
  pianoKeys:["q","w","e","r","t","y","u","i","o",]
}

pianoKeys.forEach((pianoKey, i) => {
    const number = i < 9 ? '0' + (i + 1) : (i + 1)
    const newUrl = 'sounds/key' + number + '.mp3'
    pianoKey.addEventListener('click', () => playSound(newUrl))
})

function saveSongs(track){
    if(trackCheck===true){
     trackContainer.push({
       trak:track,
       songs:songContainer});
     console.log(trackContainer);
    }};
function playSong(){
    if(songContainer.length===0) return
        playbtn.classList.toggle('active');
        songContainer.forEach(note=>{
          setTimeout(()=>{
            playNote(keyMap[note.key])
          },note.startTime)
        })
    }