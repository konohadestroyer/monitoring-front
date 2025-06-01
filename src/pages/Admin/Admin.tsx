import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Alert from "../../components/Alert/Alert";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import LeftBar from "../../components/LeftBar/LeftBar";
import ReferenceForm from "../../components/ReferenceForm/ReferenceForm";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Admin.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useState } from "react";
import axios from "axios";

export default function Admin() {
    const [formData, setFormData] = useState({
        sensorName: "",
        referenceValue: "",
        unit: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createSensor = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://localhost:8228/sensor/create",
                {
                    name: formData.sensorName,
                    type: formData.unit,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            console.log("Sensor created with ID:", response.data.id);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Error creating sensor:",
                    error.response?.data || error.message,
                );
            } else {
                console.error("Unknown error:", (error as Error).message);
            }
        }
    };

    const createUser = async () => {
        const token = localStorage.getItem("token"); // если нужна авторизация

        const newUser = {
            login: formData.username,
            password: formData.password,
            firstName: formData.firstname,
            lastName: formData.lastname,
            role: "8739f3fc-0403-4c85-9b90-1cbf5956bd1e",
        };

        try {
            const response = await axios.post(
                "http://localhost:9000/admin/create-user",
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log("User created successfully", response.status);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Error creating user:",
                    error.response?.data || error.message,
                );
            } else {
                console.error("Unknown error:", (error as Error).message);
            }
        }
    };

    const referenceValues = useSelector(
        (state: RootState) => state.reference.data,
    );

    return (
        <>
            <div className={classes.Admin}>
                <LeftBar />
                <div className={classes.RightContainer}>
                    <TopBar />
                    <ContentLayout>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                width: "100%",
                                height: "590px",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                className={`${classes.SensorForm} + ${classes.Item}`}
                            >
                                <div className={classes.Wrapper}>
                                    <div className={classes.Container}>
                                        <h1>Добавление датчиков</h1>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="sensorName"
                                                value={formData.sensorName}
                                                placeholder="Название датчика"
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="referenceValue"
                                                value={formData.referenceValue}
                                                placeholder="Эталонное значение"
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="unit"
                                                value={formData.unit}
                                                placeholder="Единица измерения"
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <Button onClick={createSensor}>
                                            Добавить датчик
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${classes.SensorForm} + ${classes.Item}`}
                            >
                                <div className={classes.Wrapper}>
                                    <div className={classes.Container}>
                                        <h1>Список датчиков</h1>
                                        {referenceValues.length !== 0 ? (
                                            referenceValues.map(
                                                (item, index) => {
                                                    // Проверка на наличие поля reference и reference.value
                                                    const referenceValue =
                                                        item.reference?.value ||
                                                        "Нет данных";

                                                    return (
                                                        <div
                                                            className={
                                                                classes.Sensor
                                                            }
                                                            key={index}
                                                        >
                                                            <div
                                                                className={
                                                                    classes.Text
                                                                }
                                                            >
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        referenceValue
                                                                    }
                                                                </span>
                                                            </div>
                                                            <Button>
                                                                Удалить
                                                            </Button>
                                                        </div>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <div>Нет датчиков</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${classes.SensorForm} + ${classes.Item}`}
                            >
                                <div className={classes.Wrapper}>
                                    <div className={classes.Container}>
                                        <h1>Создать пользователя</h1>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="username"
                                                placeholder="Логин"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="password"
                                                placeholder="Пароль"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="firstname"
                                                placeholder="Имя"
                                                value={formData.firstname}
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <div className={classes.InputItem}>
                                            <Input
                                                name="lastname"
                                                placeholder="Фамилия"
                                                value={formData.lastname}
                                                onChange={handleInputChange}
                                            ></Input>
                                        </div>
                                        <FormControl
                                            fullWidth
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    backgroundColor: "#171717",
                                                    color: "grey", // цвет текста внутри Select
                                                    "& fieldset": {
                                                        borderColor: "#171717", // цвет границы
                                                        borderWidth: "2px",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "#fff", // цвет границы при наведении
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "#fff", // цвет границы при фокусе
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    color: "grey", // цвет текста label
                                                },
                                                "& .MuiInputLabel-root.Mui-focused":
                                                    {
                                                        color: "lightgrey", // цвет label при фокусе
                                                    },
                                            }}
                                        >
                                            <InputLabel id="demo-simple-select-label">
                                                Age
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={10}
                                                label="Age"
                                            >
                                                <MenuItem value={10}>
                                                    Разрешенные датчики
                                                </MenuItem>
                                                <MenuItem value={20}>
                                                    Termometr
                                                </MenuItem>
                                                <MenuItem value={30}>
                                                    Barometr
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button onClick={createUser}>
                                            Создать пользователя
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    );
}
