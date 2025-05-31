import classes from "./App.module.scss";
import LeftBar from "./components/LeftBar/LeftBar";
import TopBar from "./components/TopBar/TopBar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import ContentLayout from "./components/ContentLayout/ContentLayout";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import axios from "axios";
import ReferenceForm from "./components/ReferenceForm/ReferenceForm";
import Graph from "./components/Graph/Graph";
import Button from "./components/UI/Button/Button";
import { setMessages, setReferenceValues } from "./slices/referenceValueSlice";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import GraphBoard from "./pages/GraphBoard/GraphBoard";
import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth/Auth";
import OAuth2 from "./pages/OAuth2/OAuth2";
import OAuth2Callback from "./pages/OAuth2Callback/OAuth2Callback";
import Process from "./pages/Process/Process";
// import OAuth2Callback from "./pages/OAuth2Callback/OAuth2Callback";

function App() {
    const [client, setClient] = useState<Client | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const socket = new WebSocket(
            `ws://localhost:8228/socket?token=${token}`,
        );

        socket.onopen = () => {
            socket.send(
                JSON.stringify({ type: "reference/update", data: { id: 123 } }),
            );
            console.log("message send");
        };

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log("Received:", msg);
        };
    }, []);

    const token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get("http://localhost:8228/sensor/all-sensors", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch(setReferenceValues(response.data));
            })
            .catch((err) => {
                console.error("Ошибка при загрузке данных:", err);
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/graph" element={<GraphBoard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<OAuth2 />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/oauth2/callback" element={<OAuth2Callback />} />
                <Route path="/process" element={<Process />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
