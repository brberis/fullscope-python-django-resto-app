import Layout from "../components/Layout";

const HomePage = () => {
  window.location.replace("http://tipsyudder.com");

  return (
    <Layout>
      <h1 className="text-xl pt-3 pb-5">Welcome to the app</h1>
    </Layout>
  )
}

export default HomePage;