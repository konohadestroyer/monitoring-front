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
            // Получаем нужное значение из message (например, по id или name)
            const newValues = { ...actualValues };

            // Пример, как можно обновить значения на основе id или name сообщения
            // Можно добавить больше условий в зависимости от того, что приходит в message
            if (message.id === "36574620-1278-49cb-9dcf-fd2a34148aa2") {
                newValues.first = message.value;
            } else if (message.id === "1087010f-5f88-40a9-b7d0-dbaeb3ab3a2a") {
                newValues.second = message.value;
            } else if (message.id === "3c703a09-0889-44d6-949b-0996732470d2") {
                newValues.third = message.value;
            } else if (message.id === "976b3741-2f02-48fc-988c-53d86e3338fe") {
                newValues.fourth = message.value;
            } else if (message.id === "59f6f71b-3ede-4c63-a162-fbc4dd53ffdd") {
                newValues.fifth = message.value;
            }

            setActualValues(newValues); // Обновляем состояние с новыми значениями
        }
    }, [message]); // Эффект срабатывает при изменении message

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
