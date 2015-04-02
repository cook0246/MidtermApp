// JavaScript Document
var pages = [], links=[];
var numLinks = 0;
var numPages = 0;
var theHolder;
var theMessage;
var nameHolder;
var numberHolder;

var heard = 0; 
var count;

document.addEventListener("DOMContentLoaded", listen);
document.addEventListener("deviceready",listen,false);  

function listen(){
    heard ++;
    if (heard === 2){
        start();
    }
}

function start(){
    console.log('start has been fired!');
	pages = document.querySelectorAll('[data-role="page"]');	numPages = pages.length;
	links = document.querySelectorAll('[data-role="pagelink"]');	numLinks = links.length;
    
    for(var i=0;i<numLinks; i++){
        if(detectTouchSupport( )){
            console.log("T O U C H   S U P P O R T   D E T E C T E D");
            links[i].addEventListener("touchend", handleTouch, false);
        } links[i].addEventListener("click", handleNav, false);	
    }   
        loadContacts();
        hammerTime();

        window.addEventListener("popstate", browserBackButton, false);loadPage(null);  

};


function loadGeolocation(name){
    //console.log('loadGeolocation fired for the target: '+name);
    //<-- here is where I should convert name to string
    
    var map;
    
    if(navigator.geolocation) {
        var params = {enableHighAccuracy: true, timeout:36000, maximumAge:60000};
                navigator.geolocation.getCurrentPosition( watchPosition, gpsError, params );
        //  
        
    } else {
        alert('Geolocation not supported');
    }
     var theHeader = document.getElementById('mapHeader');
     theHeader.innerHTML = "'Location for: '"+name+"'";
    
    
};

function watchPosition(position){
     //console.log('watch Position Fired');
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    mapOptions = {
        zoom: 14,
        center: pos
    };
    console.log('position is '+pos);
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
   
}


function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  }
  alert('Uh Oh! GeoError: ' + errors[error.code]);
};

function loadContacts(){
    //console.log('loadContacts fired!');
    theHolder = document.getElementById("contactsHolder");
    theMessage = document.createElement('p');
    numberHolder = document.createElement('p');
    
    var options = new ContactFindOptions();
        options.filter = "";  options.multiple = true; 
        var fields = ['displayName', 'phoneNumbers']; 
        navigator.contacts.find(fields, successFunc, errFunc, options);  
    
    function successFunc( contacts ){
        var rawString = JSON.stringify(contacts.slice(0,12)); // convert device's contact data to a string (only 12 contacts)
        localStorage.setItem('cook0246_temp_storage2', rawString);  //save the new string to localstorage
        var storedString = localStorage.getItem('cook0246_temp_storage2'); //retrieve contact info from localstorage
        var storedObject = JSON.parse(storedString);  //convert data from localstorage to a JSON object 
        
        var thisContact = 0;
        for(var i=0; i<12; i++){
            //console.log('creating nameHolder');
            var nameHolder = document.createElement('li');
            nameHolder.className = "name";
            nameHolder.setAttribute("id","c"+thisContact+"");
            //nameHolder.setAttribute("onclick","loadModal(ev)");
            nameHolder.innerHTML = storedObject[thisContact].displayName; 
          
            theHolder.appendChild(nameHolder); 
            thisContact++;
        }
              
    }
         
    //CONTACTS ERROR:
    function errFunc( error ){
        console.log("CONTACTS ERROR: " + error);
        theMessage.innerHTML = "Error with contacts";
        theHolder.appendChild(theMessage);
    }
}

function hammerTime(){
    //console.log('hammerTime fired');
    for(var loop = 0; loop < 12; loop++){
        generateContactModal(loop,1);   //cannot figure out how to handle more than one phone number
    }
    
var app = {
  wrapper: document.querySelector('.hammered'),
  mc: null,
  modal:null,
  addListeners: function(){
    app.mc = new Hammer(app.wrapper);
    app.mc.on("tap doubletap", function(ev) {
      if( ev.type == "tap"){
        //console.log('single tap (default hammer)');
         //alert(ev.currentTarget.id);
        //app.modal = document.getElementById("single");
        //generateContactModal();
      }else{
        loadGeolocation(ev);
      }
      
        
    //I understand now that all this code for the function HammerTime is beyond inefficient (and even throws errors....) I spent too much time trying to learn how to work hammer js as this was the first time I had used it. I didnt understand it and should have asked more questions about it. I will be researching this and making my hammer JS much better in future code
        
    var c0 = document.getElementById("c0"); var c1 = document.getElementById("c1"); var c2 = document.getElementById("c2"); 
    var c3 = document.getElementById("c3"); var c4 = document.getElementById("c4"); var c5 = document.getElementById("c5");
    var c6 = document.getElementById("c6"); var c7 = document.getElementById("c7"); var c8 = document.getElementById("c8");
    var c9 = document.getElementById("c9"); var c10 = document.getElementById("c10"); var c11 = document.getElementById("c11"); 
    
    var mc0 = new Hammer(c0); var mc1 = new Hammer(c1); var mc2 = new Hammer(c2); var mc3 = new Hammer(c3); var mc4 = new Hammer(c4);
    var mc5 = new Hammer(c5); var mc6 = new Hammer(c6); var mc7 = new Hammer(c7); var mc8 = new Hammer(c8); var mc9 = new Hammer(c9);
    var mc10 = new Hammer(c10); var mc11 = new Hammer(c11);
        
    mc0.on("tap", function() { app.modal = document.getElementById('contactModal0'); });
    mc1.on("tap", function() { app.modal = document.getElementById('contactModal1'); });
    mc2.on("tap", function() { app.modal = document.getElementById('contactModal2'); });
    mc3.on("tap", function() { app.modal = document.getElementById('contactModal3'); });
    mc4.on("tap", function() { app.modal = document.getElementById('contactModal4'); });
    mc5.on("tap", function() { app.modal = document.getElementById('contactModal5'); });
    mc6.on("tap", function() { app.modal = document.getElementById('contactModal6'); });
    mc7.on("tap", function() { app.modal = document.getElementById('contactModal7'); });
    mc8.on("tap", function() { app.modal = document.getElementById('contactModal8'); });
    mc9.on("tap", function() { app.modal = document.getElementById('contactModal8'); });
    mc10.on("tap", function() { app.modal = document.getElementById('contactModal10'); });
    mc11.on("tap", function() { app.modal = document.getElementById('contactModal11'); });
    
        
      setTimeout(function(){
          try{   
              app.modal.style.display = "block"; 
          }catch(error){
              console.log('error in HammerTime function: '+error);
              alert('Sorry, there was an error.. tap the contact again and it should work');
          }
      }, 350);

      setTimeout(function(){
          try{   
              app.modal.style.display = "none"; 
          }catch(error){
              console.log('error in HammerTime function: '+error);
          }
      }, 2500)
        //ev.target.textContent = ev.type +" gesture detected.";
    });

  }
}

app.addListeners();

}

function generateContactModal(thisContact, totalNumbers){
   //console.log("generateContactModal fired! with ("+thisContact+","+totalNumbers+")");
    var storedString = localStorage.getItem('cook0246_temp_storage2'); //retrieve contact info from localstorage
    var storedObject = JSON.parse(storedString);  //convert data from localstorage to a JSON object 
   // console.log('display name: '+storedObject[thisContact].displayName);
    var newModal = document.createElement('div');
          //alert(storedObject[thisContact].displayName);      
        newModal.innerHTML="<h1>"+storedObject[thisContact].displayName+"</h1>";
    
    if (storedObject[thisContact].phoneNumbers === null){
        console.log(storedObject[thisContact].displayName + ' does NOT have a phone number!');
        newModal.innerHTML+= "<p>No phone numbers found for this contact</p>";
    }
    else{ 
        //console.log(storedObject[thisContact].displayName + ' has a phone number!');
        for(var thisContactNumber = 0; thisContactNumber < totalNumbers; thisContactNumber++){
            //if(storedObject[thisContact].phoneNumbers[1] === null){
             //   console.log("WARNING: "+storedObject[thisContact].phoneNumbers[thisContactNumber]+" does not have a second number");
            //}else{
                newModal.innerHTML+= "<h3>"+storedObject[thisContact].phoneNumbers[thisContactNumber].value+"</h3>";
            //}
                
        }
    }
            
        newModal.innerHTML+="<p>double tap this contact to get the location!</p>";
        newModal.setAttribute('data-role','modal');
        newModal.setAttribute("id","contactModal"+thisContact+"");
        //console.log('created contactModal'+thisContact);
        
        document.body.appendChild(newModal); 
    
}

// B A C K G R O U N D    P R O C E S S I N G

//handle the touchend event
function handleTouch(ev){
  ev.preventDefault();
  ev.stopImmediatePropagation();
  var touch = ev.changedTouches[0];        //this is the first object touched
  var newEvt = document.createEvent("MouseEvent");	
  //old method works across browsers, though it is deprecated.
  newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
  ev.currentTarget.dispatchEvent(newEvt);
  //send the touch to the click handler
}

//handle the click event
function handleNav(ev){
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	loadPage( parts[1] );	
  return false;
}

//Deal with history API and switching divs
function loadPage( url ){
	if(url == null){
		//home page first call
		pages[0].style.display = 'block';
		history.replaceState(null, null, "#one");	
	}else{
    
    for(var i=0; i < numPages; i++){
      if(pages[i].id == url){
        pages[i].style.display = "block";
        //pages[i].className = "active"; //ADDED THIS TO CORRECT ACTIVE CLASS
        history.pushState(null, null, "#" + url);	
      }else{
        pages[i].style.display = "none";
        //pages[i].className = ""; //ADDED THIS TO CORRECT ACTIVE CLASS
      }
    }
    for(var t=0; t < numLinks; t++){
      links[t].className = "";
      if(links[t].href == location.href){
        links[t].className = "activetab";
      }
    }
	}
}

//Need a listener for the popstate event to handle the back button
function browserBackButton(ev){
  url = location.hash;  //hash will include the "#"
  //update the visible div and the active tab
  for(var i=0; i < numPages; i++){
      if(("#" + pages[i].id) == url){
        pages[i].style.display = "block";
      }else{
        pages[i].style.display = "none";	
      }
  }
  for(var t=0; t < numLinks; t++){
    links[t].className = "";
    if(links[t].href == location.href){
      links[t].className = "activetab";
    }
  }
}

//Test for browser support of touch events
function detectTouchSupport(){
  msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
  var touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
  return touchSupport;
    
}