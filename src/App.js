import './App.css';
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {Paper, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useEffect, useState} from "react";

const mqtt = require('mqtt/dist/mqtt');

function App() {
    const host = 'ws://10.0.4.10:8080'
    const topic = ['0462/rpi3/beacon']
    const [style, setStyle] = useState("Style: N/A");
    const [productImages, setProductImages] = useState({profile: null, backdrop_1: null, backdrop_2: null});
    const [product, setProduct] = useState({name: "", caption: "", price: "", rating: ""});
    const [beacon, setBeacon] = useState({})
    const [beaconTime, setBeaconTime] = useState(new Date())
    const [tick, setTick] = useState(1)
    const theme = createTheme();

    useEffect(() => {
        let secondsBetween = (new Date().getTime() - beaconTime.getTime()) / 1000;

        if (secondsBetween > 5) {
            setBeacon(null)
        }
    },[tick])

    useEffect(() => {
        setInterval(() => {
            setTick(Math.random);
        }, 1000)

        const mqttOptions = {
            clientId: 'SD' + Math.random().toString(16),
            protocolId: 'MQTT',
            protocolVersion: 4,
            username: 'anchor',
            password: 'BLEtracker',
            reconnect: true,
            reconnectPeriod: 1000,
            keepAlive: 30,
            clean: true,
            rejectUnauthorized: false
        }
        const mqttClient = mqtt.connect(host, mqttOptions)

        mqttClient.on('connect', () => {
            console.log('Mqtt connected.')
            mqttClient.subscribe(topic, () => {
                console.log(`Subscribed to topic '${topic}'`)
            })
        })

        mqttClient.on("error", (error) => {
            console.log("Can't connect" + error);
            process.exit(1)
        });

        mqttClient.on('message', (topic, payload) => {
            const msg = JSON.parse(payload.toString())
            console.log(msg)
            setBeaconTime(new Date())
            setBeacon(msg);
        })

        mqttClient.on('close', () => {
            console.log('MQTT disconnected')
        })
    }, [])


    useEffect(() => {
        switch (beacon?.uuid) {
            case "010D2108-0462-4F97-BAB8-000000000001":
                setStyle("Modern")
                setProductImages({
                    profile: require('./resources/images/modern/profil.png'),
                    backdrop_1: require('./resources/images/modern/stemning_1.png'),
                    backdrop_2: require('./resources/images/modern/stemning_2.png')
                })
                setProduct({
                    name: "TÄRNABY",
                    caption: "Table lamp, anthracite",
                    price: "€ 17.99",
                    rating: "4.6/5"
                })
                break;

            case "010D2108-0462-4F97-BAB8-000000000002":
                setStyle("Classic")
                setProductImages({
                    profile: require('./resources/images/classic/profil.png'),
                    backdrop_1: require('./resources/images/classic/stemning_1.png'),
                    backdrop_2: require('./resources/images/classic/stemning_2.png')
                })
                setProduct({
                    name: "NYFORS",
                    caption: "Table lamp, nickel-plated white",
                    price: "€ 49.99",
                    rating: "4.8/5"
                })
                break;

            case "010D2108-0462-4F97-BAB8-000000000003":
                setStyle("Retro")
                setProductImages({
                    profile: require('./resources/images/retro/profil.png'),
                    backdrop_1: require('./resources/images/retro/stemning_1.png'),
                    backdrop_2: require('./resources/images/retro/stemning_2.png')
                })
                setProduct({
                    name: "ROPUDDEN",
                    caption: "Table lamp, dome",
                    price: "€ 17.99",
                    rating: "3/5"
                })
                break;

            default:
                setStyle("DEFAULT")
                setProductImages({
                    profile: require('./resources/images/retro/profil.png'),
                    backdrop_1: require('./resources/images/retro/stemning_1.png'),
                    backdrop_2: require('./resources/images/retro/stemning_2.png')
                })
                setProduct({
                    name: "DEFAULT",
                    caption: "DEFAULT",
                    price: "€ 000",
                    rating: "3/5"
                })
                break;
        }
    }, [beacon])


    return (
        <div className="App">
            <header className="App-header">
                <ThemeProvider theme={theme}>
                    <Grid container component="main" sx={{height: '100vh'}}>
                        <CssBaseline/>
                        <Grid
                            item
                            xs={7}
                            sx={{
                                backgroundImage: `url(${productImages.backdrop_1})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                        </Grid>
                        <Grid item xs={5}>
                            <Paper elevation={8}
                                   sx={{
                                       justifyContent: "center",
                                       display: "flex",
                                       flexDirection: "column",
                                       height: "100vh"
                                   }}>
                                <Typography variant={"h5"} marginBottom={5}>Your style has been identified
                                    as <b>{style}</b></Typography>
                                <Typography marginY={4} variant={"subtitle1"}>You might like</Typography>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography marginTop={7}
                                                    variant={"body1"}>IKEA <b>{product.name}</b></Typography>
                                        <Typography marginTop={1} variant={"body1"}>{product.caption}</Typography>
                                        <Typography marginTop={1} variant={"body1"}>{product.price}</Typography>
                                        <Typography marginTop={1} variant={"body1"}>{product.rating} ★</Typography>
                                    </Grid>
                                    <Grid item xs={7} mb={10}>
                                        <img src={productImages.profile} alt={"Lamp profile"} width={"100%"}/>
                                    </Grid>
                                </Grid>
                                <Typography variant={"caption"}>Closest beacon: {beacon?.uuid}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </header>
        </div>
    );
}

export default App;
