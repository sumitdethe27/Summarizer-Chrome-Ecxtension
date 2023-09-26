// THIS PROGRESS BAR IS USED BECAUSE THE OUTPUT OF GPT-3.5 MODEL IS SLOW 
// AND HENCE , THE PROGRESS BAR HELPS TO RETAIN THE USER ATTENTION

// progress bar 
function progressBar() {
    const bar = document.querySelector('.loading-bar');
    const barPercent = document.querySelector('.bar');
    
    let i = 0;
    let time = 1;
    
    function updateProgressBar() {
        bar.style.width = `${i}px`;
        barPercent.textContent = `${time-1}%`;
    }
    
    function animate() {
        if (i < 400) {
            i += 4; // Adjust the increment to control the animation speed
            time = Math.floor((i / 400) * 100);
            updateProgressBar();
            if(time<=30){

                setTimeout(animate, 10+(time)); // Adjust the delay for smoother animation
            }
            else if(time>30&&time<=80){ 
                setTimeout(animate, 10+(time*2)); // Adjust the delay for smoother animation

            }
            else if(time>80&&time<=90){
                setTimeout(animate, 800); // Adjust the delay for smoother animation

            }else{
                setTimeout(animate, 1000); // Adjust the delay for smoother animation

            }
        }
    }
    
    animate();
}





