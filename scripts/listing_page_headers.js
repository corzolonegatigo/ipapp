document.addEventListener("DOMContentLoaded", function () { 
    const nav_head = document.getElementById('nav-page-head-listings');
    const arrow = document.createElement('h4');
    arrow.className = 'fake-arrow';
    arrow.innerText = '>';


    document.addEventListener('click', update_header())
    function update_header() {
        // check if theres a valid search
        nav_head.innerHTML = '<a class="nav-head-link" href="/main.html" id="shop-redirect">Shop</a>'
        const search_url = localStorage.getItem('search-url');
        console.log(search_url)
        if ((search_url !== null) && (search_url !== '/main.html')) {
            nav_head.appendChild(arrow);

        }


    };

    // just adding code to remove search_url when 'shop' is clicked
    const shop_redirect = document.getElementById('shop-redirect');
    shop_redirect.addEventListener('click', () => {
        localStorage.removeItem('search-url');
        update_header();
    })

} )