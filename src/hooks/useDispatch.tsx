import { useDispatch as useAppDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

export const useDispatch = () => useAppDispatch<AppDispatch>();
