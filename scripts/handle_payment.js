import { APIKEY, DB_URL } from "./config";

document.addEventListener("DOMContentLoaded", function () { 
    const payment_details = document.getElementById('payment-details');
    console.log(payment_details)
    const payment_buttons = document.querySelectorAll('.payment-opt');
    const cc_section =  document.getElementById('cc-section');
    const payment_confirm = document.getElementById('submit-payment-info');
    let method_type = ''; // payment method type

    let monthyear_injected = false;
    let userdata = JSON.parse(localStorage.getItem("Userdata"));
    const uid = userdata._id
    const saved_amt = window.localStorage.getItem('saved_amt');
    const money_to_add = window.localStorage.getItem('money_to_add');
    delete userdata._id
    console.log(money_to_add)
    console.log(window.localStorage)


    document.getElementById('amt-payable').innerText = `$${money_to_add}`
    

    // get input fields 
    
    const ccnum = document.getElementById('cc-no');
    const ccv = document.getElementById('ccv');
    const exp_mth = document.getElementById('months');
    const yr_mth = document.getElementById('years');
    const phoneInput = document.getElementById("phone-no");
    const postalInput = document.getElementById("postal-code");

    let prev = '' // might be faster than running a nested loop
    payment_buttons.forEach(b =>
        b.addEventListener('click', function (e) {
            if (prev !== '') {
                prev.classList.remove('payment-selected');
            }

            b.classList.add('payment-selected');
            window.scrollTo(0, 0); // fix scroll
            prev = b;
            method_type = b.id;

            load_payment_fields(b.id)

        })
        
    );


    // show payment fields
    function load_payment_fields(type) {
        payment_details.classList.remove('hidden');
        if (type != 'cc') {
            cc_section.classList.add('hidden');
            
        } else {
            cc_section.classList.remove('hidden');
            if (!monthyear_injected) {
                inject_monthyear()
            }

        }

        // set input validatation 
        

        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/[^\d ]/g, "");
        });

        postalInput.addEventListener("input", () => {
            postalInput.value = postalInput.value.replace(/\D/g, "");
        });

        if (method_type === 'cc') {

            
            
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
            
        }
    }

    function inject_monthyear() {
        monthyear_injected = true

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

    // handle payment confirmation
    payment_confirm.addEventListener('click', function(e) {
        e.preventDefault()
        const payment_fields = document.querySelectorAll('.payment-field');

        const input_validity = validate_input_presence(payment_fields);
        // write api req to update itemprogress if valid input

        if (input_validity) {
            console.log(userdata)
            userdata.itemprogress = Number(saved_amt + money_to_add);
            console.log(userdata.itemprogress, 'prg')

            // update itemprogress via api & localstorage 
            var setting = {
                "method": "PUT",
                "headers": {
                    "x-apikey": APIKEY,
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(userdata),
            }
            console.log(userdata)
            console.log(uid)

            fetch(`${DB_URL}/individuals/${uid}`, setting)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Results:", data);
                   
                    console.log("Found user:", data[0]);
                    window.localStorage.setItem("Userdata", JSON.stringify(data[0]));
                    window.localStorage.removeItem('saved_amt');
                    window.localStorage.removeItem('money_to_add');
                    window.location.href = './main.html'
                    
                })
            
            // ;
        }
    })

    // checking if fields empty, clear each field after checked
    function validate_input_presence(fields) {
        let valid = true
        if (method_type === 'cc') {
            for (const field of fields) {
                if (field.value === '') {
                    field.setCustomValidity('Please fill this field!')
                    valid = false;
                    field.value = '';
                }
            }
        } else {
            for (const field of fields) {
                if ((field.value === '') && !(field.classList.contains('cc'))){
                    field.setCustomValidity('Please fill this field!')
                    valid = false;
                    field.value = '';
                }
            }
        }
        return valid;
    }


    


})  