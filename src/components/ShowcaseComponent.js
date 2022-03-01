import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Container, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";

const theme = createTheme();

export default function ShowcaseComponent(props) {
    const beacon = props.beacon;
    const [style, setStyle] = useState("Style: N/A");
    const [productImages, setProductImages] = useState({ profile: null, backdrop_1: null, backdrop_2: null });
    const [product, setProduct] = useState({name: "", caption: "", price: "", rating: ""});

    useEffect(() => {
        switch (beacon.iBeacon.uuid) {
            case "010d2108-0462-4f97-bab8-000000000001":
                setStyle("Modern")
                setProductImages({
                    profile: require('../resources/images/modern/profil.png'),
                    backdrop_1: require('../resources/images/modern/stemning_1.png'),
                    backdrop_2: require('../resources/images/modern/stemning_2.png')
                })
                setProduct({
                    name: "TÄRNABY",
                    caption: "Table lamp, anthracite",
                    price: "€ 17.99",
                    rating: "4.6/5"
                })
                break;

            case "010d2108-0462-4f97-bab8-000000000002":
                setStyle("Classic")
                setProductImages({
                    profile: require('../resources/images/classic/profil.png'),
                    backdrop_1: require('../resources/images/classic/stemning_1.png'),
                    backdrop_2: require('../resources/images/classic/stemning_2.png')
                })
                setProduct({
                    name: "NYFORS",
                    caption: "Table lamp, nickel-plated white",
                    price: "€ 49.99",
                    rating: "4.8/5"
                })
                break;

            case "010d2108-0462-4f97-bab8-000000000003":
                setStyle("Retro")
                setProductImages({
                    profile: require('../resources/images/retro/profil.png'),
                    backdrop_1: require('../resources/images/retro/stemning_1.png'),
                    backdrop_2: require('../resources/images/retro/stemning_2.png')
                })
                setProduct({
                    name: "ROPUDDEN",
                    caption: "Table lamp, dome",
                    price: "€ 17.99",
                    rating: "3/5"
                })
                break;

            default:
                break;
        }
    }, [beacon])

    return (beacon.rssi > -60) ? (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
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
                    <Paper elevation={8} sx={{justifyContent: "center", display: "flex", flexDirection: "column", height: "100vh"}}>
                        <Typography variant={"h5"} marginBottom={5}>Your style has been identified as <b>{style}</b></Typography>
                        <Typography marginY={4} variant={"subtitle1"}>You might like</Typography>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography marginTop={7} variant={"body1"}>IKEA <b>{product.name}</b></Typography>
                                <Typography marginTop={1} variant={"body1"}>{product.caption}</Typography>
                                <Typography marginTop={1} variant={"body1"}>{product.price}</Typography>
                                <Typography marginTop={1} variant={"body1"}>{product.rating} ★</Typography>
                            </Grid>
                            <Grid item xs={7} mb={10}>
                                <img src={productImages.profile} alt={"Lamp profile"} width={"100%"}/>
                            </Grid>
                        </Grid>
                        <Typography variant={"caption"}>Closest beacon: {beacon.iBeacon.uuid}</Typography>
                    </Paper>
                </Grid>
            </Grid>

        </ThemeProvider>) : (
            <Container sx={{ height: '100vh' }}>
                <p>Indsæt standard her</p>
            </Container>
    );
}
