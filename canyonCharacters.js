document.addEventListener('mousemove', (e) => {
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const anchor = document.getElementById('anchor');
    const body = document.getElementById('theBody');

    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;
    
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    console.log(angleDeg);

    const eyes = document.querySelectorAll('.MelvinLeftEye, .MelvinRightEye, .OldManLeftEye, .OldManRightEye');
    eyes.forEach(eye => {
        const eyeRekt = eye.getBoundingClientRect();
        const eyeCenterX = eyeRekt.left + eyeRekt.width / 2;
        const eyeCenterY = eyeRekt.top + eyeRekt.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        
        let maxOffset;
        
        if (eye.classList.contains('OldManLeftEye') || eye.classList.contains('OldManRightEye')) {
            maxOffset = 3;

        } else {
            maxOffset = 15;        
        }     

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedX = (deltaX / distance) * Math.min(distance, maxOffset);
        const normalizedY = (deltaY / distance) * Math.min(distance, maxOffset);

        eye.style.transform = `translate(${normalizedX}px, ${normalizedY}px)`
        //anchor.style.filter = `hue-rotate(${angleDeg}deg)`
        //body.style.filter = `hue-rotate(${angleDeg}deg)`

    });


})

function angle(cx, cy, ex,ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx); // range (-PI, PI]
    const deg = rad * 180 / Math.PI; // rads to degrees (-180, 180]
    return deg;

}