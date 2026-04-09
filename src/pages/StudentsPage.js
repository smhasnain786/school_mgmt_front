import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [age, setAge] = useState("");
  const [deleteStudentData, setDeleteStudentData] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editClass, setEditClass] = useState("");
  const [editAge, setEditAge] = useState("");
  const [loading, setLoading] = useState(false);


  const openEditModal = (student) => {
    setEditStudent(student);
    setEditName(student.name);
    setEditClass(student.class);
    setEditAge(student.age);
  };

  const updateStudent = async () => {
    if (!editName || !editClass || !editAge) {
      return toast.error("Fill all fields");
    }

    try {
      await API.put(`/students/${editStudent._id}`, {
        name: editName,
        class: editClass,
        age: editAge,
      });

      toast.success("Student updated");
      setEditStudent(null);
      fetchStudents();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteStudentData) {
      return toast.error("No student selected");
    }

    try {
      await API.delete(`/students/${deleteStudentData._id}`);
      toast.success("Student deleted");
      setDeleteStudentData(null);
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }

  };

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!name || !studentClass || !age) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      await API.post("/students", { name, class: studentClass, age });

      toast.success("Student added");

      setName("");
      setStudentClass("");
      setAge("");
      fetchStudents();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const deleteStudent = async (id) => {
  //   try {
  //     await API.delete(`/students/${deleteStudentData._id}`);
  //     toast.success("Student deleted");
  //     setDeleteStudentData(null);
  //     fetchStudents();
  //   } catch {
  //     toast.error("Delete failed");
  //   }
  // };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}
        <h2 className="text-2xl font-bold">Students Management</h2>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add Student</h3>

          <div className="grid grid-cols-4 gap-4">
            <input
              className="border p-2 rounded w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full"
              placeholder="Class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <button
              onClick={addStudent}
              disabled={loading}
              className={`text-white rounded px-4 ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Students List</h3>

          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg overflow-hidden">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Age</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{s.name}</td>
                    <td>{s.class}</td>
                    <td>{s.age}</td>

                    <td className="text-center">
                      <button
                        onClick={() => openEditModal(s)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteStudentData(s)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
        {editStudent && (
          <Modal
            isOpen={!!editStudent}
            onClose={() => setEditStudent(null)}
            title="Edit Student"
          >
            <input
              className="border p-2 rounded w-full mb-3"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full mb-3"
              value={editClass}
              onChange={(e) => setEditClass(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full mb-4"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditStudent(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateStudent}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </Modal>
        )}

        {deleteStudentData && (
          <Modal
            isOpen={!!deleteStudentData}
            onClose={() => setDeleteStudentData(null)}
            title="Delete Student"
          >
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deleteStudentData?.name}
              </span>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteStudentData(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}