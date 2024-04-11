 export function nearbyRestaurants(y, x, radiusMiles) {
    const nearPoint =
        "https://places-api.arcgis.com/arcgis/rest/services/places-service/v1/places/near-point";
    const queryParams = {
        x,
        y,
        radius: radiusMiles * 1609.34,
        //categoryIds: ["13000"],
        f: "json",
        token:
            "AAPKa4a834dd14fe464dac0765c135502466bJTidcQFYUmhVZZBjlyvw3VQ7MvAZDnzGuRjHP2Z3u1KeLbCih162STl535C4mpc"
    };
    const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");
    const getRestaurants = `${nearPoint}?${queryString}`;
    fetch(getRestaurants, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
        .then(function (result) {
            return result.json();
        })
        .then(function (body) {
            console.log(body.results);
        });
}

export function getStations() {
    const stations = [];
    const stationsURL =
        "https://meckgis.mecklenburgcountync.gov/server/rest/services/CATSLynxBlueLineStations/FeatureServer/0/query";
    const stationParams = {
        where: "1=1",
        outFields: "*",
        orderByFields: "trim(leading ' ' from name) ASC",
        outSR: "4326",
        f: "json"
    };
    const stationQueryString = Object.keys(stationParams)
        .map((key) => `${key}=${stationParams[key]}`)
        .join("&");
    const getStations = `${stationsURL}?${stationQueryString}`;
    fetch(getStations, {
        method: "GET",
        headers: { Accept: "application/json" }
    })
        .then(function (result) {
            console.log(result);
            return result.json();
        })
        .then(function (body) {
            //create dropdown
            const dropdownDiv = document.querySelector("calcite-combobox");
            if (body.features.length > 0) {
                body.features.forEach((feature) => {
                    //construct some HTML!
                    dropdownDiv.insertAdjacentHTML(
                        "beforeend",
                        `<calcite-combobox-item value="${feature.attributes.name.trim()}" text-label="${feature.attributes.name.trim()}" data-x-coord="${feature.geometry.x}" data-y-coord="${feature.geometry.y}"></calcite-combobox-item>`
                    );
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export function displayFilterSelections(distance,station,rating) {
    console.log(`You're looking for restaurants within ${distance} miles of ${station} with at least a ${rating} star rating.`)
}