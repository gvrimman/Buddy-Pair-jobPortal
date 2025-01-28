// components/ErrorBoundary.jsx
import React, { Component } from "react";
import { showError } from "../../utils/toast";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console for debugging
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error details:", errorInfo);

    // Optionally, show a toast notification
    showError("Something went wrong. Please try again later.");
  }

  handleReload = () => {
    // Reload the current page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="error-boundary h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
          <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
          <p className="text-lg mt-4">
            {this.state.errorMessage || "An unexpected error occurred."}
          </p>
          <button
            onClick={this.handleReload}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
