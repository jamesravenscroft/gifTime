// var topics["hamilton" "dune" "pad thai" "george carlin" "magic the gathering" "tenacious d" "burritos"]
// add $("#hamilton") button, maybe add  (data-state="still" class="gif") to the end of the array?
//more likely add it to personImg

    // Event listener for all button elements
    $("button").on("click", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var person = $(this).attr("data-person");
  
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=gSuEBAgg2KD239ccHzRWYEpyuMRvPRiG";
  
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "g" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;

                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;



                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

               
                // Creating an image tag
                var personImage = $("<img>");
                
        	personImage.attr("src", staticSrc);
        	personImage.addClass("netflixGiphy");
        	personImage.attr("data-state", "still");
        	personImage.attr("data-still", staticSrc);
        	personImage.attr("data-animate", defaultAnimatedSrc);
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height.url,);
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
              }
            }
          });
      });
  
  
  
  // <!-- *******************************end ajax and rating*****************************************************
  
  // $("#gifs-appear-here").

  
  // oooooooooooooooooooooooooooo Pause for the cause oooooooooooooooooooooooooooooooooooo -->
  
  //Click event on button with id of "show" executes displayNetflixShow function
  // $(document).on("click", "#show", displayNetflixShow);

  //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
  $(document).on("click", ".netflixGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
};







  // $(".gif").on("click", function() {
  //     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  //     var state = $(this).attr("data-state");
  //     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  //     // Then, set the image's data-state to animate
  //     // Else set src to the data-still value
  //     if (state === "still") {
  //       $(this).attr("src", $(this).attr("data-animate"));
  //       $(this).attr("data-state", "animate");
  //     } else {
  //       $(this).attr("src", $(this).attr("data-still"));
  //       $(this).attr("data-state", "still");
  //     }
  //   });
  