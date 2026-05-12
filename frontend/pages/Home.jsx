import { Link } from "react-router-dom";

export const Home = ({ user, error }) => {
    console.log(user.email);
    console.log(user.username);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=""> 

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {
        user ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
                Welcome, {user.username}!
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
        ): (
            <div className="flex flex-col space-y-4 ">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </Link>
                <Link to="/register" className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded ml-2">
                  Register
                </Link>
              </div>
        )
      }

      
       
     
      </div>
    </div>
  );
};
