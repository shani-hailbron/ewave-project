const dom = {
    contant: document.querySelector('.contant'),
    btn_updateMovie: document.getElementById('updateMovie'),
    btn_removeMovie: document.getElementById('removeMovie'),
    btn_goToHomePage: document.querySelector('.btn_goToHomePage'),
    updateForm: document.updateForm,
}

const data = {
    movies:[],
    currentMovie:{},
};

dom.btn_goToHomePage.onclick = ()=>{
    location.href='/index.html';
}


//get movie by id from the sessionStorage
const saveCurrentMovie = ()=>{
    const url = new URL(location.href);
    const id_mov=url.searchParams.get('id');
    console.log(sessionStorage.getItem(`id:${id_mov}`));
    data.currentMovie =  JSON.parse(sessionStorage.getItem(`id:${id_mov}`));
    showCurrentMovie();
}

//show movie details
const showCurrentMovie = ()=>{
    dom.contant.innerHTML='';
    console.log(data.currentMovie);

    const bigDiv = document.createElement('div');
    bigDiv.classList.add('d-flex');
    bigDiv.classList.add('flex-row');
    bigDiv.classList.add('justify-content-between');

    const imageAndNameDiv = document.createElement('div');
    imageAndNameDiv.classList.add('divImgAndName');

    const image = document.createElement('img');
    image.src=data.currentMovie.imagePath;
    image.classList.add('img-fluid');
    imageAndNameDiv.appendChild(image);

    const h3 = document.createElement('h3');
    h3.innerHTML=data.currentMovie.movieName;
    h3.classList.add('bg-light');
    h3.classList.add('text-center');
    imageAndNameDiv.appendChild(h3);
    bigDiv.appendChild(imageAndNameDiv); 

    const innerDiv = document.createElement('div');
    const h2_category = document.createElement('h2');
    h2_category.innerHTML=`Category: ${data.currentMovie.category}`;
    
    const h2_rating = document.createElement('h2');
    h2_rating.innerHTML=`Rating: ${data.currentMovie.rating}`;
    innerDiv.appendChild(h2_category);
    innerDiv.appendChild(h2_rating);
    h2_category.classList.add('d-flex');
    h2_rating.classList.add('d-flex');
    h2_category.classList.add('flex-start');
    h2_rating.classList.add('flex-start');

    bigDiv.appendChild(innerDiv);
    dom.contant.append(bigDiv);
    dom.contant.classList.add('d-flex');
}



//movie update
dom.btn_updateMovie.onclick=()=>{
    dom.updateForm.classList.remove('hidden');
    dom.updateForm.categorySelected.value = data.currentMovie.category;
    dom.updateForm.movieName.value = data.currentMovie.movieName;
    dom.updateForm.rating.value = parseInt(data.currentMovie.rating);
}

dom.updateForm.onsubmit = (event)=>{
    event.preventDefault();
    const movie={
        id: data.currentMovie.id,
        movieName:  event.target.movieName.value,
        imagePath: data.currentMovie.imagePath,
        rating: event.target.rating.value,
        category:  event.target.categorySelected.value,
    };
    debugger;
    console.log(movie);
    fetchUpdate(movie);
}


//movie update
const fetchUpdate = (obj)=>{
    $.ajax({  
        type: 'PUT',
        url: `https://localhost:44374/api/values/UpdateMovie/${data.currentMovie.id}`,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: (response) =>{
          console.log(response + 'response');
          if(response){
             data.currentMovie=obj;
             alert('Successfully update');
             showCurrentMovie();
          }
         else{
            alert('There is a movie by that name');
         }
        },
        error: (errorThrown)=> {
            console.log(errorThrown + "my error");
        }
      });
 }


 //deleting a movie
dom.btn_removeMovie.onclick=()=>{
    $.ajax({
        type: 'Delete',
        url: `https://localhost:44374/api/values/DeleteMovieById/${data.currentMovie.id}`,
        success: (response) =>{
          console.log(response)
          alert('Successfully deleted');
          location.href='/index.html';
        },
        error: ( errorThrown)=> {
            console.log(errorThrown + "my error")          
        }
      });
}


 saveCurrentMovie();

