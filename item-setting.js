import { APIKEY, DB_URL } from "./config";

const select_item = document.querySelectorAll(".buy-item");

const USERTEMPLATE = {
    "username": "",
    "password": "",
    "email": "",
    "currentitem": "",
    "itemprogress": 0
}

let userinfo = JSON.parse(localStorage.getItem("Userdata"))[0];
const userid = userinfo._id;

let user = Object.create(USERTEMPLATE);

for (const key in USERTEMPLATE) {
    if (key in userinfo) {
        user[key] = userinfo[key];
    }
    
}


// set current item txt
if (!window.localStorage.getItem("current-item")) {
    window.localStorage.setItem("current-item", userinfo.currentitem);
}

const currItem = document.getElementById("current-item");
if (window.localStorage.getItem("current-item") !== "undefined") {
    currItem.innerText = window.localStorage.getItem("current-item");
} else {
    currItem.innerText = "No Item Selected."
}


const DB_URL_INDIV = `${DB_URL}/individuals`;

console.log(window.localStorage);
console.log(userinfo)
select_item.forEach((button) => {
    button.addEventListener('click', function(e) {
        
        user.currentitem = button.id;

        var setting = {
            "method": "PUT",
            "headers": {
                "x-apikey": APIKEY,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(user)
        }

        console.log(JSON.stringify(user));
        fetch(`${DB_URL_INDIV}/${userid}`, setting)
            .then(response => {
                if (!response.ok) {
                    throw new Error("PUT request failed");
                }
                return response.json();
            })
            .then(data => {
                window.localStorage.setItem('current-item', button.id);
                const currItem = document.getElementById("current-item");
                currItem.innerText = button.id;
                console.log("data", data);

                console.log(window.localStorage)
            })





    })
})