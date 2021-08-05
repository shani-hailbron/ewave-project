
const dom = {
    container: document.getElementById('container'),
    selected :document.getElementById('categorySelected'),
    btn_addNewMovie : document.querySelector('.btn_addNewMovie'),
}

const data = {
    movies:[],
    currentFilter:[],
};

dom.btn_addNewMovie.onclick = ()=>{
    console.log('add');
    location.href='/addNewMovie.html'; 
}


dom.selected.onchange = ()=>{
    sortByCategory(); 
}

//sort by category
const sortByCategory = ()=>{
    dom.container.innerHTML='';
    let option = dom.selected.options[dom.selected.selectedIndex].value;
    switch(option){
        case 'All':{
            printMovies(data.movies);
            break;
        }
        case 'History':{
            data.currentFilter = data.movies.filter(m=>m.category==='History');
            printMovies(data.currentFilter);
            break;
        }
        case 'Science':{
            data.currentFilter = data.movies.filter(m=>m.category==='Science');
            printMovies(data.currentFilter);
            break;
        }
        case 'Children':{
            data.currentFilter = data.movies.filter(m=>m.category==='Children');
            printMovies(data.currentFilter);
            break;
        }
        case 'Tension':{
            data.currentFilter = data.movies.filter(m=>m.category==='Tension');
            printMovies(data.currentFilter);
            break;
        }
    }
}



const printMovies = (arr)=>{
    const divs = arr.map(movie=>{
        console.log(movie);
        const url = new URL('/detailsMovie.html', location.href);
        url.searchParams.set('id' ,movie.id);
        sessionStorage.setItem(`id:${movie.id}`, JSON.stringify(movie));

        const div = document.createElement('div');
        div.classList.add('col-lg-3');
        div.classList.add('d-flex');
        div.classList.add('flex-column');
        div.classList.add('bd-highlight');
        div.classList.add('m-3');

        const a_img = document.createElement('a');
        const image = document.createElement('img');
        image.src=movie.imagePath;
        image.classList.add('img-fluid');
        a_img.href=url.href;
        a_img.appendChild(image);
        div.appendChild(a_img);

        const h3 = document.createElement('h3');
        h3.innerHTML=movie.movieName;
        h3.classList.add('bg-light');
        h3.classList.add('text-center');
        div.appendChild(h3);
      return div;
    });
    dom.container.append(...divs);
}


//sort by rating
const sortByRating = (arr)=>{
  arr.sort((a,b)=>{
      if(a.rating > b.rating)
        return -1;
      return 1;
  })
  return arr;
}


const fetchMovies = ()=>{
    $.ajax({
        url:'https://localhost:44374/api/values/GetAllMovies',
        type: 'GET',
        success:(_data)=>{
            data.movies.push(...sortByRating(_data)) ;
            printMovies(data.movies);
        },
        error:()=>{
            console.log('error');
        }
    });
}


fetchMovies();