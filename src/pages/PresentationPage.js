import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useParams} from "react-router-dom";
import ProductPresentationComponent from "../components/ProductPresentationComponent";
import Grid from "@mui/material/Grid";

function PresentationPage(props) {
    const params = useParams();
    const WSHandler = props.webSocketHandler;
    const [orientation, setOrientation] = useState("horizontal")
    const [idle, setIdle] = useState(true);
    const [product, setProduct] = useState({})
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [commonTags, setCommonTags] = useState([])

    useEffect(() => {
        let locationId = params.locationId;
        if (locationId !== undefined) {
            WSHandler.connect(locationId);
            WSHandler.setCallbacks(onMessageCallback, onInitialProduct);
        }
    }, [])

    const onInitialProduct = (data) => {
        console.log("presentation page initial data");
    }

    const onMessageCallback = (data) => {
        setProduct(data.product)
        setRecommendedProducts(data.recommendedProducts)
        setCommonTags(data.commonTags)
        setIdle(false)
    }

    return idle ? (
        <Box>
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
                    src={require("../resources/videos/shopping_background_video_horizontal.mp4")}
                    type="video/mp4"
                />
            </video>
            <Grid container style={{background: 'rgba(109,112,115,0.7)', height: "100vh"}}>
                <Typography variant={"h2"} color={"whitesmoke"} marginY={"auto"} mx={"auto"}>Experience curated shopping</Typography>
            </Grid>
        </Box>
    ) : (
        <ProductPresentationComponent orientation={orientation} product={product} recommendedProducts={recommendedProducts} commonTags={commonTags} />
    )}

export default PresentationPage;