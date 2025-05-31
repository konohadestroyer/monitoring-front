import classes from "./Process.module.scss";
import LeftBar from "../../components/LeftBar/LeftBar";
import TopBar from "../../components/TopBar/TopBar";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import Alert from "../../components/Alert/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import techPic from "./img/techprocess.png";

export default function Process() {
    const isAlert = useSelector((state: RootState) => state.reference.isAlert);

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
                            <span className={classes.First}>20 мм</span>
                            <span className={classes.Second}>65 ℃</span>
                            <span className={classes.Third}>14 о/мин</span>
                            <span className={classes.Fourth}>15 МПа</span>
                            <span className={classes.Fifth}>28 ℃</span>
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    );
}
