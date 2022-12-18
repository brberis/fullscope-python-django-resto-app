import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/auth';
import Layout from '../hocs/Layout';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const register_success = useSelector(state => state.auth.register_success);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    re_password: '',
  });

  const { first_name, last_name, username, password, re_password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(
        register(first_name, last_name, username, password, re_password)
      );
    }
  };

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/dashboard');
  }
  if (register_success) {
    router.push('/login');
  }

  return (
    <Layout title='httpOnly Auth | Register' content='Nice description'>
      <h1>Register Page</h1>
      <form onSubmit={onSubmit}>
        <h3>Create an Account</h3>
        <div>
          <div>
            <label htmlFor='first_name'>First name*</label>
          </div>
          <input
            type='text'
            name='first_name'
            id='first_name'
            onChange={onChange}
            value={first_name}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor='last_name'>Last name*</label>
          </div>
          <input
            type='text'
            name='last_name'
            id='last_name'
            onChange={onChange}
            value={last_name}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor='username'>Username*</label>
          </div>
          <input
            type='text'
            name='username'
            id='username'
            onChange={onChange}
            value={username}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor='password'>Password*</label>
          </div>
          <input
            type='password'
            name='password'
            id='password'
            onChange={onChange}
            value={password}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor='re_password'>Repeat Password*</label>
          </div>
          <input
            type='password'
            name='re_password'
            id='re_password'
            onChange={onChange}
            value={re_password}
            required
            minLength={8}
          />
        </div>
        {loading ? (
          <div>
            <Loader type='Oval' color='#00bfff' width={50} height={50} />
          </div>
        ) : (
          <button type='submit'>Sign Up</button>
        )}
      </form>
    </Layout>
  );
};

export default Signup;
