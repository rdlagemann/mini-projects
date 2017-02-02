var searchData;

// autocomplete from http://w3lessons.info/2015/03/01/autocomplete-search-using-wikipedia-api-and-jquery-ui/
$("#search-field").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                searchData = data;
                response(data[1]);
            }
        });
    }
});

$("#search-field").on("keyup", searchResults);

function searchResults(e) {
    if (e.keyCode == 13) {
        var resNode = document.getElementById("res-area");
        while (resNode.firstChild) {
            resNode.removeChild(resNode.firstChild);
        }
        for (var i = 0; i < searchData[1].length; i++) {
            $(".results-area").append('<div class="res-cell"><a id="result-link" href="' +
                searchData[3][i] + '" target="_blank"><h2 id="result-title">' +
                searchData[1][i] + '</h2><p id="description">' +
                searchData[2][i] + '</p></a></div>');
        }

    }

}
