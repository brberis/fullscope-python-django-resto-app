import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({children}): React.ReactElement => {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout;