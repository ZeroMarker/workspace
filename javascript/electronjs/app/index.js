const image = document.getElementById('image');

window.electronAPI.getImage((event, data) => {
    image.src = data;
    window.electronAPI.closeWindow2();
})