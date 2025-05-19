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

function App() {
    const [client, setClient] = useState<Client | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8228/socket");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.subscribe("/topic/journal", (message) => {
                    dispatch(setMessages(JSON.parse(message.body)));
                });
            },
            onStompError: (frame) => {
                console.error("Ошибка STOMP:", frame);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8228/sensor/all-sensors")
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
                <Route path="/login" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
