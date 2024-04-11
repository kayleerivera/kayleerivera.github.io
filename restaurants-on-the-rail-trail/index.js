import {getStations, displayFilterSelections} from "./helpers.js"

getStations();

const stationFilter = document.querySelector("#station-filter");
const ratingFilter = document.querySelector("#rating-filter");
const distanceFilter = document.querySelector("#distance-filter");

const filters = {
  station: "",
  stationx: "",
  stationy: "",
  rating: 0,
  distance: 1
};

stationFilter.addEventListener("calciteComboboxChange", event => {
  filters.station = event.target.value
  const selection = document.querySelector(`#station-filter [value="${event.target.value}"]`)
  filters.stationx = selection?.dataset.xCoord ?? ""
  filters.stationy = selection?.dataset.yCoord ?? ""
  displayFilterSelections(filters.distance,filters.station,filters.rating);
});

ratingFilter.addEventListener("calciteRatingChange", event => {
  filters.rating = event.target.value
  displayFilterSelections(filters.distance,filters.station,filters.rating);
});

distanceFilter.addEventListener("calciteSliderChange", event => {
  filters.distance = event.target.value
  displayFilterSelections(filters.distance,filters.station,filters.rating);
});

