
$(function() {
    // console.log("page loaded");
})

// Initial array 
var directors = ["guillermo del toro", "robert rodriguez", "quentin tarantino", "john carpenter", "george romero", "spielberg", "martin scorcese", "cohen brothers", ];

// Function for displaying data
function renderButtons() {

    // Deleting the buttons prior to ADDING NEW MOVIE BUTTONS
    // (this is necessary otherwise will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array
    for (var i = 0; i < directors.length; i++) {
        // Then dynamicaly generating buttons for each director in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var b = $("<button class='btn btn-info'>");
        // Adding a class of director-btn to our button
        b.addClass("director-btn");
        // Adding a data-attribute
        b.attr("data-name", directors[i]);
        // Providing the initial button text
        b.text(directors[i]);
        // console.log(b);

        // Adding the button to the buttons-view div
        $("#buttons-view").append(b);
    }
};    
  
// displayRatingInfo function re-renders the HTML to display the appropriate content
function displayRatingInfo() {

    var h = $(this).attr('data-name');
    // console.log(this);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + h + "&api_key=gSuEBAgg2KD239ccHzRWYEpyuMRvPRiG&limit=10";
    // console.log(queryURL);
    // Creating an AJAX call for the specific director button being clicked
    $.ajax({
        url:queryURL, 
        method: 'GET'
    }).then(function(response) {
        var results = response.data;
        // console.log(results);

        $('#directors-view').empty();

            for(var i=0; i < results.length; i++) {
            // Creating a div to hold the directors-form
                var directorsDiv = $("<div class='directorsDiv'>"); 
                var rating = results[i].rating;
                // console.log(rating);
                var p = $("<p>").text("Rating: " + rating);
                var directorImage = $("<img>");

                directorImage.attr("src", results[i].images.fixed_height_still.url);
                directorImage.attr("data-still", results[i].images.fixed_height_still.url);
                directorImage.attr("data-animate", results[i].images.fixed_height.url);
                directorImage.attr("data-state", "still")
                directorImage.attr("class", "pause")

                directorsDiv.prepend(p);
                directorsDiv.prepend(directorImage);

                $('#directors-view').prepend(directorsDiv);

                // $('#directors-view').prepend("<p>Rating: " + response.data[i].rating + "</p>");
                // $('#directors-view').prepend("<img src='" + response.data[i].images.fixed_width_still.url + "'>");
            }
        });
};

// $('#buttons-view').on('click', '.gif', displayRatingInfo) 

// This function handles events when the submit button is clicked
$('#add-director').on('click', function(event) {
    // alert("Button Clicked!");

    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var director = $("#directors-input").val().trim();
    // console.log(director);

    // The director entered from the textbox is then added to our array
    directors.push(director);

    // Putting the entire form above the previous gifs
   

    // calling renderButtons which handles the processing of  array
    renderButtons();
});

$('#directors-view').on('click', '.pause', function() {
    // alert("button clicked!")
   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
   var state = $(this).attr("data-state");
//    console.log(state);
   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
   // Then, set the image's data-state to animate
   // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
 });

// ================EVENTS=================================
// $(document).on('click', '#add-director');

// Added a click event listener to all elements with a class of "director-btn"
$(document).on('click', '.director-btn', displayRatingInfo);
// $(document).on('click', '', function() {} );

// calling the renderButtons function
renderButtons();



