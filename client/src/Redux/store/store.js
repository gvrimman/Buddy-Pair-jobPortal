import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../reducers/userReducer";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
	reducer: {
		user: persistedReducer,
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
