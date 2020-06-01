//api key from http://www.omdbapi.com/
let api_key = "3ceb54ba";

const auto_complete_config = {

    //render_option returns movie poster and movie title
    render_option(movie) {
        //if movie poster link is N/A, assign empity link to img tag
        const img_src = movie.Poster === "N/A" ? "" : movie.Poster;

        return `
        <img src = "${img_src}" />
        ${movie.Title} (${movie.Year})
        `;
    },

    input_value(movie) {
        return movie.Title;
    },

    //fetching data from the movie api
    //searchTerm is whatever the user types in the search bar
    async fetch_data(searchTerm) {
        //making a request with axios
        const feedback = await axios.get('https://www.omdbapi.com/', {
            //parameters for the api to function
            params: {
                apikey: api_key,
                s: searchTerm
            }
        });
        //return empty array if feedback from api is N/A
        if (feedback.data.Error) {
            return [];
        }

        return feedback.data.Search;
    }

};

create_autocomplete({
    //creating a copy of auto_complete_config objetc
    ...auto_complete_config,
    autocomplete: document.querySelector("#left-autocomplete"),

    on_movie_option_select(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        movie_selection(movie, document.querySelector("#left-summary"));
    }
});

create_autocomplete({
    //creating a copy of auto_complete_config objetc
    ...auto_complete_config,
    autocomplete: document.querySelector("#right-autocomplete"),

    on_movie_option_select(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        movie_selection(movie, document.querySelector("#right-summary"));
    }
});

//helper function for a follow up request
const movie_selection = async(movie, summary_element) => {
    //making a request with axios
    const feedback = await axios.get('https://www.omdbapi.com/', {
        //parameters for the api to function
        params: {
            apikey: api_key,
            i: movie.imdbID
        }
    });


    summary_element.innerHTML = movie_template(feedback.data);
};


//helper fucntion for movie details extration
const movie_template = (movie_details) => {
    return `
        <article class = "media">
            <figure class = "media-left">
                <p class = "image">
                    <img src = " ${movie_details.Poster} " />
                </p>
            </figure>

            <div class = "media-content">
                <div class = "content">
                    <h1>${movie_details.Title} (${movie_details.Year})</h1>
                    <h4>${movie_details.Genre}</h4>
                    <p>${movie_details.Plot}</p>
                </div>
            </div>
        </article>

        <article class = "notification is-link">
            <p class = "title">${movie_details.Awards}</p>
            <p class = "subtitle">Awards</p>
        </article>

        <article class = "notification is-link">
            <p class = "title">${movie_details.BoxOffice}</p>
            <p class = "subtitle">Box Office</p>
        </article>

        <article class = "notification is-link">
            <p class = "title">${movie_details.Metascore}</p>
            <p class = "subtitle">Metascore</p>
        </article>

        <article class = "notification is-link">
            <p class = "title">${movie_details.imdbRating}</p>
            <p class = "subtitle">IMDB Rating</p>
        </article>

        <article class = "notification is-link">
            <p class = "title">${movie_details.imdbVotes}</p>
            <p class = "subtitle">IMDB Votes</p>
        </article>
    `;;
}