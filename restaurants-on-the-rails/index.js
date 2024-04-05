function nearbyRestaurants(y, x, radiusMiles) {
  const nearPoint =
    "https://places-api.arcgis.com/arcgis/rest/services/places-service/v1/places/near-point";
  const queryParams = {
    x,
    y,
    radius: radiusMiles * 1609.34,
    //categoryIds: [12000],
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

function getStations() {
  const stations = [];
  const stationsURL =
    "https://meckgis.mecklenburgcountync.gov/server/rest/services/CATSLynxBlueLineStations/FeatureServer/0/query";
  const stationParams = {
    where: "1=1",
    outFields: "*",
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
      if (!result.ok) {
        throw new Error("API issue.")
      }
      return result.json();
    })
    .then(function (body) {
      let cardDiv = ''
      if (body.features.length > 0) {
      body.features.forEach((feature) => {
        console.log(body.features[0]);
        //construct some HTML!
        cardDiv += `<calcite-card>
      <span slot="title">${feature.attributes.name.trim()}</span>
      <span slot="subtitle">${feature.attributes.address.trim()}</span>
      <div slot="footer-start">
        <calcite-button round icon-start="pin-tear" href="https://www.google.com/maps/search/?api=1&query=${feature.attributes.name.trim()} Light Rail Station Charlotte NC">View Map</calcite-button>
      </div>
    </calcite-card>`
      });
    document.querySelector("#result-cards").innerHTML = cardDiv
      } 
      throw new Error("No stations returned.")
      document.querySelector("#result-cards").textContent = "No Stations to Display"
    })
  .catch(error => {
    console.error(error);
  });
}

getStations();

