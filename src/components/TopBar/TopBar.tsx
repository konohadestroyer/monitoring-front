import React, { useState } from "react";
import classes from "./TopBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { ReactComponent as AddTrans } from "./img/addTrans.svg";
import alertIcon from "./img/alertIcon.png";
import Button from "../UI/Button/Button";
import axios from "axios";

function TopBar() {
    const [showSensors, setShowSensors] = useState(false);
    const [sensorData, setSensorData] = useState<
        Array<{
            name: string;
            id: string;
            status: "GOOD" | "BAD" | "NOT_ACTIVE";
        }>
    >([]);

    const checkSensors = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                "http://localhost:8228/sensor/check-sensors",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            const sensors = response.data;
            console.log("Checked sensors:", sensors);
            setSensorData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Error checking sensors:",
                    error.response?.data || error.message,
                );
            } else {
                console.error("Unknown error:", (error as Error).message);
            }
        }
        setShowSensors(true);
    };

    const isLight = false;
    const countOkSensors = () => {
        return sensorData.filter((sensor) => sensor.status === "GOOD").length;
    };

    return (
        <div className={classes.TopBar}>
            <span>Система мониторинга</span>
            <div className={classes.Sobaka}>
                <div style={{ position: "relative" }}>
                    <Button backgroundColor="black" onClick={checkSensors}>
                        Проверить датчики
                    </Button>

                    {showSensors && (
                        <div className={classes.SensorDropdown}>
                            <div className={classes.DropCont}>
                                <span>
                                    {countOkSensors()}/{sensorData.length} OK
                                </span>
                                <span>
                                    <u
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setShowSensors(false)}
                                    >
                                        свернуть
                                    </u>
                                </span>
                            </div>
                            {sensorData.map((sensor, index) => (
                                <div key={index} className={classes.SensorItem}>
                                    <strong>{sensor.name}:</strong>{" "}
                                    {sensor.status}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!isLight ? (
                    <a className={classes.Button}>
                        <img src={alertIcon} alt="Alert" />
                    </a>
                ) : null}
            </div>
        </div>
    );
}

export default TopBar;
