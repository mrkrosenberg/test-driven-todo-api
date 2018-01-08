// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

var todosCount = 3; //sets the basis for creating new id's

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var queryParam = req.query;
   console.log(queryParam);
   todos.forEach(function(todo, index, array){
    // console.log('here');
    if (todo.task == queryParam.q || todo.description == queryParam.q){
      var searchResult = [];
      searchResult.push(todo);
      res.json({todos : searchResult});
    } else {
      // res.send('Search found no results');
    }
    
   });
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos : todos}); //responds a specific json object called todos

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  var newTask = req.body;  //creating a variable for the new task created from the request (req.body)
   // console.log(newTask);
   if (todos.length > 0) {  //if the todos array has at least one thing in it, run the following code
    todosCount = todosCount + 1;  //increments the todosCount by 1 each time a new one is created, keeping id's unique and always incrementing
    newTask._id = todosCount; //assigns newTask an id based on 
    // console.log(newTask);
   } else {
    newTask._id = 1;
   }

   todos.push(newTask);
   res.json(newTask);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   for (i = 0; i < todos.length; i++) {
    if (todos[i]._id == req.params.id){
      res.json(todos[i]);
    } else {
      console.log('todo with ' + req.params.id + ' not found');
      // res.send('todo with id: ' + req.params.id + ' not found');  //this route doesn't work if this is included
    }
   }
   // res.json(todos[req.params.id -1]);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var updates = req.body;
   // console.log(req.body);
   for (i = 0; i < todos.length; i++){
    // console.log('here');
    if (todos[i]._id == req.params.id){
      var updatedTodo = todos[i];
      updatedTodo.task = updates.task;
      updatedTodo.description = updates.description;
     
    }
    console.log(todos);
   }
    res.json(updatedTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   for (i = 0; i < todos.length; i++){
    if (todos[i]._id == req.params.id) {
      var todo = todos[i];
      todos.splice(i, 1);
      res.json(todo);
    }
   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
