//Define UI Variables
const form =document.querySelector('#task-form');
const taskInput =document.querySelector('#task');
const taskList =document.querySelector('.collection');
const clearbtn =document.querySelector('.clear-tasks');
const filter =document.querySelector('#filter');


//Function to Load all event Listeners
loadEventListeners();

//Create function
function loadEventListeners(){
 //Dom Load event
 document.addEventListener('DOMContentLoaded', getTasks);
 //Add task event/form
 form.addEventListener('submit', addTask);
 //Remove task event
 taskList.addEventListener('click', removeTask);
 //clear task event
 clearbtn.addEventListener('click', clearTasks);
//  Filter tasks event
filter.addEventListener('keyup', filterTasks);

};
//GET Tasks from Ls
function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks') === null){
     tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task){
      //Create li element
      const li = document.createElement('li');
      //Add Class
      li.className = "collection-item"
      //Create text node and append to li
      li.appendChild(document.createTextNode(task));  
      //Create new link  element
      const link =document.createElement('a');
      //Add Class
      link.className = "delete-item secondary-content";
      //Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      //Append the link to li
      li.appendChild(link);

      //APPEND LI TO UL

      taskList.appendChild(li);

   });
}
//Add task function

function addTask(e){ 
  if(taskInput.value === ''){
     alert('Add a Task');
  }
  //Add task but task goes nowhere thus create li element
  //Create li element
 const li = document.createElement('li');
 //Add Class
 li.className = "collection-item"
 //Create text node and append to li
 li.appendChild(document.createTextNode(taskInput.value));  
 //Create new link  element
const link =document.createElement('a');
//Add Class
link.className = "delete-item secondary-content";
//Add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
//Append the link to li
li.appendChild(link);

//APPEND LI TO UL

taskList.appendChild(li);

//Store in local storage
storeTaskInLocalStorage(taskInput.value);

// clear input
taskInput.value = '';
 e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task){
   let tasks;
   if(localStorage.getItem('tasks') === null){
     tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);

   localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Remove single Task
function removeTask(e){
 if(e.target.parentElement.classList.contains('delete-item')){ 
    if(confirm('Are you sure?')){
  e.target.parentElement.parentElement.remove();
     
   //Remove from LocalStorage
   removeTaskFromLocalStorage(e.target.parentElement.parentElement);

   }
   e.preventDefault();
 }
}
//REmove from ls function
function removeTaskFromLocalStorage(taskItem){
   let tasks;
   if(localStorage.getItem('tasks') === null){
     tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
         tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear All Tasks
function clearTasks(e){
   // taskList.innerHTML = '';
   // https://jsperf.com/innerhtml-vs-removechild/47  resource
   while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
   }
   // clear from LS
   clearTasksFromLocalStorage();
   e.preventDefault
};
//clear Tasks from Ls
function clearTasksFromLocalStorage(){
   localStorage.clear();
}
//Function Filter tasks
 
function filterTasks(e){
 const text = e.target.value.toLowerCase();
 
 document.querySelectorAll('.collection-item').forEach
 (function(task){
   const item =task.firstChild.textContent;
   if(item.toLowerCase().indexOf(text) !==-1){
      task.style.display ='block';

   }else{
      task.style.display ='none';
   }
 });
 
}