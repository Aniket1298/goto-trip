import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{
    var url=  new URL(config["backendEndpoint"]+search)
    var params = new URLSearchParams(url.search);
    var adventure_id =params.get("adventure")
    // Place holder for functionality to work in the Stubs
    return adventure_id;

  }
  catch{
    return null
  }
  return null
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  var url= config["backendEndpoint"]+"/adventures/detail?adventure="+adventureId
  console.log("URL",url)
  var details = []
  /*fetch(url)
  .then(response => response.json())
  .then(data => {
    details=data
    console.log("this is",data)
  });*/

  console.log("datat",details)
  try{
      await fetch(url)
      .then(response => response.json())
      .then(data => {
      details=data
      console.log("this is",data)
    })
  }
  catch{
    details = null
  }
  // Place holder for functionality to work in the Stubs
  
  return details
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DO
  if (adventure){
    console.log(adventure.name,adventure)
    var name = document.getElementById("adventure-name")
    name.innerHTML=adventure.name
    var gallery = document.getElementById("photo-gallery")
    var subtitle= document.getElementById("adventure-subtitle")
    subtitle.innerHTML=adventure.subtitle
    var content = document.getElementById("adventure-content")
    content.innerHTML=adventure.content
    var images=adventure.images
    console.log(images)
    images.forEach(image =>{ 
        var img = document.createElement("div")
        var picture = document.createElement('img')
        picture.setAttribute('src',image)
        img.appendChild(picture)
        img.className="activity-card-image"
        img.setAttribute('src',image)
        gallery.appendChild(img)
      })
    }
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  var gallery=document.getElementById("photo-gallery")
  gallery.className="carousel slide"
  gallery.setAttribute("data-ride","carousel")
    document.querySelectorAll('.activity-card-image').forEach(function(a){
    a.remove()
    })
 
  var carousel= document.createElement('div')
  
  carousel.className="carousel slide"
  var ol = document.createElement("ol")
  ol.className="carousel-indicators"
  for(var i=0;i<images.length;i++){
    var li=document.createElement("li")
    li.setAttribute("data-target","#"+"photo-gallery")
    li.setAttribute("data-slide-to",""+i)
    if (i==0){
      li.setAttribute("class","active")
    }
    ol.appendChild(li)
  }
  gallery.appendChild(ol)

  var picture= null
  var item = null
  var inner = document.createElement("div")
  inner.className="carousel-inner"
  for(var i=0;i<images.length;i++){
    var image= images[i]
    if (i==0){
      var active =document.createElement("div")
      active.className="carousel-item active"
      picture = document.createElement('img')
      picture.setAttribute('src',images[0])
      
      active.appendChild(picture)
      inner.appendChild(active)
    }
    else{
      var item = document.createElement('div')
      item.className="carousel-item"
      var picture = document.createElement('img')
      picture.setAttribute('src',image)
      item.appendChild(picture)
      inner.appendChild(item)

    }
  }
  carousel.appendChild(inner)
  gallery.appendChild(carousel)
  console.log(gallery)
  console.log("let see",document.getElementById("photo-gallery"))

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    var sold = document.getElementById("reservation-panel-sold-out")
    sold.style.display="none" //Hide Sold
    var activity =document.getElementById("reservation-panel-available")
    activity.style.display="block" //Show activity
    var cost = document.getElementById("reservation-person-cost")
    cost.innerHTML=adventure.costPerHead //Set CostPerHead
  } 
  else{
    var sold = document.getElementById("reservation-panel-sold-out")
    sold.style.display="block" //Show Sold
    var activity =document.getElementById("reservation-panel-available")
    activity.style.display="none" //Hide Adventure
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  var cost = document.getElementById("reservation-cost")
  cost.innerHTML=adventure.costPerHead*persons

}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").on("submit",function(e){
      var data= $(this).serialize()+"&adventure="+adventure.id
      $.ajax({
        type:"POST",
        url:config["backendEndpoint"]+"/reservations/new",
        data:data,
        success:function(){
          window.alert("Success!")
          window.location.reload()
        },
        error:function(){
          window.alert("Failed!")
        }
      })
  })
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  var banner = document.getElementById("reserved-banner")
  if(adventure.reserved==true){
    banner.style.display="block"
  }
  if(adventure.reserved==false){
    banner.style.display="none"
  }
  console.log(banner)
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
