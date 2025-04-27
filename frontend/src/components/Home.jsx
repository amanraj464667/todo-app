import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editMode,setEditMode]=useState(false);
  const [editTaskId,setEditTaskId]=useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      
     const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Task cannot be empty");

    try {
      
     const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task added");
        setTasks([...tasks, data.task]);
        setTitle("");
      }
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  const handleToggle = async (id) => {
    try {
      
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/task/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/task/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };


  const handleEdit = async(e)=>{
    e.preventDefault();
    if(!title.trim()) return toast.error("Task title cannot be empty");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/task/${editTaskId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({title}),
      });
      const data = await res.json();
      if(data.success){
        toast.success("Task updated");
        setTitle("");
        setEditMode(false);
        setEditTaskId(null);
        fetchTasks();
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  }



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    toast.success("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full opacity-20"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {loggedInUser} 👋
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            You're successfully logged in. Here's your to-do list!
          </p>

          <img
            src="https://illustrations.popsy.co/white/web-design.svg"
            alt="hero"
            className="w-64 mx-auto mb-6"
          />
        </div>

        {/* To-Do Section */}
        <div className="relative z-10 max-w-xl mx-auto mb-6">
          {/* <form onSubmit={handleAddTask} className="flex mb-4 gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Add
            </button>
          </form> */}


          
<form onSubmit={editMode ? handleEdit : handleAddTask} className="flex mb-4 gap-2">
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder={editMode ? "Edit task..." : "Add a new task..."}
    className="flex-1 px-4 py-2 border rounded-lg"
  />
  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
    {editMode ? "Update" : "Add"}
  </button>
</form>




          {/* <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <span
                  onClick={() => handleToggle(task._id)}
                  className={`flex-1 cursor-pointer ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul> */}


<ul className="space-y-3">
  {tasks.map((task) => (
    <li
      key={task._id}
      className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
    >
      <span
        onClick={() => handleToggle(task._id)}
        className={`flex-1 cursor-pointer ${
          task.completed
            ? "line-through text-gray-500"
            : "text-gray-800"
        }`}
      >
        {task.title}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setEditMode(true);
            setEditTaskId(task._id);
            setTitle(task.title);
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          ✏️
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    </li>
  ))}
</ul>



        </div>

        <div className="text-center relative z-10">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
