// Main DOM elements
const container = document.querySelector('.container');
const movieForm = document.getElementById('movie-form');
const movieTableBody = document.getElementById('movie-table-body');

// Movie class for handling input values
class Movie{
    constructor(name, category, year, director){
        this.name = name;
        this.category = category;
        this.year = year;
        this.director = director;
    }

    storeMovieLocally(){
        let names, categories, years, directors;

        if(localStorage.getItem('names') === null){
            names = [];
        } else{
            names = JSON.parse(localStorage.getItem('names'));
        }

        names.push(this.name);

        if(localStorage.getItem('categories') === null){
            categories = [];
        } else{
            categories = JSON.parse(localStorage.getItem('categories'));
        }

        categories.push(this.category);

        if(localStorage.getItem('years') === null){
            years = [];
        } else{
            years = JSON.parse(localStorage.getItem('years'));
        }

        years.push(this.year);

        if(localStorage.getItem('directors') === null){
            directors = [];
        } else{
            directors = JSON.parse(localStorage.getItem('directors'));
        }

        directors.push(this.director);

        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('years', JSON.stringify(years));
        localStorage.setItem('directors', JSON.stringify(directors));
    }
}

// UI class for manipulating the DOM
class UI{
    addMovieUI(movieData){

        const tableRow=document.createElement('tr');
        tableRow.id = 'table-row';
        tableRow.innerHTML = `
            <td>${movieData.name}</td>
            <td>${movieData.category}</td>
            <td>${movieData.year}</td>
            <td>${movieData.director}</td>
            <td><a class="delete-btn" href="#">Delete</a></td>
        `;
        movieTableBody.appendChild(tableRow);
    }

    clearInput(){
        document.getElementById('movie-name').value='';
        document.getElementById('movie-category').value='';
        document.getElementById('movie-year').value='';
        document.getElementById('movie-director').value='';
    }

    validationFail(e){
        let element, validity;
        
        element = e.target;
        validity = element.validity;
        
        let ruleNames = [];
        let forEach = Array.prototype.forEach;
        // Storing the rule names inside an array
        const ruleElements = document.querySelectorAll('span[data-rule]');
        
        forEach.call(ruleElements, function(element){
            let ruleName = element.getAttribute('data-rule');
            
            if(ruleNames.indexOf(ruleName) < 0){
                ruleNames.push(ruleName);
            }
            });

        if(!validity.valid){
            ruleNames.forEach(function(ruleName){
                if(validity[ruleName]){
                    let rule = element.parentNode.querySelector('[data-rule="' + ruleName + '"]');
                    rule.classList.remove('hide');
                }
            })
        }
        
        e.preventDefault();
    }

    validate(){
        let validationMessages = document.querySelectorAll('form div span');

        validationMessages.forEach(function(validationMessage){
            validationMessage.classList.add('hide');
        });
        movieForm.checkValidity();
    }

    deleteMovieUI(e){
        if(e.target.classList.contains('delete-btn')){
            e.target.parentNode.parentNode.classList.add('hide');
        }

        let names, categories, years, directors;

        if(localStorage.getItem('names') === null){
            names = [];
        } else{
            names = JSON.parse(localStorage.getItem('names'));
        }

        if(localStorage.getItem('categories') === null){
            categories = [];
        } else{
            categories = JSON.parse(localStorage.getItem('categories'));
        }

        if(localStorage.getItem('years') === null){
            years = [];
        } else{
            years = JSON.parse(localStorage.getItem('years'));
        }

        if(localStorage.getItem('directors') === null){
            directors = [];
        } else{
            directors = JSON.parse(localStorage.getItem('directors'));
        }


        for(var i = 0; i < names.length; i++){
            if(names[i] === e.target.parentNode.parentNode.firstChild.textContent){
                names.splice(i, 1);
                categories.splice(i, 1);
                years.splice(i, 1);
                directors.splice(i, 1);
            }
        }

        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('years', JSON.stringify(years));
        localStorage.setItem('directors', JSON.stringify(directors));
    }

    persistMovieList(){
        let names, categories, years, directors;

        if(localStorage.getItem('names') === null){
            names = [];
        } else{
            names = JSON.parse(localStorage.getItem('names'));
        }

        if(localStorage.getItem('categories') === null){
            categories = [];
        } else{
            categories = JSON.parse(localStorage.getItem('categories'));
        }

        if(localStorage.getItem('years') === null){
            years = [];
        } else{
            years = JSON.parse(localStorage.getItem('years'));
        }

        if(localStorage.getItem('directors') === null){
            directors = [];
        } else{
            directors = JSON.parse(localStorage.getItem('directors'));
        }

        for(var i = 0 ; i < names.length; i++){
            const tableRow=document.createElement('tr');
            tableRow.id = 'table-row';
            tableRow.innerHTML = `
                <td>${names[i]}</td>
                <td>${categories[i]}</td>
                <td>${years[i]}</td>
                <td>${directors[i]}</td>
                <td><a class="delete-btn" href="#">Delete</a></td>
                `;
            movieTableBody.appendChild(tableRow);
        }
    }
}

// Assigning the UI class to a constant
const ui = new UI();

// Event Listeners
document.addEventListener('DOMContentLoaded', validation);
document.addEventListener('DOMContentLoaded', ui.persistMovieList);
movieForm.addEventListener('submit', addMovie);
movieTableBody.addEventListener('click', ui.deleteMovieUI)

// Function for adding movies to the list
function addMovie(e){
    
    // Assigning the values of the input fields to a constant
    const name = document.getElementById('movie-name').value;
    const category = document.getElementById('movie-category').value;
    const year = document.getElementById('movie-year').value;
    const director = document.getElementById('movie-director').value;
    
    // Assigning the Movie class to a constant
    const movieData = new Movie(name, category, year, director);
    
    // Adding the movie to the list
    ui.addMovieUI(movieData);

    // Storing the information about the movie(name, category, year, director)
    // to the localStorage
    movieData.storeMovieLocally();

    // Clearing the input fields
    ui.clearInput();

    e.preventDefault();
}

//Function for displaying custom validation messages
function validation(){

    let inputElements = document.querySelectorAll('input:not(button)');
    inputElements.forEach(function(input){
        input.oninvalid = ui.validationFail;
        input.onblur = ui.validate;
    })
    
}