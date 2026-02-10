import { listing_items } from "./mock_data";
console.log(window.localStorage)


let userinfo = JSON.parse(localStorage.getItem("Userdata"));

document.addEventListener("DOMContentLoaded", function() {
    const progress_bar = document.querySelector('.progress-bar-row');
    const progress = document.getElementById('progress');
    const progress_number = document.getElementById('progression-numeric-comparison');

    // go to add money page
    const select_item = document.getElementById('selected-item-section');
    console.log(select_item)
    select_item.addEventListener('click', () => {
        window.location.href = './add_money.html'
    })
    // set current item txt
    if (!window.localStorage.getItem("current-item")) {
        window.localStorage.setItem("current-item", userinfo.currentitem);
    }

    const currItem = document.getElementById("current-item");
    if (window.localStorage.getItem("current-item") === "undefined") {
        currItem.innerText = "No Item Selected.";
        progress_bar.classList.add('hidden');

    } else {
        currItem.innerText = window.localStorage.getItem("current-item");
        progress_bar.classList.remove('hidden');
        let saved_amt = 0
        if ('itemprogress' in userinfo) {
            saved_amt = userinfo.itemprogress;
        } else {
            
            saved_amt = 0;
        }

        // set progress bar
        const full_amt = listing_items.find(i => i.title === window.localStorage.getItem('current-item')).price;
        const progress_percentage = Math.round(saved_amt/full_amt * 100)

        //write full_amt to localstorage (so can be used in 'add_money.js')
        window.localStorage.setItem('full_price', full_amt);

        progress.style.width = progress_percentage + "%";

        console.log(userinfo)
        progress_number.innerText = `${saved_amt}/${full_amt}`
    }
})




