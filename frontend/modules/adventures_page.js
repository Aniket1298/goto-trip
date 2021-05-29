import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  try{

    // 1. Extract the city id from the URL's Query Param and return it
    var url = new URL(config["backendEndpoint"]+"/adventures"+ search)
    let params = new URLSearchParams(url.search);
    let city = params.get('city');
    return city
  }
  catch{
    return null
  }

}
//Implementation of fetch call with a paramterized input based on city
async function getadventures(url){
  var output =null
  return await fetch(url,)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        return data
      })
      .catch((error) => {
        return null
        output=null
      });
}
async  function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  var url =config["backendEndpoint"]+"/adventures?city="+city
  var adventures = await getadventures(url)
  console.log("fromget",adventures)
  return adventures

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  var parent = document.getElementById('data')
  console.log("Hello",parent)
  try{
      adventures.forEach((key) => {
        var link = document.createElement('a')
        link.href='detail/?adventure='+key.id
        link.id=key.id
        var child = document.createElement('div')
        child.className='activity-card'
        child.setAttribute("href","https://www.quora.com/")
        //child.addEventListener("onclick","alert('clicl')")
        child.id=key.id
        var Image = document.createElement("img");
        Image.setAttribute('src', key.image)
        child.appendChild(Image)
        var banner = document.createElement('div')
        banner.innerHTML=key.category
        banner.className="category-banner"
        child.appendChild(banner)

        var text=document.createElement('div')
        text.className="activity-card-text"
        var name = document.createElement('h')
        name.innerHTML=key.name
        var price = document.createElement('h')
        price.innerHTML="₹"+key.costPerHead
        text.appendChild(name)
        text.appendChild(price)
        child.appendChild(text)
        console.log("TESTING",text)
        var text2=document.createElement('div')
        text2.innerHTML="<div class='text' style='display:flex;flex-direction:row;justify-content:space-between'><h>"  + "Duration    "+"</h><h>"+ key.duration+"Hours</h></div>"
        var duration = document.createElement('h')
        name.innerHTML=key.name
        var hour = document.createElement('h')
        price.innerHTML= "     ₹"+key.costPerHead
        text2.className="activity-card-text"
        text2.appendChild(duration)
        text2.appendChild(hour)
        child.appendChild(text2)
        link.append(child)
        parent.appendChild(link)
    });
  }
  catch{
    return;
  }

  console.log(parent)

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  console.log("by dur",list,low,high)
  var activities = []//list.filter(activity => activity.duration>=low && activity.duration<=high);
  for (var i=0;i<list.length;i++){
    if (list[i].duration>=low && list[i].duration<=high){
      activities.push(list[i])
    }
  }
  console.log("Filtered",activities)
  return activities
}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  var activities=[]
  for (var i=0;i<list.length;i++){
    for(var j=0;j<list.length;j++){
      if (list[i].category==categoryList[j]){
        activities.push(list[i])
        break
      }
    }
  }
  return activities

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log("Filters",filters)
  if (filters.duration && filters.duration.length!=0){
    var duration = filters["duration"].split("-")
    list =filterByDuration(list,duration[0],duration[1])
  }
  if (filters.category && filters.category.length!=0){
    list=filterByCategory(list,filters.category)
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()te
  localStorage.setItem("filters",JSON.stringify(filters))
  return true;
}
//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  try{
    filters=localStorage.getItem("filters").parse()
  }
  catch{
    console.log("CATCh")
  }

  
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pill
  var parent = document.getElementById("category-list")
  for (var i=0;i<filters.length;i++){
    var child = document.createElement('div')
    child.className="category-filter"
    child.id=filters[i]
    child.innerHTML=filters[i]
    parent.appendChild(child)
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
