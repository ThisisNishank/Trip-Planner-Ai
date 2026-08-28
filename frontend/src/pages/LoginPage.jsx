// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api/axios';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     try {
//       const response = await api.post('/auth/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userName', response.data.name);
//       navigate('/');
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
//       >
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Welcome Back
//         </h1>

//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
//         )}

//         <label className="block text-sm text-gray-600 mb-1">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//         />

//         <label className="block text-sm text-gray-600 mb-1">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
//         >
//           Log In
//         </button>

//         <p className="text-sm text-gray-500 text-center mt-4">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.name);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
        <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl ring-1 ring-white/50 w-full max-w-sm mx-4 hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-300"
      >
        
        <p className="text-center text-3xl mb-1">🧳</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Log in to keep planning your next trip
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
        )}

        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
        />

        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
        >
          Log In
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;