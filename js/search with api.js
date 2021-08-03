$(function () {

    var url = 'http://www.omdbapi.com/?apikey=3ced75e3&';
    function displaySearchResults() {
        var value = $('.search-area > input').val();



        search(value);
    }

    function search(value) {
        var results = $('.search-results');

        $.getJSON(url + 's=' + value + '&r=json', function (data) {
            results.fadeOut(400, function () {
                results.empty();

                for (var i in data.Search) {
                    var mov = data.Search[i];

                    $.getJSON(url + 't=' + mov.Title + '&r=json', function (movieData) {
                        
                            var item = $('<div></div>').addClass('item col-xs-6 col-md-3')
                                .appendTo(results)
                                .click(function () {
                                    console.log(mov);
                                });
                                var Runtime = movieData.Runtime; 
                            var genre = movieData.Genre == undefined ? '' : movieData.Genre;
                            var year = movieData.Year;
                            if (year.includes('–')) {
                                year = year.substring(0, year.length - 1);
                            }
    
                            var well = $('<div></div>').addClass('well')
                                .appendTo(item)
                                .html(movieData.Title + '<br>' + year + '<br>' + genre + '<br>' + Runtime + '');
    
    
    
                            $('<img/>').attr('src', movieData.Poster).appendTo(well);
                    });
                }
                $(this).fadeIn(800);
            });

        });
    }



    search('top');

    $('.search-area > button').click(displaySearchResults);
});