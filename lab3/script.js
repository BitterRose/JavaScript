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
const display = document.querySelector('.display')

const recordBtn = document.querySelector('#record');
const stopBtn = document.querySelector('#stop');

let mediaRecorder, chunks = [], audioURL = ''

recordBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);


function startRecording() {

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => {
    const options = {mimeType: 'audio/webm;codecs=opus'};
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.start();
    console.log('Recording...')
    mediaRecorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
    })
})}


        

function stopRecording() {

    const audio = document.createElement('audio')
    audio.controls = true

    display.append(audio)
            mediaRecorder.stop();
            const blob = new Blob(chunks)
            chunks = []
            audioURL = window.URL.createObjectURL(blob)
            //document.querySelector('audio').src = audioURL
            audio.src = audioURL
            


                
                //document.querySelector('audio').src = audioURL
            

          }