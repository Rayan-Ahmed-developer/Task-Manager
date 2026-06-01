// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ShowTask = () => {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   const getToken = () => localStorage.getItem("token");

//   // GET TASKS
//   const viewTasks = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:7000/api/tasks/getTasks",
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`
//           }
//         }
//       );

//       setTasks(res.data);

//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   // LOAD ON PAGE OPEN
//   useEffect(() => {
//     viewTasks();
//   }, []);

//   // ADD TASK
//   const addTask = async () => {
//     if (task.trim() === "") return;

//     try {
//       await axios.post(
//         "http://localhost:7000/api/tasks/addTask",
//         { text: task },
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`
//           }
//         }
//       );

//       setTask("");
//       viewTasks();

//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   // DELETE TASK
//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:7000/api/tasks/deleteTask/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`
//           }
//         }
//       );

//       viewTasks();

//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">

//       <nav className="bg-gray-950 border-b border-gray-800">
//         <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

//           <h1 className="text-white font-semibold text-lg">
//             Task Manager
//           </h1>

//           <div className="flex gap-2">

//             <button
//               className="bg-blue-600 px-4 py-2 rounded-lg text-white"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </button>

//             <button
//               className="bg-green-600 px-4 py-2 rounded-lg text-white"
//               onClick={() => navigate("/signup")}
//             >
//               Signup
//             </button>

//           </div>

//         </div>
//       </nav>

//       <div className="flex items-center justify-center p-4 mt-10">

//         <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">

//           <h2 className="text-xl text-white mb-4 text-center">
//             Your Tasks
//           </h2>

//           <div className="flex gap-2 mb-4">

//             <input
//               type="text"
//               placeholder="Enter your task..."
//               className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white outline-none"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//             />

//             <button
//               onClick={addTask}
//               className="bg-blue-600 px-4 py-2 rounded-lg text-white"
//             >
//               Add
//             </button>

//           </div>

//           <div className="space-y-2 max-h-80 overflow-y-auto">

//             {tasks.length === 0 ? (
//               <p className="text-gray-400 text-center">
//                 No tasks yet
//               </p>
//             ) : (
//               tasks.map((t) => (
//                 <div
//                   key={t._id}
//                   className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded-lg"
//                 >
//                   <span className="text-white">
//                     {t.text}
//                   </span>

//                   <button
//                     onClick={() => deleteTask(t._id)}
//                     className="text-red-400"
//                   >
//                     Delete
//                   </button>

//                 </div>
//               ))
//             )}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ShowTask;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowTask = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const viewTasks = async () => {
    try {
      const res = await axios.get("https://task-manager-production-d785.up.railway.app/api/tasks/getTasks", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => { viewTasks(); }, []);

  const addTask = async () => {
    if (task.trim() === "") return;
    try {
      await axios.post(
        "https://task-manager-production-d785.up.railway.app/api/tasks/addTask",
        { text: task },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setTask("");
      viewTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://task-manager-production-d785.up.railway.app/api/tasks/deleteTask/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      viewTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">

      {/* NAVBAR */}
      <nav className="bg-[#090c12] border-b border-[#1e2535]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <h1 className="text-[15px] font-semibold text-slate-100 tracking-wide">
              Task Manager
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 rounded-lg text-[13px] font-medium text-slate-400 border border-[#2d3748] hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1.5 rounded-lg text-[13px] font-medium text-blue-200 bg-[#1e40af] border border-[#1d4ed8] hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Sign Up
            </button>
          </div>

        </div>
      </nav>

      {/* MAIN */}
      <div className="flex justify-center p-4 mt-10">
        <div className="w-full max-w-md bg-[#151b27] border border-[#1e2535] rounded-2xl p-7 shadow-xl">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-[18px] font-semibold text-slate-100 tracking-tight">
              Your Tasks
            </h2>
            <p className="text-[13px] text-slate-600 mt-1">
              Stay organized, stay productive
            </p>
          </div>

          {/* INPUT ROW */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Add a new task..."
              className="flex-1 px-3.5 py-2.5 rounded-[10px] bg-[#0f1117] border border-[#1e2535] text-slate-200 text-[14px] placeholder-slate-700 outline-none focus:border-blue-500 transition-colors duration-200"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              onClick={addTask}
              className="px-5 py-2.5 rounded-[10px] bg-blue-700 hover:bg-blue-500 text-blue-50 text-[14px] font-medium transition-colors duration-200"
            >
              Add
            </button>
          </div>

          <div className="h-px bg-[#1e2535] mb-4" />

          {/* TASK LIST */}
          <div className="space-y-2 max-h-80 overflow-y-auto pr-0.5">
            {tasks.length === 0 ? (
              <p className="text-slate-700 text-[14px] text-center py-8">
                No tasks yet
              </p>
            ) : (
              tasks.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between items-center bg-[#0f1117] border border-[#1e2535] hover:border-[#2d3748] px-3.5 py-2.5 rounded-[10px] transition-colors duration-200"
                >
                  <span className="text-slate-300 text-[14px]">{t.text}</span>
                  <button
                    onClick={() => deleteTask(t._id)}
                    className="text-[12px] text-slate-600 hover:text-red-400 hover:bg-red-400/10 px-2.5 py-1 rounded-md transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ShowTask;