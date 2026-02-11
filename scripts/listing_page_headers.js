import { listing_items } from "./mock_data";


// easier to rerender this component whenever needed than to refresh entire page
export default function load_nav_header() {


    console.log('hi')
    const nav_head = document.getElementById('nav-page-head-listings');

    // cloned for each new arrow
    const arrow = document.createElement('h4');
    arrow.className = 'fake-arrow';
    arrow.innerText = '>';

    // potentional redir to add, clone this everytime a new link is added
    const page_link = document.createElement('a');
    page_link.classList = 'nav-head-link';
    


    document.addEventListener('click', update_header())
    function update_header() {

        // grab url params
        const params = new URLSearchParams(window.location.search);
        const itemid = params.get('item_id') || '';
        const confirm_state = params.get('confirm') || false;

        

        // check if theres a valid search
        nav_head.innerHTML = '<a class="nav-head-link" href="/main.html" id="shop-redirect">Shop</a>'
        const search_url = localStorage.getItem('search-url');
        if ((search_url !== null) && (search_url !== '/main.html')) {
            nav_head.appendChild(arrow.cloneNode(true));
            
            let search_link = page_link.cloneNode(true);
            search_link.href = '/main.html' + search_url;
            search_link.id = 'search-id';
            search_link.innerText = "Search: " + search_url.slice(8)

            nav_head.appendChild(search_link);
            

        }

        // check if item_id in url (header doesnt extend past so probably fine to just read from url itself, no need for locastorage)
        if (itemid !== '') {
            nav_head.appendChild(arrow.cloneNode(true));

            let item_link = page_link.cloneNode(true);
            item_link.href = `./selecting_item.html?item_id=${encodeURIComponent(itemid)}`;
            item_link.id = 'item-listing'
            item_link.innerText = listing_items[itemid].title;

            nav_head.appendChild(item_link)
        }

        console.log(confirm_state)
        console.log(JSON.stringify(params))
        if (confirm_state) {
            nav_head.appendChild(arrow.cloneNode(true));

            let confirm_link = page_link.cloneNode(true);
            confirm_link.href = `./selecting_item.html?${params.toString()}`;
            confirm_link.id = 'confirm-payment'
            confirm_link.innerText = 'Confirm Item?';

            nav_head.appendChild(confirm_link)
        }


    };

    // just adding code to remove search_url when 'shop' is clicked
    const shop_redirect = document.getElementById('shop-redirect');
    shop_redirect.addEventListener('click', () => {
        localStorage.removeItem('search-url');
        update_header();
    })
} 

