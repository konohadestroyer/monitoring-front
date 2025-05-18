import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Alert from '../../components/Alert/Alert'
import ContentLayout from '../../components/ContentLayout/ContentLayout'
import CurrentValues from '../../components/CurrentValues/CurrentValues'
import LeftBar from '../../components/LeftBar/LeftBar'
import ReferenceForm from '../../components/ReferenceForm/ReferenceForm'
import TopBar from '../../components/TopBar/TopBar'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Admin.module.scss'

export default function Admin() {
    return (
        <>
            <div className={classes.Admin}>
                <LeftBar/>
                <div className={classes.RightContainer}>
                    <TopBar/>
                    <ContentLayout>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            width: '100%',
                        }}>
                        <div className={classes.SensorForm}>
                            <div className={classes.Wrapper}>
                                <div className={classes.Container}>
                                    <h1>Добавление датчиков</h1>
                                    <div className={classes.InputItem}>
                                        <Input placeholder='Название датчика' value={''}></Input>
                                    </div>
                                    <div className={classes.InputItem}>
                                        <Input placeholder='Эталонное значение' value={''}></Input>
                                    </div>
                                    <div className={classes.InputItem}>
                                        <Input placeholder='Единица измерения' value={''}></Input>
                                    </div>
                                    <Button>Добавить датчик</Button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.SensorForm}>
                            <div className={classes.Wrapper}>
                                <div className={classes.Container}>
                                    <h1>Список датчиков</h1>
                                    <div className={classes.Sensor}>
                                        <div className={classes.Text}>
                                            <span>Speed</span>
                                            <span>20 м/с</span>
                                        </div>
                                        <Button>Удалить</Button>
                                    </div>
                                    <div className={classes.Sensor}>
                                        <div className={classes.Text}>
                                            <span>Termometr</span>
                                            <span>35 C</span>
                                        </div>
                                        <Button>Удалить</Button>
                                    </div>
                                    <div className={classes.Sensor}>
                                        <div className={classes.Text}>
                                            <span>Barometr</span>
                                            <span>40 Па</span>
                                        </div>
                                        <Button>Удалить</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* <div className={classes.SensorForm}>
                            <div className={classes.Wrapper}>
                                <div className={classes.Container}>
                                    <h1>Создать пользователя</h1>
                                    <div className={classes.InputItem}>
                                        <Input placeholder='Имя' value={''}></Input>
                                    </div>
                                    <div className={classes.InputItem}>
                                        <Input placeholder='Пароль' value={''}></Input>
                                    </div>
                                    <FormControl fullWidth sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#171717',
                                        color: 'grey', // цвет текста внутри Select
                                        '& fieldset': {
                                        borderColor: '#171717', // цвет границы
                                        borderWidth: '2px',
                                        },
                                        '&:hover fieldset': {
                                        borderColor: '#fff', // цвет границы при наведении
                                        },
                                        '&.Mui-focused fieldset': {
                                        borderColor: '#fff', // цвет границы при фокусе
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'grey', // цвет текста label
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'lightgrey', // цвет label при фокусе
                                    }
                                    }}>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={10}
                                            label="Age"
                                        >
                                            <MenuItem value={10}>Разрешенные датчики</MenuItem>
                                            <MenuItem value={20}>Termometr</MenuItem>
                                            <MenuItem value={30}>Barometr</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button>Создать пользователя</Button>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </>
    )
}