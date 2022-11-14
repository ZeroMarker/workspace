const video = document.getElementById('camera');
// video.setAttribute()
const captureButton = document.getElementById('capture-image');
const image = document.getElementById('image');

captureButton.addEventListener('click', () => {
    const canvas = document.createElement("canvas");
    // scale the canvas accordingly
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // draw the video at that frame
    canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);
    // convert it to a usable data URL
    const dataURL = canvas.toDataURL();
    image.src = dataURL;
    window.electronAPI.sendImage(dataURL); 
    new Notification('Image Captured', {
        body: 'Image has sucessfully captured from live video.',
    });
})

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    // console.log(stream);
    video.srcObject = stream;
})