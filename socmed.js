import { APIKEY, DB_URL } from "./config.js";
import { socmed_post_data } from "./mock_data.js";


const POST_TEMPLATE = {
    
    title: "nil",
    desc: "nil",
    img: "/public/default_profile.png",
    usr: "nil",
    profilepicture: "/public/default_profile.png",
    likes: 0
    
}

const userdata = JSON.parse(localStorage.getItem("Userdata"))[0]

console.log(socmed_post_data);

document.addEventListener("DOMContentLoaded", function () {


    // fetch posts to load

    /*
    const DB_URL_SOCMED = `${DB_URL}/socialmedia`;

    var settings = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }

    
    
    fetch(DB_URL_SOCMED, settings)
        .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
        .then(data => {
            console.log(data)
            
            load_posts(data)
        })

    */

    load_posts(socmed_post_data)

    function load_posts(postdata) {
        const posts_section = document.getElementById('posts')
        posts_section.innerHTML = ''

        console.log(postdata.length)
        for (const idx in postdata) {
            const data = postdata[idx]
            console.log(data)
            const post = document.createElement('div');
            post.className = "post";

            // to include pfp + usrname
            const posthead = document.createElement('div');
            const poster_usr = document.createElement('h1');
            poster_usr.innerText = data.usr;

            const poster_profile = document.createElement('img');
            poster_profile.src = data.profilepicture;
            poster_profile.className = 'profile-picture'


            posthead.appendChild(poster_profile);
            posthead.appendChild(poster_usr);


            // post text
            const post_desc = document.createElement('p');
            post_desc.innerText = data.desc;

            post.appendChild(posthead);
            post.appendChild(post_desc);

            posts_section.appendChild(post);

        }
    }

    const submit_post = document.getElementById("send-post")
    
    submit_post.addEventListener('click', function(e) {
        e.preventDefault();
        const post = Object.create(POST_TEMPLATE);
        
        post.usr = userdata.username;
        post.desc = document.getElementById("post-desc").value;
        
        if ('profilepicture' in userdata) {
            post.profilepicture = "public/default_profile.png";
        }

        socmed_post_data.push(post);
        load_posts(socmed_post_data);

    })

    


})