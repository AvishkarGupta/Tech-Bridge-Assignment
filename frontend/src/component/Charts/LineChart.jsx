import styles from "./LineChart.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Legend, ResponsiveContainer, Cell, BarChart, Bar } from "recharts";
import { useAppContext } from "../../store/Store";

function LineChars(){

  const testExcecutionData = [
    { date: "2025-01-01", executed: 120 },
    { date: "2025-01-02", executed: 135 },
    { date: "2025-01-03", executed: 128 },
    { date: "2025-01-04", executed: 150 },
    { date: "2025-01-05", executed: 170 },
    { date: "2025-01-06", executed: 160 },
    { date: "2025-01-07", executed: 190 },
  ];

  const testExecutionPieData = [
    { name: "Failed", value: 120 },
    { name: "Passed", value: 135 },
    { name: "InProgress", value: 128 },
    { name: "InVerification", value: 150 },
    { name: "RFV", value: 170 },
    { name: "Needs Triage", value: 160 },
    { name: "Cancelled", value: 190 },
  ];

  const COLORS = {
    Passed: "#22c55e",
    Failed: "#ef4444",
    InProgress: "#3b82f6",
    InVerification: "#a855f7",
    RFV: "#f97316",
    "Needs Triage": "#eab308",
    Cancelled: "#6b7280",
  };

  const passFailByPriority = [
    { priority: "P0", Passed: 45, Failed: 5 },
    { priority: "P1", Passed: 80, Failed: 12 },
    { priority: "P2", Passed: 120, Failed: 20 },
    { priority: "P3", Passed: 95, Failed: 30 },
  ];

  const {projects} = useAppContext()
  console.log(projects)
  return(    
    <div className={styles.conatiner}>
      <div className={styles.linechart}>
      <ResponsiveContainer width="100%" height={200}>
      <LineChart data={testExcecutionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="bumpX" dataKey="executed" />
      </LineChart>
    </ResponsiveContainer>
    </div>
    <div className={styles.linechart}>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={testExecutionPieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {testExecutionPieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.linechart}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={passFailByPriority}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Passed" fill="#22c55e" />
          <Bar dataKey="Failed" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>;
    </div>
    
    </div>
  )
}

export default LineChars;