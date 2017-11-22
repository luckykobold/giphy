

//defines animal array and animal variable for use later
var animals = ["wolf", "marmot", "shark"];
var animal;

$(document).ready(function() {
//fires when one of the prebuilt buttons is clicked
  $(".starterGif").on("click", function () {
    event.preventDefault();
    console.log("starterGif clicked");
    animal = this.id;
    console.log(animal);
    fetchGifs();
  }); //end of on click starterGif
//fetches gifs from giphy and
  function fetchGifs () {
    console.log("fetchGifs ran");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=36a7c06c6a1549e4b4fd0dba9159d4f1&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {
        $("#animal-view").text(JSON.stringify(response));
        console.log(response);
        var results = response.data;
        console.log(results);
        var animalDiv = $("<div id='" + animal + "'>" + animal + "</div");
        $("#animalGifs").prepend(animalDiv);

        // at this point, we've got the gifs. need to push to array and push to html with ratings
        for (i=0; i<results.length; i++) {
          var upperCaseRating = results[i].rating.toUpperCase();
          console.log(upperCaseRating);
          var r = ("<p>Rating: " + upperCaseRating + "</p>");
          $(animalDiv).append(r);
          console.log(results[i].images.fixed_height_still.url);
          var fixedHeight = results[i].images.fixed_height.url;
          var fixedHeightStill = results[i].images.fixed_height_still.url;
          var animalImage = $("<img src=" + fixedHeightStill + " data-still=" + fixedHeightStill + " data-animate=" + fixedHeight +" data-state='still' class='gif'>");
          $(animalDiv).append(animalImage);
          }//end for loop

          //animates and stills on click
          $(".gif").on("click", function () {
            console.log("gif clicked");
            var state = $(this).attr("data-state");
            console.log(state);
            var animateURL = $(this).attr("data-animate");
            var stillURL = $(this).attr("data-still");
            if (state === "still") {
              $(this).attr("src", animateURL);
              $(this).attr("data-state", "animate");
              } //end if
            else {
              $(this).attr("src", stillURL);
              $(this).attr("data-state", "still");
              }//end else
            });//end of gif onclick
        });//end of function response

      }// end of fetchGifs


  $("#addAnimal").on("click", function(event) {
    event.preventDefault();
    //empties previous gifs from div
    $("#animalGifs").html("");
    animal = $("#animal-input").val().trim();
    console.log(animal);
    //creates dedicated animal gif button

    function createButton () {
      animal = animal.toUpperCase ();
      $("#animalButtons").append("<button type='button' id='" + animal +"' value=>" + "See " + animal + " gifs</button>");
      animals.push(animal);
      console.log(animals);
    } //end of create button

    createButton ();
    fetchGifs ();

    }); // end of on click of addaninal


  }); // end of doc ready
