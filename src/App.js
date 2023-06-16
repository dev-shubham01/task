import { useEffect, useState } from "react";
import { Button } from "shards-react";
import { FormGroup, Input, Badge } from "reactstrap";
import "./styles.css";
import Spinner from "./Spinner/Spinner";
import { AiFillDelete } from "react-icons/ai";
export default function App() {
  const [id, setId] = useState(1);
  const [formData, setFormData] = useState([]);
  const [todoNew, setTodoNew] = useState("");
  const [todoNewCheck, setTodoNewCheck] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteTask = (id) => {
    let arr = [];
    formData.forEach((item) => {
      if (item.id !== id) arr.push(item);
    });

    setFormData(arr);
    // console.log(arr);
  };

  const changeStatus = (id, status) => {
    let arr = [];
    formData.forEach((item) => {
      if (item.id !== id) arr.push(item);
      else arr.push({ ...item, completed: !item.completed });
    });

    setFormData(arr);
    // console.log(arr);
  };

  useEffect(() => {
    try {
      const url = "https://dummyjson.com/todos";
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setFormData(res.todos);
          setLoading(true);
          setId(1);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <h1 className="page-title" style={{ textAlign: "center" }}>
        My To Do List
      </h1>
      <h2 style={{ textAlign: "center" }} className="page-sub-title">
        Be productive
      </h2>

      {/* {todoNew} */}
      <div className="add-todo">
        <h4 className="title">Add a new task</h4>
        <div className="add-todo-div">
          <div className="add-todo-elements-input">
            <label className="add-work" htmlFor="todo">
              Task Name
            </label>
            <input
              type="text"
              onChange={(e) => setTodoNew(e.target.value)}
              placeholder="Add Todo"
              id="todo"
              className="add-work-input"
              value={todoNew}
            />
          </div>
          <div className="add-todo-elements-check">
            <div className="add-work" htmlFor="todo">
              Task Status
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              {/* <input type="checkbox" id="check" onChange={() => {}} /> */}
              <label htmlFor="check" className="check-label">
                {todoNewCheck ? "Done " : "To Do"}
              </label>
              <FormGroup switch>
                <Input
                  type="switch"
                  role="switch"
                  id="check"
                  onClick={() => {
                    setTodoNewCheck(!todoNewCheck);
                  }}
                  className="checkbox"
                />
              </FormGroup>
            </div>
          </div>
          <div className="add-todo-elements">
            <Button
              onClick={() => {
                setFormData([
                  {
                    id: `new${id}`,
                    todo: todoNew,
                    completed: todoNewCheck,
                    userId: "GFG"
                  },
                  ...formData
                ]);
                setTodoNew("");
                setId(id + 1);
              }}
              disabled={!todoNew}
              theme="success"
              size="md"
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>

      <div className="todo">
        <h4 className="title">Todo Tasks List</h4>
        {/* {console.log(formData)} */}
        {loading && formData ? (
          formData.map((item) => (
            <div
              className={item.completed ? "todo-list-done" : "todo-list"}
              key={item.id}
            >
              <div className={item.completed ? "status-done" : "status-todo"}>
                {item.completed ? "Done" : "To Do"}
              </div>
              <div>
                <p className="p-0 pt-2 m-0">{item.todo}</p>
                <Badge className="p-1 px-2" color="primary">
                  User ID: {item.userId}
                </Badge>
              </div>

              <div></div>
              <div className="d-flex align-items-center justify-content-end">
                <div className="d-flex flex-column align-items-start justify-content-start status-todo-toggle mr-4">
                  <FormGroup switch>
                    <Input
                      type="switch"
                      role="switch"
                      id="toogle"
                      onChange={() => {
                        changeStatus(item.id, item.completed);
                      }}
                      className="toggle"
                      checked={item.completed}
                    />
                  </FormGroup>
                  <p className="m-0 p-0 text-align-center">
                    {item.completed ? "Done" : "To Do"}
                  </p>
                </div>
                <Button
                  theme="danger"
                  size="sm"
                  onClick={() => {
                    deleteTask(item.id);
                  }}
                >
                  <AiFillDelete style={{ fontSize: "18px" }} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
