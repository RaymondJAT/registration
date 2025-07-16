import { useState } from "react";
import Button from "../Button";
import { showSuccess, showError } from "../../utils/toastify";

const Form = ({ data, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit?.(formData);

    if (result?.error) {
      showError(result.error || "Something went wrong :(");
    } else {
      showSuccess("Message sent successfully :)");
      setFormData({ name: "", contact: "", email: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-[0.75rem] font-[contentFont]"
    >
      {data.map(({ id, label, type, name, placeholder }) => (
        <div className="relative max-w-[400px] mx-auto" key={id}>
          <input
            type={type}
            id={name}
            name={name}
            className="peer w-full px-4 pt-6 pb-2 text-[13px] border rounded-sm placeholder-transparent focus:outline-none focus:border-red-900"
            placeholder={placeholder}
            required
            value={formData[name] || ""}
            onChange={handleChange}
            pattern={type === "tel" ? "[0-9]*" : undefined}
            inputMode={type === "tel" ? "numeric" : undefined}
            onKeyPress={(e) =>
              type === "tel" && !/[0-9]/.test(e.key) && e.preventDefault()
            }
          />
          <label
            htmlFor={name}
            className="absolute left-4 top-2 text-[11px] font-[titleFont] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px]  peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-400 text-zinc-400"
          >
            {label}
          </label>
        </div>
      ))}

      <div className="max-w-[400px] mx-auto">
        <Button disabled={loading}>{loading ? "Sending..." : "Submit"}</Button>
      </div>
    </form>
  );
};

export default Form;
