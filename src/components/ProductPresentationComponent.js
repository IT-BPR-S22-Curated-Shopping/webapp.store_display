import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Card, CardContent, CardMedia, Chip, CircularProgress, Paper, Typography} from "@mui/material";

function ProductPresentationComponent(props) {
    const [product, setProduct] = useState({})
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        if (props.product !== null || props.product !== {} || props.product !== undefined) {
            setProduct(props.product);
        }

        if (props.recommendedProducts !== null || props.recommendedProducts !== {} || props.recommendedProducts !== undefined) {
            setRecommendedProducts(props.recommendedProducts);
        }

        setLoading(false);
    }, [])

    return isLoading ? (
        <Grid container direction={'column'} alignItems={"center"}>
            <Grid item mx={'auto'} mt={5}>
                <CircularProgress size={100}/>
            </Grid>
            <Grid item mx={'auto'}>
                <Typography variant={'h5'}>Loading data...</Typography>
            </Grid>
        </Grid>
    ) : (
        <div>
            <Grid container component="main" sx={{height: '100vh', width: '100vw'}} direction={"row"}>
                <Grid container item xs={8} sx={{height: "inherit"}}>
                    <img src={props.product.image} style={{objectFit: "cover", width: "100%", maxHeight: "100%"}} alt="Product"/>
                </Grid>

                <Grid item xs sx={{height: "inherit"}}>
                    <Paper elevation={24} sx={{height: "100%"}}>
                        <Grid container sx={{ height: "100%" }} direction={"column"}>
                            <Grid xs={7} px={3} item>
                                <Typography align={"center"} pt={2} variant={"h5"}>Recommended for you</Typography>
                                <Typography pt={3} fontSize={"large"}><b>{props.product.name}</b></Typography>
                                <Typography fontSize={"small"}>{props.product.number}</Typography>
                                <Typography pt={1}>{props.product.caption}</Typography>
                                <Typography pt={1}>Price: <b>{props.product.price} DKK</b></Typography>
                                <Typography paragraph pt={1}>{props.product.description}</Typography>
                                {/*<Typography paragraph pt={3}>The recommendations are served based on the following common tags between you and the product: </Typography>*/}
                                {props.product.tags?.map((tag, key) => (
                                    <Chip key={tag.tag} label={tag.tag} sx={{mx: 1}} variant="outlined" />
                                ))}
                                {/*<Typography paragraph pt={2}>The {product?.product.name} is deemed a {(product.score * 100).toFixed(3)}% match to your preferences. </Typography>*/}
                            </Grid>

                            <Grid xs item>
                                <Typography align={"center"} pb={2} variant={"h6"}>You may also like these products</Typography>
                                <Grid container justifyContent={"center"} direction={"row"} spacing={2} sx={{overflow: "hidden"}} wrap={"nowrap"}>
                                    {props.relatedProducts?.map((similarProduct, key) => (
                                        <Grid item key={key} xs={"auto"}>
                                            <Card>
                                                <CardMedia
                                                    component={"img"}
                                                    image={similarProduct.product.image}
                                                    height="170"
                                                />
                                                <CardContent>
                                                    <Typography><b>{similarProduct.product.name}</b></Typography>
                                                    <Typography>Price: {similarProduct.product.price} DKK</Typography>
                                                    {/*<Typography>Match: {(similarProduct.score * 100).toFixed(3)} %</Typography>*/}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductPresentationComponent;