import Realm from 'realm';

const realm = new Realm({
    path: "myrealm",
    schema: [
        {
          name: 'Todos',
          properties: {
            title: 'string',
            body: 'string',
            status: 'string',
            dueDate: 'date'
          },
        },
      ],
});

function postTodo(title,body,status,dueDate){
        realm.write(() => {
            task1 = realm.create("Todos", {
              title: title,
              body: body,
              dueDate:dueDate,
              status: status
            });
        });
}

function getAllTodo(){
    return realm.objects("Todos")
}

function updateTodo(title,body,status,dueDate){
  todo = filterTodo("title = " + title)
  realm.delete(todo)
  realm.write(() => {
    task1 = realm.create("Todos", {
      title: title,
      body: body,
      dueDate:dueDate,
      status: status
    });
});
}

function filterTodo(querry){
  const todos = realm.objects("Todos")
  return todos.filtered(querry)
}



export {postTodo,getAllTodo, updateTodo, filterTodo}