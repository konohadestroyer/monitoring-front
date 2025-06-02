import classes from "./Process.module.scss";
import LeftBar from "../../components/LeftBar/LeftBar";
import TopBar from "../../components/TopBar/TopBar";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import Alert from "../../components/Alert/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import techPic from "./img/techprocess.png";
import { useEffect, useState } from "react";

export default function Process() {
    const isAlert = useSelector((state: RootState) => state.reference.isAlert);
    const sensors = useSelector((state: RootState) => state.reference.data);
    const message = useSelector((state: RootState) => state.reference.messages);
    const [actualValues, setActualValues] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
    });

    useEffect(() => {
        if (message) {
            // Обновляем только конкретные значения в зависимости от id
            setActualValues((prevValues) => ({
                ...prevValues, // Сохраняем старые значения
                [getFieldNameById(message.id)]: message.value, // Обновляем нужное поле
            }));
        }
    }, [message]);

    // Функция для получения названия поля по id сообщения
    const getFieldNameById = (id: string) => {
        switch (id) {
            case "36574620-1278-49cb-9dcf-fd2a34148aa2":
                return "first";
            case "1087010f-5f88-40a9-b7d0-dbaeb3ab3a2a":
                return "second";
            case "3c703a09-0889-44d6-949b-0996732470d2":
                return "third";
            case "976b3741-2f02-48fc-988c-53d86e3338fe":
                return "fourth";
            case "59f6f71b-3ede-4c63-a162-fbc4dd53ffdd":
                return "fifth";
            default:
                return ""; // Если id не найдено, не обновляем
        }
    };

    return (
        <>
            {isAlert ? <Alert /> : null}
            <div className={classes.App}>
                <LeftBar />
                <div className={classes.RightContainer}>
                    <TopBar />
                    <ContentLayout>
                        <div className={classes.TechProcess}>
                            <h1
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Технологический процесс
                            </h1>
                            <img src={techPic} />
                            <span className={classes.First}>
                                {actualValues.first} мм
                            </span>
                            <span className={classes.Second}>
                                {actualValues.second} ℃
                            </span>
                            <span className={classes.Third}>
                                {actualValues.third} о/мин
                            </span>
                            <span className={classes.Fourth}>
                                {actualValues.fourth} МПа
                            </span>
                            <span className={classes.Fifth}>
                                {actualValues.fifth} ℃
                            </span>
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    );
}
