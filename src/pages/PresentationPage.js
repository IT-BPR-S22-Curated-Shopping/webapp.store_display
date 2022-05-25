import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import * as React from "react";
import {useParams} from "react-router-dom";
import ProductPresentationComponent from "../components/ProductPresentationComponent";

function PresentationPage(props) {
    const params = useParams();
    const WSHandler = props.webSocketHandler;
    const [orientation, setOrientation] = useState("horizontal")
    const [idle, setIdle] = useState(true);
    const [product, setProduct] = useState({})
    const [recommendedProducts, setRecommendedProducts] = useState([])

    useEffect(() => {
        if (params.locationId !== undefined) {
            WSHandler.connect();
            WSHandler.announceLocation(params.locationId, onMessageCallback);
        }
    }, [])

    useEffect(() => {
        setProduct({
            "id" : 458,
            "number" : "60440341",
            "name" : "Upplyst",
            "price" : 149.00,
            "description" : "Børn elsker det muntre design og det hyggelige lys, lampen giver, når den er tændt. Vores belysning til børn gennemgår nogle af verdens strengeste sikkerhedstest, så du kan være sikker på, at dit barn ikke kommer til skade",
            "caption:" : "LED-væglampe, sommerfugl lyseblå",
            "image" : "https://www.ikea.com/dk/da/images/products/upplyst-led-vaeglampe-sommerfugl-lysebla__0716795_pe731046_s5.jpg"
        })

        setRecommendedProducts([
            {
                "id" : 458,
                "number" : "60440341",
                "name" : "Upplyst",
                "price" : 149.00,
                "description" : "Børn elsker det muntre design og det hyggelige lys, lampen giver, når den er tændt. Vores belysning til børn gennemgår nogle af verdens strengeste sikkerhedstest, så du kan være sikker på, at dit barn ikke kommer til skade",
                "caption:" : "LED-væglampe, sommerfugl lyseblå",
                "image" : "https://www.ikea.com/dk/da/images/products/upplyst-led-vaeglampe-sommerfugl-lysebla__0716795_pe731046_s5.jpg"
            },
            {
                "id" : 458,
                "number" : "60440341",
                "name" : "Upplyst",
                "price" : 149.00,
                "description" : "Børn elsker det muntre design og det hyggelige lys, lampen giver, når den er tændt. Vores belysning til børn gennemgår nogle af verdens strengeste sikkerhedstest, så du kan være sikker på, at dit barn ikke kommer til skade",
                "caption:" : "LED-væglampe, sommerfugl lyseblå",
                "image" : "https://www.ikea.com/dk/da/images/products/upplyst-led-vaeglampe-sommerfugl-lysebla__0716795_pe731046_s5.jpg"
            }
        ])

        setIdle(false);
    }, [])

    const onMessageCallback = (data) => {
        // setIdle(false);
    }

    return idle ? (
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
                    src={orientation === "vertical" ? require("../resources/videos/shopping_background_video_vertical.mp4") : require("../resources/videos/shopping_background_video_horizontal.mp4")}
                    type="video/mp4"
                />
            </video>
            <Grid container style={{background: 'rgba(109,112,115,0.7)', height: "100vh"}}>
                <Typography variant={"h2"} color={"whitesmoke"} marginY={"auto"} mx={"auto"}>Experience curated shopping</Typography>
            </Grid>
        </div>
    ) : (
        <ProductPresentationComponent orientation={orientation} product={product} recommendedProducts={recommendedProducts} />
    )}

export default PresentationPage;