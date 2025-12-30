import styles from "./LineChart.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
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
  const {projects} = useAppContext()
  console.log(projects)
  return(    
    <div className={styles.linechart}>
      <ResponsiveContainer width="100%" height={200}>
      <LineChart data={testExcecutionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="executed" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default LineChars;