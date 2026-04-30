import {combineReducers} from "redux";
import counterReducer from "./slices/counter";
import estateAdvertiser from "@/redux/slices/estate-advertiser";
import authReducer from "@/redux/slices/auth";
import estatePublicReducer from "@/redux/slices/estate-public";

const rootReducer = combineReducers({
    counter: counterReducer,
    estateAdvertiser: estateAdvertiser,
    auth: authReducer,
    estatePublic: estatePublicReducer,
});

export {rootReducer};
