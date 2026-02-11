import hidden_toggle from "./hide_toggle";
import load_nav_header from "./listing_page_headers";
import { listing_items } from "./mock_data";


// loads data for specific item
document.addEventListener("DOMContentLoaded", function () { 

    // get item idx to extract frm data
    const params = new URLSearchParams(window.location.search);
    const itemid = params.get('item_id') || '';
    const confirm_state = params.get('confirm') || false;


    // run only if valid search qry
    if (itemid !== '') {
        load_nav_header()
        const item_data = listing_items[itemid];
    
        // set item specific fields
        const page_title = document.getElementById('item-name-page-title');
        page_title.innerText = item_data.title;

        document.getElementById('item-title').innerText = item_data.title;
        
        document.getElementById('item-desc').innerText = item_data.desc;

        document.getElementById('price').innerText = `$${item_data.price}`;

        document.getElementById('seller').innerText = item_data.sold_by;


        // set innertext for initially hidden elements
        document.getElementById('item-name').innerText = item_data.title;

        const select_item_button = document.getElementById('select-item-button');
        const back_to_item_page = document.getElementById('return-to-viewing');
        select_item_button.addEventListener('click', function (e) {
            hidden_toggle()
            window.scrollTo(0, 0);
            params.append('confirm', 'true');
            window.history.pushState(null, '', `?${params.toString()}`);
            load_nav_header()

        });

        back_to_item_page.addEventListener('click', function (e) {
            hidden_toggle()
            window.scrollTo(0, 0);
            params.delete('confirm');
            window.history.pushState(null, '', `?${params.toString()}`);
            load_nav_header()

        })

        if (confirm_state) {
            hidden_toggle()
        }

    } else { // if no item_id, so means user got here improperly
        window.location.href = './main.html'
    }
})