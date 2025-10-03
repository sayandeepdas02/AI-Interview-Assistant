// // src/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
// import { candidateSlice } from "./slices/candidateSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   candidate: candidateSlice.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types from redux-persist
//         ignoredActions: [
//           'persist/PERSIST',
//           'persist/REHYDRATE',
//           'persist/REGISTER',
//         ],
//       },
//     }),
// });

// export const persistor = persistStore(store);













// // src/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
// import sessionReducer from "./slices/sessionSlice"; // ✅ new slice

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   session: sessionReducer, // ✅ use session instead of candidate
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore redux-persist specific actions
//         ignoredActions: [
//           "persist/PERSIST",
//           "persist/REHYDRATE",
//           "persist/REGISTER",
//         ],
//       },
//     }),
// });

// export const persistor = persistStore(store);


















// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import candidateReducer from "./slices/candidateSlice";
import sessionReducer from "./slices/sessionSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [], // <-- later you can put "session" here if you don't want sessions persisted
};

const rootReducer = combineReducers({
  candidate: candidateReducer,
  session: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
