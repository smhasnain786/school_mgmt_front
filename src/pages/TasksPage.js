import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";


export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [title, setTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [deleteTask, setDeleteTask] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleDelete = async () => {
    if (!deleteTask) return;

    try {
      await API.delete(`/tasks/${deleteTask._id}`);
      toast.success("Task deleted");
      setDeleteTask(null);
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchStudents();
  }, []);

  const addTask = async () => {
    if (!title || !studentId) {
      return toast.error("Fill all fields");
    }

    setLoading(true);
    try {
      await API.post("/tasks", {
        title,
        student: studentId
      });
      toast.success("Task assigned");
      setTitle("");
      setStudentId("");
      fetchTasks();
    } catch {
      toast.error("Failed to assign task");
    } finally {
      setLoading(false);
    }


  };

  const markComplete = async (id) => {

    await API.put(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}
        <h2 className="text-2xl font-bold">Task Management</h2>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Assign Task</h3>

          <div className="grid grid-cols-3 gap-4">

            <input
              className="border p-2 rounded w-full"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="border p-2 rounded w-full"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <button
              onClick={addTask}
              disabled={loading}
              className={`text-white rounded px-4 ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Adding..." : "Assign Task"}
            </button>

          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Tasks List</h3>

          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg overflow-hidden">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Task</th>
                  <th className="text-left">Student</th>
                  <th className="text-left">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((t) => (
                  <tr key={t._id} className="border-t hover:bg-gray-50">

                    <td className="p-3">{t.title}</td>
                    <td>{t.student?.name || "N/A"}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-sm ${t.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                          }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="text-center">
                      {t.status !== "completed" && (
                        <button
                          onClick={() => markComplete(t._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteTask(t)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {deleteTask && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 " style={{ margin: "0px", backdropFilter: "blur(4px)", transition: "ease-in" }}>

            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-red-600">
                Delete Task
              </h3>

              <p className="text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{deleteTask.title}</span>?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteTask(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </Layout>
  );
}