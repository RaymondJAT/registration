import { useState } from "react";
import { formFields } from "../constants/formFields";
import Form from "../components/layout/Form";
import Table from "../components/layout/Table";

const Registration = () => {
  const [entries, setEntries] = useState([]);

  const handleFormSubmit = async (formData) => {
    setEntries((prev) => [...prev, formData]);
    return { success: true };
  };

  return (
    <>
      <div className="pt-30 px-2 lg:pt-40 pb-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
            <Form data={formFields} onSubmit={handleFormSubmit} />
            <Table entries={entries} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
