import Layout from "../components/Layout";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated) {
    router.push('/login');
  }

  return (
    <Layout>
      <h1>User Dashboard</h1>
      <p>Welcome {user !== null && user.first_name} to the httpOnly</p>
    </Layout>

  );
};

export default Dashboard;
