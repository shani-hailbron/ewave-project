const dom={
    newMovieForm: document.newMovie,
    btn_goToHomePage: document.querySelector('.btn_goToHomePage'),
}

dom.btn_goToHomePage.onclick=()=>{
    location.href='/index.html';
}
let i = 10;

dom.newMovieForm.onsubmit = (event)=>{
    event.preventDefault();
    const movie={
        id:i,
        movieName:  event.target.movieName.value,
        imagePath:"./images/10.jpg",
        rating: event.target.rating.value,
        category:  event.target.categorySelected.value,
    };
    i++;
    console.log(movie);
    dom.newMovieForm.movieName.value='';
    dom.newMovieForm.rating.value='';
    dom.newMovieForm.categorySelected.selectedIndex=0;
    fetchAddNewMovie(movie);
}

//adding a new movie
const fetchAddNewMovie = (obj)=>{
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://localhost:44374/api/values/AddNewMovie",
        data: JSON.stringify(obj),
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        success: (response) =>{
           if(response===1){
              alert('The movie was successfully added'); 
           }
           if(response===0){
            alert('There is a movie by that name');
           }
           
        },
        error: (err)=> {
            console.log(err);
        }
      });
}