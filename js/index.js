const movieList = document.getElementById("movielist")

fetch(`http://localhost:3000/films`)
    .then(function (response) {
        return response.json()
    })
    .then(function (Data) {
        console.log(Data);
        Data.forEach((films,index )=> {
            const list = document.createElement(`li`)
            list.innerHTML = films.title
            list.addEventListener(`click`,function(){
                fetch(`http://localhost:3000/films/${films.id}`)
                .then(function(response){
                    return response.json()
                })
                .then(function(Data){
                    console.log(Data)
                    getMovieDetails(Data)
                })
            } )
          movieList.appendChild(list)
          if(index === 0){
           getMovieDetails(films)
          }
        });
    })
    const movieDetails = document.getElementById("movie-details")
    
     
    function getMovieDetails(films){
   movieDetails.innerHTML =``
    const movieTitle = document.createElement(`p`)
    const movieRuntime = document.createElement(`p`)
    const movieCapacity= document.createElement(`p`)
    const movieShowtime= document.createElement(`p`)
    const movieTicketsSold = document.createElement(`p`)
    const movieDescription = document.createElement(`p`)
    const moviePoster = document.createElement(`img`)
    const buyTicket = document.createElement(`button`)
    movieTitle.innerHTML = films.title
    movieRuntime.innerHTML = `Runtime : ${films.runtime} minutes`
   //  movieCapacity.innerHTML =`Cpacity : ${films.capacity}`
    movieShowtime.innerHTML = `Showtime : ${films.showtime}`
    movieTicketsSold.innerHTML =`Tickets available: ${films.capacity - films.tickets_sold}`
    movieDescription.innerHTML = films.description
    moviePoster.src = films.poster
    buyTicket.innerHTML = `Buy Ticket`
    buyTicket.style.display = `block`
    buyTicket.addEventListener(`click`,function(){
        const availableTickets = films.capacity - films.tickets_sold
        if(availableTickets > 0){
            films.tickets_sold +=1
            movieTicketsSold.innerHTML =`Tickets available: ${films.capacity - films.tickets_sold}`
            if((films.capacity - films.tickets_sold)===0){
                buyTicket.innerHTML = `Sold Out`

            }
        }

    })
    
    movieDetails.appendChild(movieTitle)
    movieDetails.appendChild(movieRuntime)
    movieDetails.appendChild(movieCapacity)
    movieDetails.appendChild(movieShowtime)
    movieDetails.appendChild(movieTicketsSold)
    movieDetails.appendChild(movieDescription)
    movieDetails.appendChild(buyTicket)
    movieDetails.appendChild(moviePoster)


    }
    


    