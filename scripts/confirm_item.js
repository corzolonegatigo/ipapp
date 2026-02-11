// init date vals
import { DB_URL, APIKEY } from "./config";
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
let selected_month = currentMonth;
let selected_year = currentYear;


const selector = document.getElementById('month-year-selector');
const month_selector = document.getElementById('months-selector');
const year_selector = document.getElementById('year-selector');
const selector_toggle = document.getElementById('select-date');
const confirm_date = document.getElementById('confirm');
const monthly_amt_tag = document.getElementById('monthly-amt');
const checkbox = document.getElementById('checkbox');
const affirm_text = document.querySelector('.affirm');
const select_item = document.getElementById('select-item');
const final_date = document.getElementById('final-date');

// get price
const price = JSON.parse(window.localStorage.getItem('item-listing-data')).price;
const item_name = JSON.parse(window.localStorage.getItem('item-listing-data')).title;
console.log(item_name, 'itemname');


var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


// toggle selector vis

selector_toggle.addEventListener('click', function(e) {
    selector.classList.toggle('hidden');

})

// load month buttons
for (let i = 0; i < months.length; i++) {
    const month = document.createElement('h3');
    console.log(months[i])
    month.className = 'selector-option month';
    month.innerText = months[i];
    month.id = i+1;
    month_selector.appendChild(month); 
}

// load year options (loads upto 5 years)
for (let i = 0; i < 5; i++) {
    console.log('1')
    const year = document.createElement('h3');
    year.className = 'selector-option year';
    year.innerText = currentYear + i;
    year.id = currentYear + i;
    year_selector.appendChild(year);
};


// regeneration onclick listeners to month buttons.

function setMonthAction() {
    const month_tags = month_selector.querySelectorAll('.month')
    for (let i = 0; i < months.length; i++) {
        let month  = month_tags[i]
        // horrible bool statement but you get the idea right mr d
        if (!((selected_year === currentYear) && (month < currentMonth))) {
            month.addEventListener('click', function(e) {
                selected_month = month.id
                month_tags.forEach(m =>
                    m.classList.remove('monthyear-selected')
                );
                month.classList.add('monthyear-selected');

            })
            
        } else {
            month.classList.add('unselectable');
        }
    }
}

// set here to reuse toggle code
const year_tags = year_selector.querySelectorAll('.year')
for (let i = 0; i < year_tags.length; i++) {
    let year = year_tags[i]
    console.log(year_tags)
    year.addEventListener('click', function (e) {
        selected_year = year.id;
        year_tags.forEach(y =>
            y.classList.remove('monthyear-selected')
        );
        year.classList.add('monthyear-selected')
        setMonthAction();
    });
}

// confirm final month-year and calc
confirm_date.addEventListener('click', function (e) {
    const month_diff = (selected_year - currentYear) * 12 + (selected_month - currentMonth);
    const month_amt = Math.round(price / month_diff);
    monthly_amt_tag.innerText = month_amt;
    final_date.innerText = `${months[selected_month]}, ${selected_year}`;

    const toggle_show = document.getElementById('show-after-date-confirmed');
    toggle_show.classList.remove('hidden');
    selector.classList.toggle('hidden');
})



// confirm item
affirm_text.addEventListener('click', function (e) {
    checkbox.classList.add("fading");

    setTimeout(() => {
        [checkbox.src, checkbox.dataset.alt] = [checkbox.dataset.alt, checkbox.src];
        checkbox.classList.remove("fading");
    }, 150);

    select_item.classList.toggle('enabled');
});

select_item.addEventListener('click', function(e) {
    if (select_item.classList.contains('enabled')) {
        // there is going to be a lot here im writing an api req
        let user = {
            "username": "",
            "password": "",
            "email": "",
            "currentitem": "",
            "itemprogress": 0
        }

        const userdata = JSON.parse(window.localStorage.getItem('Userdata'));
        console.log(window.localStorage.getItem('Userdata'))
        const DB_URL_INDIV = `${DB_URL}/individuals`;

        for (const key in user) {
            console.log(key)
            if (key in userdata) {
                user[key] = userdata[key];
            }
        }
        console.log(user)
        

        user.currentitem = item_name;
        console.log(user.currentitem)
        user.itemprogress = 0;
        var setting = {
            "method": "PUT",
            "headers": {
                "x-apikey": APIKEY,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(user)
        }

        fetch(`${DB_URL_INDIV}/${userdata._id}`, setting)
            .then(response => {
                if (!response.ok) {
                    throw new Error("PUT request failed");
                }
                return response.json();
            })
            .then(data => {
                window.localStorage.setItem('current-item', item_name);
                console.log("data", data);
                console.log(window.localStorage);
                window.localStorage.setItem('Userdata', JSON.stringify(user))
                window.location.href = './main.html'
                
            })


    }
})


setMonthAction();



