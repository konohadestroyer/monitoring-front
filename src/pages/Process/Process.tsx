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
            if (message.id === "sensor_id_1") {
                newValues.first = message.value;
            } else if (message.id === "sensor_id_2") {
                newValues.second = message.value;
            } else if (message.id === "sensor_id_3") {
                newValues.third = message.value;
            } else if (message.id === "sensor_id_4") {
                newValues.fourth = message.value;
            } else if (message.id === "sensor_id_5") {
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
