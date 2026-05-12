import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");

    }
  return (
    <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
      <h1 className="text-base font-bold">My App</h1>
      <div>
        {
            user ? (
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-xs text-white font-bold py-1 px-3 rounded">Logout</button>
            ) : (
                <div>
                    <Link to="/login" className="hover:underline text-white font-bold py-1 px-3 rounded mr-2">
                        Login
                    </Link>
                    <Link to="/register" className="hover:underline text-white font-bold py-1 px-3 rounded">
                        Register
                    </Link>
                </div>
            )
        }
      </div>
    </div>
  )
}
