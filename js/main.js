/* gets the images from picsum api */
const getImages = () => {
  const randomPage = Math.floor(Math.random() * (10) + 1);
  axios.get(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then(response => {
      pickRandomImage(response.data);
      console.log(response.data)
    });
  };



/* selects a random image from the data provided */
function pickRandomImage(data){
  let randomImage = Math.floor(Math.random() * (data.length));
  console.log(randomImage);
  let displayImage = data[randomImage];
  let imageUrl = displayImage.download_url;
  let imageId = displayImage.id;
  let imageAuthor = displayImage.author;
  console.log(displayImage);
  $('#unsplash').attr('src', imageUrl);
  $('#unsplash').attr('value', imageId);
  $('#image-id').attr('value', imageId);
  $('#author-name').attr('value', imageAuthor);
  $('#unsplash').attr('class', "base-image")
}

$(document).ready(function() {
  getImages()


  });

/* onClick function for generating a new image */
$(function() {
  imgTagThere = false
  $("#new-image").click(function() {
    $('#image-window').empty();
    if ($('#unsplash').length) {
      getImages()
      console.log('image is there')

    } else {
      $('#image-window').append($("<img id='unsplash' src=''/>"));
      console.log('image is not there')
      getImages()
    };


  });
});



function toggleLink() {
  $(`#input-outer`).toggleClass('active');
  console.log('linked');
}



/* validate email onclick when linking image */
let linkedEmails = { };
let currentImage = [ ];

function linkImage() {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    let emailInput = $('#email-entry').val();
    let currentImageID = $(`#unsplash`).attr("value");
    let currentImageData = {
      download_url: $(`#unsplash`).attr("src"),
      author: $(`#author-name`).attr("value"),
      id: $(`#unsplash`).attr("value")
    };

    currentImage = [currentImageData]
    console.log(currentImage)

    let validEmail = false;
    if (emailInput.match(regex)) {
      console.log('email validated');
      validEmail = true;

    } else {
      console.log('email invalid');
    }
  /* if the email is valid check if the email is already in the object and if so add to object or create new object */


    let emailLinkedAlready = false;
    let imageLinkedAlready = false;


    if (validEmail) {
        for (let item in linkedEmails) {
          if (item == emailInput) {
          console.log("email in list");
          emailLinkedAlready = true;
          break

        }
      }
        if (emailLinkedAlready) {

          for (let item in linkedEmails[emailInput]) {
            if (currentImageID == linkedEmails[emailInput][item]["id"]) {
                console.log('image already linked to email')
                imageLinkedAlready = true;
                break;
            }
          };

          if (imageLinkedAlready) {
                console.log(linkedEmails);
              return;
            };
          console.log("email is already linked item added to object")
          linkedEmails[emailInput].push(currentImageData);

          console.log(linkedEmails)

        } else {

            console.log(currentImage)
            linkedEmails[emailInput] = currentImage;

            console.log(linkedEmails[emailInput])
            $('#email-list').empty();
            listEmail();
      };
    };

  console.log(linkedEmails)
    };



function listEmail() {
  let imageList = $('#email-list')
      for (const item in linkedEmails) {
          $('#email-list').append($("<li onclick ='displayLinked()'  id='"+ item + "'>" + item + " </li>"))
    };
};


function displayLinked() {
    $('#image-window').empty();
    $('#my-button').click();
    console.log("window empty")
    let email = event.target.id
    console.log(email)
    console.log(linkedEmails)
    console.log(linkedEmails[email].length)


    if (linkedEmails[email].length == 1) {
      for (const item in linkedEmails[email]) {
          $(`#image-window`).append($("<img  src='" + linkedEmails[email][item]["download_url"] +"' id='" + linkedEmails[email][item]["id"] + "' class='saved-image-1'>"))
      };
  } else if (linkedEmails[email].length == 2) {
        for (const item in linkedEmails[email]) {
            $(`#image-window`).append($("<img  src='" + linkedEmails[email][item]["download_url"] +"' id='" + linkedEmails[email][item]["id"] + "' class='saved-image-2'>"))
      };
  } else {
        for (const item in linkedEmails[email]) {
            $(`#image-window`).append($("<img  src='" + linkedEmails[email][item]["download_url"] +"' id='" + linkedEmails[email][item]["id"] + "' class='saved-image-3'>"))
      };
    };
  };
