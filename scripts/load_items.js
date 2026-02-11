import load_nav_header from "./listing_page_headers";
import { listing_items } from "./mock_data"

document.addEventListener("DOMContentLoaded", function () { 
    const items_section = document.getElementById('items'); 

    const search_bar = document.getElementById('search-query');
    const enter_search = document.getElementById('enter-query');

    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search') || '';

    if (searchQuery !== '') {
        search_bar.value = searchQuery;
    }

    search_bar.addEventListener('input', () => {
        let current_search = search_bar.value;
        render_items(current_search);
    })

    enter_search.addEventListener('click', function (e) {
        e.preventDefault();
        let current_search = search_bar.value;

        const newUrl = current_search ? `?search=${encodeURIComponent(current_search)}` : window.location.pathname;
        

        // just for the header
        window.localStorage.setItem('search-url', newUrl);
        
        render_items(current_search);
        window.history.pushState(null, '', newUrl);

        console.log(window.localStorage)
        load_nav_header()
        
    })

    function render_items(query = '') {

        // holy nest
        items_section.innerHTML = '';
        for (const item in listing_items) {
            const itemdata = listing_items[item]
            if ((itemdata.title.includes(query)) || (query === '')) {
                const item_listing = document.createElement('div');
                item_listing.className = "listing-item";
                

                const item_thumbnail = document.createElement('img');
                item_thumbnail.src = itemdata.img_main;
                item_thumbnail.className = "thumbnail";

                const item_title = document.createElement('h2');
                item_title.innerText = itemdata.title;
                
                const item_desc = document.createElement('p');
                item_desc.innerText = itemdata.desc;
                item_desc.className = "item-description"

                const item_seller = document.createElement('h3');
                item_seller.innerText = `Sold by ${itemdata.sold_by}`

                
                // append to specific post
                item_listing.appendChild(item_thumbnail);
                item_listing.appendChild(item_title);
                item_listing.appendChild(item_desc);
                item_listing.appendChild(item_seller);

                // append post to section

                items_section.appendChild(item_listing);

                item_listing.id = item;

                item_listing.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.localStorage.setItem('item-listing-data', JSON.stringify(itemdata));
                    window.location.href = `./selecting_item.html?item_id=${encodeURIComponent(item)}`;

                })
            }
        }


    }

    render_items(searchQuery)
    load_nav_header()


})