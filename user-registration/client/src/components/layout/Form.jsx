import { useState } from "react";
import Button from "../Button";
import { showSuccess, showError } from "../../utils/toastify";

const Form = ({ data, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const res = await fetch("/api/inquiry/addinquiry", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await res.json();

  //     if (!res.ok || result.error) {
  //       showError(result.message || result.error || "Something went wrong :(");
  //     } else {
  //       showSuccess("Message sent successfully :)");
  //       setFormData({ name: "", contact: "", email: "" });
  //     }
  //   } catch (err) {
  //     showError("Something went wrong :(");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${formData.first_name || ""} ${
      formData.last_name || ""
    }`.trim();

    const { email, contact } = formData;
    const result = await onSubmit?.({ full_name: fullName, email, contact });

    if (result?.error) {
      showError(result.error || "Something went wrong :(");
    } else {
      showSuccess("Message sent successfully :)");
      setFormData({
        first_name: "",
        last_name: "",
        contact: "",
        email: "",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 text-[0.75rem] font-mono"
      >
        {data.map(({ id, label, type, name, placeholder }) => (
          <div className="relative max-w-[400px] mx-auto" key={id}>
            <input
              type={type}
              id={name}
              name={name}
              className="peer w-full px-4 pt-6 text-[13px] border-2 rounded-sm placeholder-transparent focus:outline-none focus:border-red-900 bg-white"
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
              className="absolute left-4 top-1 text-[11px] font-mono transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px]  peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-400 text-zinc-400"
            >
              {label}
            </label>
          </div>
        ))}

        <div className="max-w-[400px] mx-auto">
          <Button disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
