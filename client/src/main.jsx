import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import store, { persistor } from "./Redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<Router>
						<App />
						<ToastContainer />
					</Router>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
);
