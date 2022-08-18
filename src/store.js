import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./blogSlicer";

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
