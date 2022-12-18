import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request_refresh } from '../actions/auth';

const Layout = ({title, content, children}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(request_refresh());
    }
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="mx-3 m-3">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout;