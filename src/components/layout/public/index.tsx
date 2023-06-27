import { Routes, Route } from "react-router-dom";
import Home from "../../../pages/home";

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}