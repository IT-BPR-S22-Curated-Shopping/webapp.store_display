import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useParams} from "react-router-dom";
import ProductPresentationComponent from "../components/ProductPresentationComponent";
import Grid from "@mui/material/Grid";


const product1 = {
    name: 'Addidas',
    number: '498237h',
    caption: 'Some caption',
    description: 'Really nice shoe',
    price: 499,
    commonTags: [ {tag: 'stylish'}, {tag:'addidas'}, {tag:'rightprice'}],
    image: 'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_533,b_rgb:f5f5f5/cms/z0Z7JaTiFmKncrgGOxJp7/24a0b02e2071298fe8da4628fcb7c375/Men_s_Wool_Runners_-_Natural_Grey__Light_Grey_Sole__-_imageAngle'
}

const product2 = {
    name: 'Addidas',
    number: '498237h',
    caption: 'Some caption',
    description: 'Best shoe ever',
    price: 599,
    commonTags: [ {tag: 'modern'}, {tag:'fancy'}],
    image: 'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_533,b_rgb:f5f5f5/cms/z0Z7JaTiFmKncrgGOxJp7/24a0b02e2071298fe8da4628fcb7c375/Men_s_Wool_Runners_-_Natural_Grey__Light_Grey_Sole__-_imageAngle'
}

const products = [product1, product2, product1]

function PresentationPage(props) {
    const params = useParams();
    const WSHandler = props.webSocketHandler;
    const [orientation, setOrientation] = useState("horizontal")
    const [idle, setIdle] = useState(true);
    const [product, setProduct] = useState({})
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [commonTags, setCommonTags] = useState([])

    useEffect(() => {
        if (params.locationId !== undefined) {
            WSHandler.connect();
            WSHandler.announceLocation(params.locationId, onMessageCallback);
        }
    }, [])

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