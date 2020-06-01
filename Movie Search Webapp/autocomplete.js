const create_autocomplete = ({autocomplete, render_option, on_movie_option_select, input_value, fetch_data}) => {
    autocomplete.innerHTML = `
    <input class = "input" placeholder = "Search for a Movie"/>
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results"></div>
        </div>
    </div>
`;

const input = autocomplete.querySelector("input");
const dropdown = autocomplete.querySelector(".dropdown");
const results_wrapper = autocomplete.querySelector(".results");

//selecting the value from the user input
const onInput = async (event) => {
    //getting items data via user input
    const items = await fetch_data (event.target.value);

    //closing dropdown if nothing is submitted to API by removing is-active class name
    if (!items.length) {
        dropdown.classList.remove("is-active");
    }

    results_wrapper.innerHTML = "";
    //adding is-active class name to the HTML tag
    dropdown.classList.add("is-active");

    for (let item of items) {
        //creating a tags for various movie poster and movie title
        const movies_options = document.createElement("a");
        

        //adding dropdown-items class name to the HTML tag
        movies_options.classList.add("dropdown-items");

        movies_options.innerHTML = render_option(item);

        //user selecting a particular movie
        movies_options.addEventListener("click", () => {
            dropdown.classList.remove("is-active");
            //pushing selected movie title into search bar
            input.value = input_value(item);
            //user selects movie
            on_movie_option_select(item);
        });

        //appending movie poster and title into div with class name of results_wrapper
        results_wrapper.appendChild(movies_options);
    }
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", event => {
    if (!autocomplete.contains(event.target)){
        //removing is-active class name for dropdown to disappear
        dropdown.classList.remove("is-active");
    }
});
};