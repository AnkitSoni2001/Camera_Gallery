let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");

let recordFlag = false;

let recorder;
let chunks = [];  //Media data in chunks

let constrains = {    
    // It is use to create object
    video : true,
    audio : true
}

// navigator -> global, browser information
navigator.mediaDevices.getUserMedia(constrains)
.then((stream) => {
    video.srcObject = stream;  //It shows live stream

    recorder = new MediaRecorder(stream);  //Use to store the recorded video
    //When video start to stream
    recorder.addEventListener("start", (e) =>{
        chunks= [];
    })

    //It store stream(data) in form of chunks
    recorder.addEventListener("dataavailable", (e)=>{
        chunks.push(e.data);
    })

    recorder.addEventListener("stop", (e) =>{
        //Conversion of media chunks data to video
        let blob = new Blob(chunks, {type: "video/mp4"});

        //Creating video link(URL)
        let videoURL = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    }) 
})

recordBtnCont.addEventListener("click", (e) =>{
    if(!recorder) return;

    recordFlag = !recordFlag;

    if(recordFlag){  //Start recording
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();  //calling  starttimer function when recorder start
        
    }
    else{     //Stop recording
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();   //calling stoptimer function when recorder stop
    }
})

//FOR Timer

let timerID;

let timer = document.querySelector(".timer");

function startTimer(){
    let counter = 1;//Represent total second
    timer.style.display = "block";
    function displayTimer() {
        let totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;  // remaining value
        let minutes = Number.parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;  // remaining value
        let seconds = totalSeconds;

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;

        counter++;

    }
    timerID = setInterval(displayTimer, 1000);
}
function stopTimer(){
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}


 