import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api/api";
import { HugeiconsIcon } from '@hugeicons/react';
import { StudentIcon } from '@hugeicons/core-free-icons';
import { Task02Icon  } from '@hugeicons/core-free-icons';
import { TaskDone02Icon   } from '@hugeicons/core-free-icons';

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTasks: 0,
    completedTasks: 0
  });


  const fetchStats = async () => {
    const res = await API.get("/students/stats");
    setStats(res.data);
  }

  useEffect(() => {
    fetchStats();
  }, []);



  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded shadow flex flex-row  items-center">
          <div>
            <HugeiconsIcon
              icon={StudentIcon}
              size={64}
              color="#175847"
              strokeWidth={1.5}
            />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-600 text-xl">Total Students</h4>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-row  items-center">
          <div>
            <HugeiconsIcon
              icon={Task02Icon}
              size={64}
              color="#175847"
              strokeWidth={1.5}
            />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-600 text-xl">Total Tasks</h4>
            <p className="text-2xl font-bold">{stats.totalTasks}</p>
          </div>
        </div><div className="bg-white p-4 rounded shadow flex flex-row  items-center">
          <div>
            <HugeiconsIcon
              icon={TaskDone02Icon}
              size={64}
              color="#175847"
              strokeWidth={1.5}
            />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-600 text-xl">Completed Tasks</h4>
            <p className="text-2xl font-bold">{stats.completedTasks}</p>
          </div>
        </div>

      

      </div>
    </Layout>
  );
}