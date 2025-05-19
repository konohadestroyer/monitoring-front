import classes from "./Auth.module.scss";
import LeftBar from "../../components/LeftBar/LeftBar";
import TopBar from "../../components/TopBar/TopBar";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import Input from "../../components/UI/Input/Input";
import { ReactEventHandler, useState } from "react";
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import { send } from "node:process";

export default function Auth() {
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValue(e.target.value);
    };
    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const sendToOauth = () => {
        axios.post(
            "http://localhost:9000/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:9000/oauth2/callback",
            {
                username: loginValue,
                password: passwordValue,
            },
        );
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
                                <a
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                    href="http://localhost:9000/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:9000/oauth2/callback"
                                >
                                    <Button
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        Войти
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    );
}
