import { APIKEY, DB_URL } from "./config.js";
import hidden_toggle from "./hide_toggle.js";

const USERTEMPLATE = {
    "username": "",
    "password": "",
    "email": "",
    "currentitem": "",
    "itemprogress": 0
}

document.addEventListener("DOMContentLoaded", function () {

    const payment_details = document.getElementById('payment-details');
    const cc_section =  document.getElementById('cc-section');
    const payment_confirm = document.getElementById('submit-payment-info');
    const ccnum = document.getElementById('cc-no');
    const ccv = document.getElementById('ccv');
    const exp_mth = document.getElementById('months');
    const yr_mth = document.getElementById('years');
    const phoneInput = document.getElementById("phone-no");
    const postalInput = document.getElementById("postal-code");
    
    function validate_input_presence(fields) {
        let valid = true
        console.log(fields)
        for (const field of fields) {
            if (field.value === '') {
                field.setCustomValidity('Please fill this field!')
                valid = false;
                field.value = '';
            }
        }
        return valid;
    }

    function inject_monthyear() {

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        // inject here
        for (let i = 0; i < months.length; i++) {
            const month = document.createElement('option');
            month.value = months[i];
            month.innerText = months[i];
            exp_mth.appendChild(month);
        }

        for (let i = 0; i < 10; i++) {
            const year = document.createElement('option');
            year.value = currentYear + i;
            year.innerText = currentYear + i;
            yr_mth.appendChild(year);
        }

    }


    document.getElementById("login-submit").addEventListener("click", function (e) {
        e.preventDefault();
        const signin_fields = document.querySelectorAll('.signin-field');
        if (validate_input_presence(signin_fields)) {
            inject_monthyear()
            hidden_toggle()

            // validation 
            phoneInput.addEventListener("input", () => {
                phoneInput.value = phoneInput.value.replace(/[^\d ]/g, "");
            });

            postalInput.addEventListener("input", () => {
                postalInput.value = postalInput.value.replace(/\D/g, "");
            });
            ccnum.addEventListener('input', () => {
                ccnum.value = ccnum.value.replace(/\D/g, "");
                if (ccnum.value.length > 16) {
                    ccnum.value = ccnum.value.splice(0,16);
                    ccnum.setCustomValidity('Too long!');
                }
            });

            ccv.addEventListener('input', () => {
                ccv.value = ccv.value.replace(/\D/g, "");
                if (ccv.value.length > 16) {
                    ccv.value = ccv.value.splice(0,16);
                    ccv.setCustomValidity('Too long!');
                }
            });
        };
    });

         
    payment_confirm.addEventListener('click', function(e) {
        e.preventDefault();

        const payment_fields = document.querySelectorAll('.payment-field');
        if (validate_input_presence(payment_fields)) {
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

            const user = structuredClone(USERTEMPLATE);

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
            console.log(user)
            fetch(`${DB_URL}/individuals`, postsettings)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Signup:", data);
                    window.localStorage.setItem('Userdata', JSON.stringify(data[0]))
                    window.location.href = './main.html'
                })
                .catch(err => console.error("Signup failed:", err));
        }
    })
       
})

