const sounds = [
    {key: 'Q', sound: new Audio('./sounds/boom.wav')},
    {key: 'W', sound: new Audio('./sounds/clap.wav')},
    {key: 'E', sound: new Audio('./sounds/hihat.wav')},
    {key: 'A', sound: new Audio('./sounds/kick.wav')},
    {key: 'S', sound: new Audio('./sounds/openhat.wav')},
    {key: 'D', sound: new Audio('./sounds/ride.wav')},
    {key: 'Z', sound: new Audio('./sounds/snare.wav')},
    {key: 'X', sound: new Audio('./sounds/tink.wav')},
    {key: 'C', sound: new Audio('./sounds/tom.wav')}
  ];
  document.addEventListener('keydown', playSound);
  function playSound(e) {
  const target = e.target;
  const key = e.key.toUpperCase() || target.innerText;
  const sound = sounds.find(sound => sound.key === key);
  if (!sound) return;
  sound.sound.currentTime = 0;
  sound.sound.play();
}

//Recorder1

const recordBtn = document.querySelector('#record');
const stopBtn = document.querySelector('#stop');
const playBtn = document.querySelector('#play');
let recordedChunks = [];
let mediaRecorder;
let audioBlob;

recordBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
playBtn.addEventListener('click', playRecording);


//     navigator.mediaDevices.getUserMedia({audio: true})
//   .then(stream => {
//     console.log("Got audio stream", stream);
//     startRecording(stream);
//   })
//   .catch(err => {
//     console.error("Failed to get audio stream", err);
//   });

function startRecording() {
  recordedChunks = [];
  const options = {mimeType: 'audio/webm'};
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices supported..')

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.start();
  mediaRecorder.addEventListener('dataavailable', (e) => {
    recordedChunks.push(e.data);
  })})};
    }

function stopRecording() {
    mediaRecorder.stop();
    if (recordedChunks.length > 0) {
      audioBlob = new Blob(recordedChunks, {'type': 'audio/ogg; codecs=opus'});
    } else {
      console.error("No audio chunks recorded");
    }
  }

function playRecording() {
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}