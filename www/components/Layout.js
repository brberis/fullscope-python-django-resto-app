import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from 'react';
import { request_refresh } from '../actions/auth';

const Layout = ({title, content, children, sectionTitle, breadcrumbs}) => {

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4 mb-3">
        <Header sectionTitle={sectionTitle} breadcrumbs={breadcrumbs}/>
    
          {children}
 
      </div>
      <Footer />
    </div>
  )
}

export default Layout;