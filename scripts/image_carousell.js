document.addEventListener("DOMContentLoaded", function () { 
    const img_carousell = document.getElementById('image-carousell');
    const display_img = document.getElementById('selected-img');

    let img_arr = JSON.parse(window.localStorage.getItem('item-listing-data')).img_carou;

    // get fwd and back buttons for carousell
    const fwd_btn = document.getElementById('carou-fwd');
    const bck_btn = document.getElementById('carou-bck');

    // event listeners to change arr order
    fwd_btn.addEventListener('click', function(e) {
        e.preventDefault();
        img_arr.push(img_arr.shift()); //gpt code
        
        set_images()
    });

    bck_btn.addEventListener('click', function(e) {
        e.preventDefault();
        let start = img_arr[img_arr.length-1];
        let back = img_arr.slice(0,-1);
        img_arr = [start, ...back];
        set_images()

    });


    //inject img tags into html (so you can vary depending on screen size or something)
    const CAROU_IMG_AMT = 5
    for (let i = 0; i < CAROU_IMG_AMT; i++ ) {
        const img = document.createElement('img');
        img.className = 'slide';
        img.id = i;

        img_carousell.appendChild(img);

    }
    
    
    function set_images() {
        display_img.src = img_arr[0];
        // dont inject and set in same loop cause this loop is called multiple times (do i need to cmment this)
        for (let i = 0; i < CAROU_IMG_AMT; i++) {
            const img = document.getElementById(i);
            img.src = img_arr[i];

        }

        
    }

    set_images()

})