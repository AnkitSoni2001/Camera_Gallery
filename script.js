let video = document.querySelector("video");

let constrains = {    
    // It is use to create object
    video : true,
    audio : true
}

navigator.mediaDevices.getUserMedia(constrains)
.then((stream) => {
    video.srcObject = stream;
})

 