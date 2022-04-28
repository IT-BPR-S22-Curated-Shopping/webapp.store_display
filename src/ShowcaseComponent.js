import {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {Paper, Typography} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SimpleImageSlider from "react-simple-image-slider";
import * as React from "react";

function ShowcaseComponent(props) {

    const [style, setStyle] = useState("");
    const [productImages, setProductImages] = useState({profile: null, backdrops: []});
    const [product, setProduct] = useState({name: "", caption: "", price: "", rating: ""});
    const [orientation, setOrientation] = useState("vertical")
    const [beacon, setBeacon] = useState({})
    const theme = createTheme();

    useEffect(() => {
        setBeacon(props.beacon)
        setOrientation(props.orientation)

    },[props.beacon, props.orientation])

    useEffect(() => {
        switch (beacon?.uuid) {
            case "010D2108-0462-4F97-BAB8-000000000001":
                setStyle("Modern")
                setProductImages({
                    profile: require('./resources/images/modern/profil.png'),
                    backdrops: [
                        require('./resources/images/modern/stemning_1.png'),
                        require('./resources/images/modern/stemning_2.png')
                    ]
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
                    backdrops: [
                        require('./resources/images/classic/stemning_1.png'),
                        require('./resources/images/classic/stemning_2.png'),
                        require('./resources/images/classic/stemning_3.png')
                    ]
                })
                setProduct({
                    name: "NYFORS",
                    caption: "Table lamp, \n nickel-plated white",
                    price: "€ 49.99",
                    rating: "4.8/5"
                })
                break;

            case "010D2108-0462-4F97-BAB8-000000000003":
                setStyle("Retro")
                setProductImages({
                    profile: require('./resources/images/retro/profil.png'),
                    backdrops: [
                        require('./resources/images/retro/stemning_1.png'),
                        require('./resources/images/retro/stemning_2.png'),
                        require('./resources/images/retro/stemning_3.png'),
                        require('./resources/images/retro/stemning_4.png'),
                        require('./resources/images/retro/stemning_5.png')
                    ]
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
                break;
        }
    }, [beacon])

    return style === "DEFAULT" ? (
        <div>
            <video loop autoPlay style={{
                objectFit: "cover",
                height: orientation === "vertical" ? 1920 : 1080,
                width: orientation === "vertical" ? 1080 : 1920,
                top: 0,
                left: 0,
                position: "fixed",
                zIndex: -1
            }}>
                <source
                    src={orientation === "vertical" ? require("./resources/videos/shopping_background_video_vertical.mp4") : require("./resources/videos/shopping_background_video_horizontal.mp4")}
                    type="video/mp4"
                />
            </video>
            <Grid container style={{background: 'rgba(109,112,115,0.7)', height: "100vh"}}>
                <Typography variant={"h2"} color={"whitesmoke"} marginY={"auto"} mx={"auto"}>Experience curated shopping</Typography>
            </Grid>
        </div>
    ) : (
        <div>
            <Grid container component="main" className='dialog' sx={{height: '100vh'}} direction={orientation === "vertical" ? "column" : "row"}>
                <CssBaseline/>
                <Grid
                    item
                    xs={7}
                    sx={{
                        backgroundColor: "blue",
                        height: "100%"
                    }}
                >
                    <SimpleImageSlider width={"58.33336%"} height={"100%"} images={productImages?.backdrops} showNavs={false} showBullets={false} autoPlay={true} slideDuration={2}/>
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={20}
                           sx={{
                               justifyContent: "center",
                               display: "flex",
                               flexDirection: "column",
                               height: "100%"
                           }}>
                        <Typography variant={"h5"}>Your style has been identified
                            as <b>{style}</b></Typography>
                        <Typography variant={"subtitle1"}>You might like</Typography>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography marginTop={7}
                                            variant={"body1"}><b>{product.name}</b></Typography>
                                <Typography marginTop={1} variant={"body1"}>{product.caption}</Typography>
                                <Typography marginTop={1} variant={"body1"}>{product.price}</Typography>
                                <Typography marginTop={1} variant={"body1"}>{product.rating} ★</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <img src={productImages.profile} alt={"Lamp profile"} width={"100%"}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )}

export default ShowcaseComponent;