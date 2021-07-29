
// Load/Get Data

function get_data() {
	fetch('assets/js/airports.json')
	.then(res => res.text())
	.then(data => {
		data = JSON.parse(data);
		let total_results = data.length;
        document.querySelector('.total_results').innerHTML = total_results;
		pagination(data);
	})
	.catch(err => console.log(err))
}

get_data();


// Checkbox Filter

const checkbox = document.querySelectorAll(".custom-control-input");

for(var i = 0; i < checkbox.length; i++) {
	checkbox[i].addEventListener('change', get_filter);
}

function get_filter(event) {
	const target_value = event.target.value;
	fetch('assets/js/airports.json')
	.then(res => res.text())
	.then(data => {
		data = JSON.parse(data);
		let airports = data;
		const filter_airports_by_type = airports.filter(airport => airport.type == target_value );

		pagination(filter_airports_by_type);

		let total_results = filter_airports_by_type.length;
        document.querySelector('.total_results').innerHTML = total_results;

	})
	.catch(err => console.log(err))
}


// Search filter

var search_input = document.querySelector(".search-input");
search_input.addEventListener('keyup', get_filter_search_data)

function get_filter_search_data(event) {
	const target_value = event.target.value;
	fetch('assets/js/airports.json')
	.then(res => res.text())
	.then(data => {
		data = JSON.parse(data);
		let airports = data;
		let results = [];
		if (target_value.length > 0 || target_value != '') {
			airports.forEach(airport => {
				if ((airport.name.toLowerCase() == target_value.toLowerCase()) ||
				    (airport.latitude == target_value) ||
					(airport.elevation == target_value) ||
					(airport.iata == target_value) ||
					(airport.longitude == target_value) ||
					(airport.icao == target_value)
					) {
					results.push(airport);
				}
	        })
			pagination(results);
		} else {
			pagination(data);
		}

	})
	.catch(err => console.log(err))
}


// Pagination

function pagination(json_data) {

	var btn_next = document.getElementById("btn_next");
	var btn_prev = document.getElementById("btn_prev");
	var listing_table = document.getElementById("listingTable");
	var current_data = document.getElementById("current_data");

	var current_page = 1;
	var records_per_page = 4;

	var objJson = json_data;

	btn_prev.addEventListener("click", prevPage);
	btn_next.addEventListener("click", nextPage);

	function prevPage(e) {
		e.preventDefault();
	    if (current_page > 1) {
	        current_page--;
	        changePage(current_page);
	    }
	}

	function nextPage(e) {
		e.preventDefault();
	    if (current_page < numPages()) {
	        current_page++;
	        changePage(current_page);
	    }
	}

	function changePage(page) {
	    // Validate page
	    if (page < 1) page = 1;
	    if (page > numPages()) page = numPages();

	    listing_table.innerHTML = "";

		if (objJson.length > 0) {
			for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
			   listing_table.innerHTML += `<tr>
											   <td scope="row">${objJson[i].name}</td>
											   <td>${objJson[i].icao}</td>
											   <td>${objJson[i].iata}</td>
											   <td>${objJson[i].elevation}</td>
											   <td>${objJson[i].latitude}</td>
											   <td>${objJson[i].longitude}</td>
											   <td>${objJson[i].type}</td>
										   </tr>`;

			   current_data.innerHTML = `${(i + 1) - 3} - ${i + 1}`;
		   }
		} else {
				listing_table.innerHTML += `<tr>
												<td colspan="7" class="text-center"> Data Not Found.</td>
											</tr>`
				current_data.innerHTML = `${0} - ${0}`;
		}



	    if (page == 1) {
	        btn_prev.style.visibility = "visible";
	    } else {
	        btn_prev.style.visibility = "visible";
	    }

	    if (page == numPages()) {
	        btn_next.style.visibility = "visible";
	    } else {
	        btn_next.style.visibility = "visible";
	    }
	}

	function numPages() {
	    return Math.ceil(objJson.length / records_per_page);
	}

	changePage(1);

}
