import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ":"+ seconds+' ' + ampm;
  return strTime;
}

async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  // Place holder for functionality to work in the Stubs
  try{
    var url = config["backendEndpoint"]+"/reservations"
    fetch(url).then((response) => {
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
  catch{
    return null
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length==0){
    var table = document.getElementById("reservation-table-parent")
    table.style.display="none"
    var banner = document.getElementById("no-reservation-banner")
    banner.style.display="block"
  } 
  if (reservations.length!=0){
    var table = document.getElementById("reservation-table-parent")
    table.style.display="block"
    var banner = document.getElementById("no-reservation-banner")
    banner.style.display="none"
    var table = document.getElementById("reservation-table");
    var i=0
    reservations.forEach((key,idx) =>{
      var row = table.insertRow(idx);
      row.href=config["backendEndpoint"]+"/detail/?adventure="+key.adventure
      row.setAttribute('href',config["backendEndpoint"]+"/detail/?adventure="+key.adventure)
      row.id=key.id
      var id = row.insertCell(0)
      id.setAttribute('href',config["backendEndpoint"]+"/detail/?adventure="+key.adventure)
      id.href=config["backendEndpoint"]+"/detail/?adventure="+key.adventure
      id.innerHTML=key.id

      var name = row.insertCell(1)
      name.innerHTML=key.name

      
      var adventureName = row.insertCell(2)
      adventureName.innerHTML=key.adventureName

      
      var person = row.insertCell(3)
      person.innerHTML=key.person

      var date = row.insertCell(4)
      var booked = new Date(key.date)
      date.innerHTML=booked.getDate()+"/"+(booked.getMonth()+1)+"/"+booked.getFullYear()

      var price = row.insertCell(5)
      price.innerHTML=key.price

      var time = row.insertCell(6)
      var formated = new Date(key.time)
      const monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
          ];
      time.innerHTML=formated.getDate()+" "+monthNames[formated.getMonth()] +" "+formated.getFullYear()+", "+formatAMPM(formated)

      var action = row.insertCell(7)
      action.className="reservation-visit-button"
      action.innerHTML="Visit Adventure"
      action.setAttribute('href',config["backendEndpoint"]+"/detail/?adventure="+key.adventure)
      action.href=config["backendEndpoint"]+"/detail/?adventure="+key.adventure
    })
  } 
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
