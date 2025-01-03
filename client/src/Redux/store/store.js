import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../reducers/userReducer";
import employerReducer from "../reducers/employerReducer";
import employeeReducer from "../reducers/employeeReducer"
import socketReducer from '../reducers/socketReducer'
import chatReducer from '../reducers/chatReducer'
import notificationReducer from '../reducers/notificationReducer'


const userPersistConfig = {
	key: "user",
	storage,
};

const employerPersistConfig = {
	key: "employer",
	storage,
};

const employeePersistConfig = {
	key: "employee",
	storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedEmployerReducer = persistReducer(
	employerPersistConfig,
	employerReducer
);
const persistedEmployeeReducer = persistReducer(
	employeePersistConfig,
	employeeReducer
);


const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		employer: persistedEmployerReducer,
		employee: persistedEmployeeReducer,
		chat: chatReducer,
		socket: socketReducer,
		notification: notificationReducer
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					"persist/PERSIST",
					"persist/REHYDRATE",
					"socket/setSocket",
				],
				ignoredPaths: ["socket.socket"],
			},
			devTools: import.meta.env.NODE_ENV !== "production",
		}),
});

export const persistor = persistStore(store);
export default store;
