// const subBtn=document.querySelector('#subBtn')
const key='AIzaSyAVVZYeRXzd-4s5j14oLESV6wmHGF071Gk'
const upLoad=document.querySelector('#upLoad')


upLoad.addEventListener('submit',function(e){
  e.preventDefault()
  document.querySelector('.labels-Result').innerHTML ='';
  document.querySelector('.WebSite-Result').innerHTML='';
  document.querySelector('.landmark-Result').innerHTML='';

  let url =document.querySelector('#picURL').value;


  let label=  {
      "type":"LABEL_DETECTION",
      "maxResults":5
    };
  let landmark =  {  "type": "LANDMARK_DETECTION",
"maxResults": 1
};
  let webDetection=  {
         "type": "WEB_DETECTION",
           "maxResults":5
       }

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
          label,
        landmark,
        webDetection

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

console.log(data)

      for(let i=0;i<data.responses[0].labelAnnotations.length;i++){
            document.querySelector('.labels-Result').innerHTML +=`${data.responses[0].labelAnnotations[i].description}<hr>`
  };





  if(data.responses[0].landmarkAnnotations){

    console.log('hi',data.responses[0].landmarkAnnotations[0])
    document.querySelector('.landmark-Result').innerHTML= `${data.responses[0].landmarkAnnotations[0].description}<hr>`
    // for(let i=0;i<data.responses[0].landmarkAnnotations.length;i++){
    //   document.querySelector('.landmark-Result').innerHTML +=`${data.responses[0].landmarkAnnotations[i].description}<hr>`;

      let lat= data.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude
      let lng =data.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude

      localStorage.setItem(data.responses[0].landmarkAnnotations[0].description,[lat,lng]);
        map.setCenter(new google.maps.LatLng(lat,lng));

    // }
  }else{
    document.querySelector('.landmark-Result').innerHTML=data.responses[0].webDetection.bestGuessLabels[0].label
  // document.querySelector('.landmark-Result').innerHTML ="Can't found"
  }



console.log(data.responses[0].webDetection.pagesWithMatchingImages)

  for(let i=0;i<data.responses[0].webDetection.pagesWithMatchingImages.length;i++){

    let webUrl=data.responses[0].webDetection.pagesWithMatchingImages[i].url
    let webName=data.responses[0].webDetection.webEntities[i].description
            document.querySelector('.WebSite-Result').innerHTML +=`<a href= ${webUrl}>${webName}</a><hr>`

};






    })
    console.log(url)

    document.getElementById("imageBox").src = url;
    // let img =document.querySelector('.image-blurred-edge').style.backgroundImage = `url(${url})`;


})



let map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:33.439856,lng:-112.066936},
    zoom: 10
  });
}
