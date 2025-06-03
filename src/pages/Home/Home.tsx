import React, { useEffect } from "react";
import classes from "./Home.module.scss";
import ReferenceForm from "../../components/ReferenceForm/ReferenceForm";
import LeftBar from "../../components/LeftBar/LeftBar";
import TopBar from "../../components/TopBar/TopBar";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setAlert } from "../../slices/referenceValueSlice";
import Alert from "../../components/Alert/Alert";

export default function Home() {
    const message = useSelector((state: RootState) => state.reference.messages);
    const referenceValue = useSelector(
        (state: RootState) => state.reference.data,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("worked");

        if (message) {
            // Обработка отсутствия поля `reference` в данных
            const refValues = referenceValue.reduce<{
                [key: string]: { val: string; name: string };
            }>((acc, item) => {
                // Проверка на наличие поля reference и reference.value
                if (item.reference && item.reference.value) {
                    acc[item.id] = {
                        val: item.reference.value,
                        name: item.name,
                    };
                } else {
                    acc[item.id] = { val: "Нет данных", name: item.name }; // Значение по умолчанию
                }
                return acc;
            }, {});

            console.log(refValues);

            // Если пришедшее сообщение не совпадает с текущим значением, показываем alert
            if (refValues[message.id]?.val !== message.value) {
                dispatch(
                    setAlert({
                        isOn: true,
                        sensor:
                            refValues[message.id]?.name || "Неизвестный датчик", // В случае отсутствия имени
                    }),
                );
            }
        }
    }, [message, referenceValue, dispatch]);

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
                                flexDirection: "row",
                                gap: "10px",
                                width: "100%",
                            }}
                        >
                            <ReferenceForm />
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    );
}
