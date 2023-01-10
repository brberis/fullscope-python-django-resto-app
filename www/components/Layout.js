import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from 'react';
import { request_refresh } from '../actions/auth';

const Layout = (props) => {

  const {title, content, children, sectionTitle, action, incomingAction, breadcrumbs} = props;
  // const actionHandler = function (value) {
  //   props.actionHandler(value);
  // }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4 mb-3">
        <Header sectionTitle={sectionTitle} action={action} incomingAction={incomingAction} breadcrumbs={breadcrumbs}/>
    
          {children}
 
      </div>
      <Footer />
    </div>
  )
}

export default Layout;