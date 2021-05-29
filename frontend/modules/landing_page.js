import config from "../conf/index.js";
//var hard = [{"id":"bengaluru","city":"Bengaluru","description":"100+ Places","image":"https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},{"id":"goa","city":"Goa","description":"250+ Places","image":"https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},{"id":"kolkata","city":"Kolkata","description":"100+ Places","image":"https://images.pexels.com/photos/2524368/pexels-photo-2524368.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},{"id":"singapore","city":"Singapore","description":"100+ Places","image":"https://i.ibb.co/WVL7n8K/singapore.jpg"},{"id":"malaysia","city":"Malaysia","description":"100+ Places","image":"https://images.pexels.com/photos/2940925/pexels-photo-2940925.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},{"id":"bangkok","city":"Bangkok","description":"250+ Places","image":"https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?cs=srgb&dl=pexels-ingo-joseph-1682748.jpg&fm=jpg"},{"id":"new-york","city":"New York","description":"100+ Places","image":"https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},{"id":"paris","city":"Paris","description":"100+ Places","image":"https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}]
async function init() {
  //Fetches list of all cities along with their images and description
 
  let cities = await fetchCities();
  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  var cities=[]

  var url = config["backendEndpoint"]+"/cities"
  //await fetch(url).then(response => response.json()).then(data =>{cities=data})

  //console.log(cities)
  try{
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
          return null;
      }
    })
    .catch((error) => {
      return null
    });
  }
  catch(error){
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DO
  var City = document.getElementById("data")
  var link = document.createElement('a')
  link.id=id
  link.href='pages/adventures/?city='+id
  var citycard= document.createElement("div")
  citycard.className="tile"
  citycard.style.margin="5px"
  var Image = document.createElement("img");
  Image.setAttribute('src', image)
  /*Image.setAttribute('src', image);
  Image.setAttribute("height","300px")
  Image.setAttribute("width","250px")
  Image.setAttribute("border","5px")
  Image.setAttribute("margin","5px")*/
  //citycard.appendChild(Image)
  citycard.style.backgroundImage="url("+image+")"

  var tiletext=document.createElement('div')
  tiletext.className="tile-text"


  var name = document.createElement("h")
  name.innerHTML=city
  var desc = document.createElement("h")
  desc.innerHTML=description

  tiletext.appendChild(name)
  tiletext.appendChild(desc)
  
  citycard.appendChild(tiletext)
  citycard.id=id
  citycard.setAttribute('href','pages/adventures/?city='+id)
  
  //citycard.addEventListener("click",{window.location='http://15.207.206.67:8082/cities'})
  link.appendChild(citycard)
  City.appendChild(link)
  citycard.href='pages/adventures/?city='+id
  console.log("HREF", document.getElementById(id).href)
console.log(City)
}

export { init, fetchCities, addCityToDOM };
