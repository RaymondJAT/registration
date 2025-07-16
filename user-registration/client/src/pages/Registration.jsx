import Form from "../components/layout/Form";
import { formFields } from "../constants/formFields";

const Registration = () => {
  return (
    <div className="mt-10">
      <Form data={formFields} />
    </div>
  );
};

export default Registration;
