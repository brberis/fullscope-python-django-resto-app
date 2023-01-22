import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset_register_success } from '../actions/auth';
import { ThreeDots } from 'react-loader-spinner'
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  // this useeffect is for dispatch user info
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_register_success());
    }
  }, [dispatch]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(username, password));
    }
  };

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/dashboard');
  }

  return (
    <Layout>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    onChange={onChange}
                    value={username}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={onChange}
                    value={password}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <ThreeDots 
                    type='Oval' color='#fff' width={30} height={20} />
                  ) : <>Sign in</> }
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}














// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, reset_register_success } from '../actions/auth';
// import Loader from 'react-loader-spinner';
// import { useRouter } from 'next/router';
// import Layout from "../components/Layout";

// const Login = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const loading = useSelector(state => state.auth.loading);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const { username, password } = formData;

//   useEffect(() => {
//     if (dispatch && dispatch !== null && dispatch !== undefined) {
//       dispatch(reset_register_success());
//     }
//   }, [dispatch]);

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = e => {
//     e.preventDefault();

//     if (dispatch && dispatch !== null && dispatch !== undefined) {
//       dispatch(login(username, password));
//     }
//   };

//   if (typeof window !== 'undefined' && isAuthenticated) {
//     router.push('/dashboard');
//   }

//   return (
//     <Layout>
//       <h1>Login Page</h1>
//       <form onSubmit={onSubmit}>
//         <h3>Log into Account</h3>

//         <div>
//           <div>
//             <label htmlFor='username'>Username*</label>
//           </div>
//           <input
//             type='text'
//             name='username'
//             id='username'
//             onChange={onChange}
//             value={username}
//             required
//           />
//         </div>
//         <div>
//           <div>
//             <label htmlFor='password'>Password*</label>
//           </div>
//           <input
//             type='password'
//             name='password'
//             id='password'
//             onChange={onChange}
//             value={password}
//             required
//           />
//         </div>
//         {loading ? (
//           <div>
//             {/* <Loader type='Oval' color='#00bfff' width={50} height={50} /> */}
//           </div>
//         ) : (
//           <button type='submit'>Sign In</button>
//         )}
//       </form>
//     </Layout>
//   );
// };

// export default Login;
