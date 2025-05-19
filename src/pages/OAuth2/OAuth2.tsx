import classes from "./OAuth2.module.scss";
import LeftBar from "../../components/LeftBar/LeftBar";
import TopBar from "../../components/TopBar/TopBar";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import Input from "../../components/UI/Input/Input";
import { ReactEventHandler, useState } from "react";
import Button from "../../components/UI/Button/Button";
import axios from "axios";

export default function OAuth2() {
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValue(e.target.value);
    };
    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const sendToOauth = () => {
        axios.post("http://localhost:9000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${loginValue}&password=${passwordValue}`,
            credentials: "include",
        });
    };

    return (
        <>
            <div className={classes.App}>
                <LeftBar />
                <div className={classes.RightContainer}>
                    <TopBar />
                    <ContentLayout>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <div className={classes.Wrapper}>
                                <h1>
                                    Для продолжения необходимо авторизоваться
                                </h1>
                                <Input
                                    value={loginValue}
                                    onChange={loginHandler}
                                    placeholder="Ваш логин"
                                ></Input>
                                <Input
                                    value={passwordValue}
                                    onChange={passwordHandler}
                                    placeholder="Ваш пароль"
                                ></Input>
                                <Button
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    Войти
                                </Button>
                            </div>
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    );
}
