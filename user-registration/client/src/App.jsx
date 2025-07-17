import { ToastContainer } from "react-toastify";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
      />
      <Registration />
    </>
  );
};

export default App;
