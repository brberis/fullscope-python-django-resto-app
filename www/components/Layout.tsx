import Navbar from "./Navbar";

const Layout = ({children}): React.ReactElement => {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout;