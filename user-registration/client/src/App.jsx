import { ToastContainer } from "react-toastify";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
      />
      <Registration />
    </div>
  );
};

export default App;
