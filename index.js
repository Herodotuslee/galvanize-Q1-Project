const subBtn=document.querySelector('#subBtn')
const key='AIzaSyAVVZYeRXzd-4s5j14oLESV6wmHGF071Gk'
const upLoad=document.querySelector('#upLoad')


upLoad.addEventListener('submit',function(e){
  e.preventDefault()
document.querySelector('.labels-Result').innerHTML ='';
  document.querySelector('.WebSite-Result').innerHTML='';
    document.querySelector('.landmark-Result').innerHTML='';


  let url =document.querySelector('#picURL').value

  let data = {
    "requests":[
      {

        "image":{
          "source":{
            "imageUri":
              url
          }
        },
        "features":[
          {
            "type":"LABEL_DETECTION",
            "maxResults":5
          },
          {  "type": "LANDMARK_DETECTION",
      "maxResults": 2
    },
    {
         "type": "WEB_DETECTION",
           "maxResults":5
       }
        ]
      }
    ]
  }


  fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((data)=> {



      for(let i=0;i<data.responses[0].labelAnnotations.length;i++){
            document.querySelector('.labels-Result').innerHTML +=`${data.responses[0].labelAnnotations[i].description}<hr>`
  };

  for(let i=0;i<data.responses[0].webDetection.pagesWithMatchingImages.length;i++){

    let webUrl=data.responses[0].webDetection.pagesWithMatchingImages[i].url
    let webName=data.responses[0].webDetection.webEntities[i].description
            document.querySelector('.WebSite-Result').innerHTML +=`<a href= ${webUrl}>${webName}</a><hr>`

};

for(let i=0;i<data.responses[0].landmarkAnnotations.length;i++){
  document.querySelector('.landmark-Result').innerHTML +=`${data.responses[0].landmarkAnnotations[i].description}<hr>`;
  // console.log(i)
  //
  let lat= data.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude
  let lng =data.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude

  localStorage.setItem(data.responses[0].landmarkAnnotations[0].description,[lat,lng]);
  // var map;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: 36, lng: 120 },
  //     zoom: 8
  //   });
  //
  // }
  // let lat= data.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude
  // let lng =data.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude

};


    })
    document.getElementById("imageBox").src = url;
})

//
var aValue = localStorage.getItem(keyName);
let lat2 =-30.397
let lng2 =152.644
var map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:lat2,lng:lng2},
    zoom: 10
  });
}
