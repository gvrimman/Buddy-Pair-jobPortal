import React, { useState } from "react";
import axios from "../../utils/axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");
    try {
      const response = await axios.post("contact", formData);
      setFeedback(response.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFeedback(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg">
      {feedback && (
        <div
          className={`p-3 mb-4 text-sm rounded ${
            feedback.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {feedback}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-500 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-500 focus:outline-none"
            placeholder="Write your message here"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full p-3 font-medium text-white rounded-md ${
            isSubmitting ? "bg-theme-300" : "bg-theme-600 hover:bg-theme-700"
          } transition-all`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
