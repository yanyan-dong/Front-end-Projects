// Add a new todo

// 1. Add a new constant to the form
const addForm = document.querySelector('.add');

// 3. Want to put the content (2. the value obtained) into the todo list, how to build a function
const list = document.querySelector('.todos'); // Add a constant to ul.todos, which is the todo list

const search = document.querySelector('.search input'); // Add constants to the input in the form

const genetareTemplate = todo => { // Create a template

    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span> 
            <i class="far fa-trash-alt delete"></i>
        </li>
        `;

    // Add a new html to ul
    list.innerHTML += html;

}

// 2. .addEventListener，What event to act on: submit
addForm.addEventListener('submit', e => { // e is a variable that represents the object for which the event is to occur

    e.preventDefault(); // Avoid default values

    // Add a new constant todo, the value of todo is the value of input(name:'new') in the form
    const todo = addForm.new.value.trim(); // trim method removes spaces
    
    if(todo.length){ // The following code can be run only if the value is entered to have a length
        genetareTemplate(todo);
        addForm.reset();
    }

});

// Delete todos
list.addEventListener('click', e => { // .addEventListener: What event to act on: click

    if(e.target.classList.contains('delete')){ // classList.contains: Check if the class contains 'delete'
        e.target.parentElement.remove(); 
        // .target is the element we actually point to
        // parentElement is the upper level of delete class, which is <li>, so delete <li>
    }
});

// How to search and filter
const filterTodos = (term) => {
    Array.from(list.children) //Each value in the ul list. But this is an html collection, so we use Array.from
        .filter((todo) => !todo.textContent.toLowerCase().includes(term)) // Does not contain "searched values"
        .forEach((todo) => todo.classList.add('filtered'));// add filtered class，not display

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))// contain "searched values"
        .forEach((todo) => todo.classList.remove('filtered'));//remove filtered class，display
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase(); // Create constants to get the value in the input box
    filterTodos(term); // Create a reusable function
});