import React, {useEffect, useState} from "react"
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthKwh } from '../components'

const HomePage = () => {
    const [form, setForm] = useState({
        kwh: 3600,
        roof: 'slope',
        angle: 15,
        compass: 'South'
    })

    const [panCount, setPanCount] = useState(null)
    const [panSquare, setPanSquare] = useState(null)
    const [panPower, setPanPower] = useState(null)
    const [panPowerYear, setPanPowerYear] = useState(null)
    const [price, setPrice] = useState(null)
    // const [dataMonthKwh, setDataMonthKwh] = useState([{name: 'Январь',kWh: 0,},{name: 'Февраль',kWh: 0,},{name: 'Март',kWh: 0,},{name: 'Апрель',kWh: 0,},{name: 'Май',kWh: 0,},{name: 'Июнь',kWh: 0,},{name: 'Июль',kWh: 0,},{name: 'Август',kWh: 0,},{name: 'Сентябрь',kWh: 0,},{name: 'Октябрь',kWh: 0,},{name: 'Ноябрь',kWh: 0,},{name: 'Декабрь',kWh: 0,}])

    const onlyNumeric = (e) => {
        if (e.target.value === '' || !(!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))) {
            e.target.value = ''
        }
    }

    useEffect(() => {
        console.log(form)
        if (form.kwh < 3600 || form.kwh > 15000) return
        let _count = form.kwh / 0.4 / 1000
        const count = Number.isInteger(_count) ? _count + 1 : Math.round(_count)
        const power = count * 0.4
        setPanCount(count)
        setPanSquare(Math.round(count * 1.922))
        setPanPower(Math.round(power * 100) / 100)
        setPanPowerYear(Math.round(I * Ko[form.compass][form.angle] * power * 0.9))
        setPrice(Math.round(power*1250))

        monthData.map((month, i) => {
            month.kWh = Math.round((monthKoef[i] * Math.round(count * 1.922)) * power)
        })

    }, [form])

    const setPower = (e) => {
        onlyNumeric(e)
        if (e.target.value === '')
            setForm({...form, kwh: 0})
        else
            setForm({...form, kwh: parseInt(e.target.value)})
    }

    const validation = (e) => {
        if (e.target.value < 3600) {
            e.target.value = 3600
            setForm({...form, kwh: 3600})
        }
        if (e.target.value > 15000) {
            e.target.value = 15000
            setForm({...form, kwh: 15000})
        }
    }

    const setRoof = (e) => {
        if (e.target.value === 'flat') {
            setForm({...form, roof: e.target.value, angle: 10})
        } else if (e.target.value === 'ground') {
            setForm({...form, roof: e.target.value, angle: 55})
        } else {
            setForm({...form, roof: e.target.value, angle: 15})
        }
    }

    const setAngle = (e) => {
        setForm({...form, angle: parseInt(e.target.value)})
    }

    const setCompass = (e) => {
        setForm({...form, compass: e.target.value})
    }

    return (
        <div className="App App-header">
            <input type="text" onChange={setPower} onBlur={validation} defaultValue={form.kwh}/>
            <select name="roof" id="roof" onChange={setRoof}>
                <option value="slope">Двускатная</option>
                <option value="flat">Плоская</option>
                <option value="ground">Площадь участка</option>
            </select>
            {form.roof === 'slope' &&
                <select name="angle" id="angle" onChange={setAngle}>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                </select>
            }
            <select name="compass" id="compass" onChange={setCompass}>
                <option value="South">Юг</option>
                <option value="North">Север</option>
                <option value="West">Запад</option>
                <option value="East">Восток</option>
                <option value="Southeast">Юго-восток</option>
                <option value="Southwest">Юго-запад</option>
                <option value="Northwest">Северо-запад</option>
                <option value="Northeast">Северо-восток</option>
            </select>
            <div className="results">
                <div className="result-line">
                    <div className="title">Количество солнечных панелей</div>
                    <div className="value">{panCount} штук</div>
                </div>
                <div className="result-line">
                    <div className="title">Mесто, необходимое для установки солнечных панелей</div>
                    <div className="value">{panSquare} м²</div>
                </div>
                <div className="result-line">
                    <div className="title">Мощность системы солнечной электроэнергии</div>
                    <div className="value">{panPower} кВт</div>
                </div>
                <div className="result-line">
                    <div className="title">Годовое производство солнечной электроэнергии</div>
                    <div className="value">{panPowerYear} кВтч</div>
                </div>
                <div className="result-line">
                    <div className="title">Цена</div>
                    <div className="value">{price} EUR</div>
                </div>
                <div className="result-line diagram">
                    <MonthKwh data={monthData}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

const I = 950 //http://ru.sinergo.lv/potencial-solnechnoj-energii/

const Ko = { //https://termoteh.in.ua/article/gde-mozhno-ustanavlivat-solnechnye-batarei
    'South': {
        10: 1.07,
        15: 1.1,
        30: 1.13,
        45: 1.12,
        55: 1.06,
        60: 1.06
    },
    'North': {
        10: 0.95,
        15: 0.93,
        30: 0.77,
        45: 0.65,
        55: 0.51,
        60: 0.42
    },
    'West': {
        10: 0.99,
        15: 0.98,
        30: 0.94,
        45: 0.88,
        55: 0.85,
        60: 0.82
    },
    'East': {
        10: 0.99,
        15: 0.98,
        30: 0.94,
        45: 0.88,
        55: 0.85,
        60: 0.82
    },
    'Southeast': {
        10: 1.05,
        15: 1.06,
        30: 1.08,
        45: 1.06,
        55: 1.02,
        60: 1
    },
    'Southwest': {
        10: 1.05,
        15: 1.06,
        30: 1.08,
        45: 1.06,
        55: 1.02,
        60: 1
    },
    'Northwest': {
        10: 0.96,
        15: 0.94,
        30: 0.79,
        45: 0.72,
        55: 0.64,
        60: 0.55
    },
    'Northeast': {
        10: 0.96,
        15: 0.94,
        30: 0.79,
        45: 0.72,
        55: 0.63,
        60: 0.55
    }
}

const monthKoef = [20.6,53,108.4,127.6,166.3,163,167.7,145.0,104.6,60.7,34.8,22.0,1173.7]

const monthData = [
    {
        name: 'Январь',
        kWh: 4000,
    },
    {
        name: 'Февраль',
        kWh: 3000,
    },
    {
        name: 'Март',
        kWh: 2000,
    },
    {
        name: 'Апрель',
        kWh: 2780,
    },
    {
        name: 'Май',
        kWh: 1890,
    },
    {
        name: 'Июнь',
        kWh: 2390,
    },
    {
        name: 'Июль',
        kWh: 3490,
    },
    {
        name: 'Август',
        kWh: 3490,
    },
    {
        name: 'Сентябрь',
        kWh: 3490,
    },
    {
        name: 'Октябрь',
        kWh: 3490,
    },
    {
        name: 'Ноябрь',
        kWh: 3490,
    },
    {
        name: 'Декабрь',
        kWh: 3490,
    }
];
