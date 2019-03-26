// Main DOM elements
const container = document.querySelector('.container');
const movieForm = document.getElementById('movie-form');

// Movie class for handling input values
class Movie{
    constructor(name, category, year, director){
        this.name = name;
        this.category = category;
        this.year = year;
        this.director = director;
    }
}

// UI class for manipulating the DOM
class UI{
    addMovieUI(movieData){
        const movieTable = document.getElementById('movie-table-body');

        const tableRow=document.createElement('tr');
        tableRow.id = 'table-row';
        tableRow.innerHTML = `
            <td>${movieData.name}</td>
            <td>${movieData.category}</td>
            <td>${movieData.year}</td>
            <td>${movieData.director}</td>
            <td><a id="delete-btn" href="#">Delete</a>
        `;
        movieTable.appendChild(tableRow);
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
    
}

// Event Listeners
document.addEventListener('DOMContentLoaded', validation);
movieForm.addEventListener('submit', addMovie);

// Function for adding movies to the list
function addMovie(e){
    

    const name = document.getElementById('movie-name').value;
    const category = document.getElementById('movie-category').value;
    const year = document.getElementById('movie-year').value;
    const director = document.getElementById('movie-director').value;
    
    const movieData = new Movie(name, category, year, director);
    
    // Validation of the input

    const ui = new UI();
    ui.addMovieUI(movieData);
    ui.clearInput();
    ui.validate();
    e.preventDefault();
}

//Function for displaying custom validation messages
function validation(){
    const ui = new UI();

    let inputElements = document.querySelectorAll('input:not(button)');
    inputElements.forEach(function(input){
        input.oninvalid = ui.validationFail;
        input.onblur = ui.validate;
    })
    
}
