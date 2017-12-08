$(document).ready(function() {
    $("button").on("click", function() {
        // "this" is the on click event
        var topic = $(this).attr("data");
        //quert and API url
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";
        // creating a div tag
        var myDiv = $("<div>");
        // ajax code
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            $("#gifs-appear-here").empty();
            // response.data is the info you get from the API
            var results = response.data

            for (var i = 0; i < 6; i++) {
                // creating a for loop for my gifs

                var rating = results[i].rating;
                console.log(rating);

                var myImage = $("<img>"); // creating a var for my img tag
                myImage.attr("src", results[i].images.fixed_height.url);

                myImage.attr("data-animate", results[i].images.fixed_height.url);
                myImage.attr("data-still", results[i].images.fixed_height_still.url);
                myImage.attr("data-state", "still");
                myImage.addClass("gifImage");
            
                $("#gifs-appear-here").prepend(myDiv);
                
                myDiv.append(myImage); // appending my div + image at the end!  
                $("#gifs-appear-here").prepend(myDiv); //prepending my gifs to start adding to the start of my div
            }
            toggleGifs()
        });
    });

    var myButton = $('#add-gif');
    myButton.on("click", function(e) {
        e.preventDefault();
        console.log($("#gif-input").val())
        console.log("anything")

        var topic = $("#gif-input").val();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        var myDiv = $("<div>");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            $("#gifs-appear-here").empty();

            var results = response.data

            for (var i = 0; i < results.length; i++) { //creating a for loop for my gifs

                var rating = results[i].rating;
                console.log(rating);

                var myImage = $("<img>"); // creating a var for my img tag
                myImage.attr("src", results[i].images.fixed_height.url);
                myDiv.append(myImage); // appending my div + image at the end!  
                $("#gifs-appear-here").prepend(myDiv); //prepending my gifs to start adding to the start of my div
            }
        });


    })

    var toggleGifs = function () {
        $("img").on("click", function() {
            if($(this).attr("data-state") == "still") {
                $(this).attr("src", $(this).attr("data-animate"))
                $(this).attr("data-state", "animate")
            } else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still")
            }
        })
    }

})