const subBtn=document.querySelector('#subBtn')
const key='AIzaSyAVVZYeRXzd-4s5j14oLESV6wmHGF071Gk'
const upLoad=document.querySelector('#upLoad')


upLoad.addEventListener('submit',function(e){
  e.preventDefault()

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
         "type": "WEB_DETECTION"
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
      document.querySelector('.landmark-Result').innerHTML +=`${data.responses[0].landmarkAnnotations[0].description}<br>`;
      for(let i=0;i<5;i++){
            document.querySelector('.labels-Result').innerHTML +=`${data.responses[0].labelAnnotations[i].description}<br>`
  };

  // console.log(data.responses[0].webDetection.pagesWithMatchingImages[0].url)

  for(let i=0;i<5;i++){
    let webUrl=data.responses[0].webDetection.pagesWithMatchingImages[i].url
    let webName=data.responses[0].webDetection.webEntities[i].description
            document.querySelector('.WebSite-Result').innerHTML +=`<a href= ${webUrl}>${webName}</a><hr>`

            // `${webUrl}<br>`

            // <a href="https://www.w3schools.com">Visit W3Schools.com!</a>
};



    })


    let newImg = document.createElement('img')
      newImg.src =url
      newImg.style.width = '20vw';
      newImg.style.height = '20hw';
      newImg.style.margin = '10px';
      // newImg.id=
      document.querySelector('.box4').appendChild(newImg)





})
