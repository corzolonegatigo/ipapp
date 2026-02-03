import { APIKEY, DB_URL } from "./config.js";

const USERTEMPLATE = {
    "username": "",
    "password": "",
    "email": "",
    "currentitem": "",
    "itemprogress": 0
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-submit").addEventListener("click", function (e) {
        e.preventDefault();

        let emailIn = document.getElementById("email").value;
        let usernameIn = document.getElementById("username").value;
        let passwwordIn = document.getElementById("password").value;
        let image = document.getElementById("imageInput").files[0];

            /*
        if (!image) {
            image = new File(
                "./public/default_profile.png"
            )
        }*/

        const user = Object.create(USERTEMPLATE);
        user.email = emailIn;
        user.username = usernameIn;
        user.password = passwwordIn;

        
        

        // to add files
        const signupDataForm = new FormData();

        signupDataForm.append("email", emailIn);
        signupDataForm.append("username", usernameIn);
        signupDataForm.append("password", passwwordIn);

        if (image) {
            signupDataForm.append("profilepicture", image);
        };
        

        // write post request
        var postsettings = {
            method: "POST",
            headers: {
                "x-apikey": APIKEY,
                "cache-control": "no-cache",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            
            }

        
        fetch(`${DB_URL}/individuals`, postsettings)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Signup:", data);
            })
            .catch(err => console.error("Signup failed:", err));
        
        


    })
})