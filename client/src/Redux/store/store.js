import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../reducers/userReducer";
import employerReducer from "../reducers/employerReducer";

const userPersistConfig = {
	key: "user",
	storage,
};

const employerPersistConfig = {
	key: "employer",
	storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedEmployerReducer = persistReducer(
	employerPersistConfig,
	employerReducer
);

const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		employer: persistedEmployerReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
			devTools: import.meta.env.NODE_ENV !== "production",
		}),
});

export const persistor = persistStore(store);
export default store;
