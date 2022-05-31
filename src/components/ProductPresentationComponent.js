import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Card, CardContent, CardMedia, Chip, CircularProgress, Typography} from "@mui/material";


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function ProductPresentationComponent(props) {
    const [isLoading, setLoading] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <Grid container item xs={12} lg={6}  >
                    <img src={props.product.image} style={{objectFit: "cover", width: "100%", maxHeight: (windowDimensions.width < 1400 ? '50vh' : '100%')}} alt="Product"/>
                </Grid>

                <Grid item xs lg={6}>
                        <Grid container direction={"column"} justifyContent={'space-between'} >
                            <Grid item xs={3} pl={3} pr={3} pb={3}>
                                <Typography pt={3} fontSize={"large"}><b>{props.product.name}</b></Typography>
                                <Typography fontSize={"small"}>{props.product.number}</Typography>
                                <Typography pt={1}>{props.product.caption}</Typography>
                                <Typography pt={1}>Price: <b>{props.product.price} DKK</b></Typography>
                                <Typography paragraph pt={1}>{props.product.description}</Typography>
                                {props.product.tags?.map((tag, key) => (
                                    <Chip key={tag.tag} label={tag.tag} sx={{mx: 1}} variant="outlined" />
                                ))}
                            </Grid>
                            <Grid item xs={3} p={3} >
                                <Typography align={"center"} pb={2} variant={"h6"}>You may also like these products</Typography>
                                <Grid container justifyContent={"center"} direction={"row"} spacing={2}>
                                    {props.relatedProducts?.slice(0, windowDimensions.width < 1400 ? 5 : props.relatedProducts.length).map((similarProduct, key) => (
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
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductPresentationComponent;