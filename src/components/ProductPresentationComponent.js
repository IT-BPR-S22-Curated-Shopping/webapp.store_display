import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Card, CardContent, CardMedia, CssBaseline, Paper, Typography} from "@mui/material";

function ProductPresentationComponent(props) {
    const [product, setProduct] = useState({})
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [orientation, setOrientation] = useState("horizontal")

    useEffect(() => {
        if (props.product !== null || props.product !== {} || props.product !== undefined) {
            setProduct(props.product);
        }

        if (props.orientation !== null || props.orientation !== {} || props.orientation !== undefined) {
            setOrientation(props.orientation);
        }

        if (props.recommendedProducts !== null || props.recommendedProducts !== {} || props.recommendedProducts !== undefined) {
            setRecommendedProducts(props.recommendedProducts);
        }
    }, [])

    return (
        <div>
            <Grid container component="main" sx={{height: '100vh', width: '100vw'}} direction={"row"}>
                <Grid container item xs={8} sx={{height: "inherit"}}>
                    <img src={product.image} style={{objectFit: "cover", width: "100%", maxHeight: "100%"}} alt="Product"/>
                </Grid>

                <Grid item xs sx={{height: "inherit"}}>
                    <Paper elevation={24} sx={{height: "100%"}}>
                        <Grid container sx={{ height: "100%" }} direction={"column"}>
                            <Grid xs={7} item>
                                <Typography align={"center"}>Recommended for you</Typography>
                                <Typography>{product.name}</Typography>
                                <Typography>{product.caption}</Typography>
                                <Typography>{product.price}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>The recommendations are served based on the following common tags between you and the product: </Typography>
                                <Typography>Tags</Typography>
                                <Typography>{product.number}</Typography>
                            </Grid>

                            <Grid xs item sx={{backgroundColor: "lightcyan"}}>
                                <Typography align={"center"}>You may also like these products</Typography>
                                {/*<Grid container direction={"row"} ml={2} mt={1} spacing={2}>*/}
                                {/*    {recommendedProducts?.map((similarProduct, key) => (*/}
                                {/*        <Grid item key={key} xs={"auto"}>*/}
                                {/*            <Card>*/}
                                {/*                <CardMedia*/}
                                {/*                    component={"img"}*/}
                                {/*                    image={similarProduct.image}*/}
                                {/*                    height="100"*/}
                                {/*                />*/}
                                {/*                <CardContent>*/}
                                {/*                    <Typography>{similarProduct.name}</Typography>*/}
                                {/*                    <Typography>Score</Typography>*/}
                                {/*                    <Typography>{similarProduct.price}</Typography>*/}
                                {/*                </CardContent>*/}
                                {/*            </Card>*/}
                                {/*        </Grid>*/}
                                {/*    ))}*/}
                                {/*</Grid>*/}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductPresentationComponent;