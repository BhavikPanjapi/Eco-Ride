import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">Welcome to Dashboard</h1>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard