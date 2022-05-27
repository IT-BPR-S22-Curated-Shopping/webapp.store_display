import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, CardContent, CardMedia, Typography, Zoom} from '@mui/material';
import {useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {useIntervalC} from '../util/UseIntervalC';

function PresentationPage2(props) {
    const params = useParams();
    const WSHandler = props.webSocketHandler;

    const [initialProduct, setInitialProduct] = useState({});
    const [initialRecommendedProducts, setInitialRecommendedProducts] = useState([]);

    const [displayedProduct, setDisplayedProduct] = useState({});
    const [displayedRecommendations, setDisplayedRecommendation] = useState([]);
    const [displayedColor, setDisplayedColor] = useState('#39afd2')


    const [isRecommendation, setIsRecommendation] = useState(false);
    const [zoom, setZoom] = useState(true);
    const colors = ['#9d9d9d', '#ff5606', '#4153b8', '#00bbd4', '#39afd2', '#353f45','#9e32af', '#f0245e']


    useEffect(() => {
        let locationId = params.locationId;
        if (locationId !== undefined) {
            WSHandler.connect(locationId);
            WSHandler.setCallbacks(onMessageCallback, onInitialProduct);
        }
    }, []);

    useIntervalC(() => {
        if (isRecommendation) {
            return;
        }
        setZoom(false);

        let randomColorNum = Math.floor(Math.random() * colors.length);
        setDisplayedColor(colors[randomColorNum]);

        let randomNumber = Math.floor(Math.random() * initialRecommendedProducts.length);
        setDisplayedProduct(initialRecommendedProducts[randomNumber]);

        let recArray = [];
        for (let i = 0; recArray.length < 5; i++) {
            let num = Math.floor(Math.random() * initialRecommendedProducts.length);
            let item = initialRecommendedProducts[num];
            if (!recArray.find(x => x === item)) {
                recArray.push(item)
            }
        }
        setDisplayedRecommendation(recArray)

        setZoom(true);
    }, 10000);


    const onMessageCallback = (data) => {
        // recommendation detected TODO
        setIsRecommendation(true)


        let randomColorNum = Math.floor(Math.random() * colors.length);
        setDisplayedColor(colors[randomColorNum]);
        setDisplayedProduct(data.product);
        setDisplayedRecommendation(data.recommendedProducts);

        setTimeout(()=> {setIsRecommendation(false)}, 40000)
    };

    const onInitialProduct = (data) => {
        let randomColorNum = Math.floor(Math.random() * colors.length);
        // set products to display
        setDisplayedColor(colors[randomColorNum]);
        setDisplayedProduct(data.recommendations[0]);
        setDisplayedRecommendation(data.recommendations);
        // set initial products
        setInitialRecommendedProducts(data.recommendations);
        setInitialProduct(data.currentProduct);
    };

    return (
        <Grid container direction={'column'}>
            <Grid item bgcolor={displayedColor} alignContent={'center'}>
                <Grid container direction={'row'}>
                    <Grid item xs={6}>
                        <Grid container height={'100%'} direction={'column'} justifyContent={'center'}
                              textAlign={'center'}>
                            <Box color={'white'}>
                                {isRecommendation && displayedProduct.score && (
                                    <Box>
                                        <Typography variant="h5" m={2}>Your recommendation</Typography>

                                        <Typography variant={"h7"}>Product score</Typography>
                                        <Typography variant={"h5"}>{Math.floor(displayedProduct?.score * 100)}</Typography>
                                    </Box>

                                )}

                                {
                                    zoom && (
                                        <Zoom in={true}
                                              style={{transitionDelay: '500ms', transitionDuration: '1000ms'}}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 'bold' }} p={5} variant="h2">{displayedProduct?.product?.name?.toUpperCase()}</Typography>
                                                <Typography p={5} bgcolor={'white'} color={displayedColor} sx={{ fontWeight: 'bold' }}>
                                                    {displayedProduct?.product?.description}
                                                </Typography>
                                                <Typography p={5} variant="h4">price: {displayedProduct.product?.price},-</Typography>
                                            </Box>
                                        </Zoom>
                                    )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            height={'80vh'}
                            sx={{
                                backgroundImage: `url(${displayedProduct?.product?.image})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 0',
                            }}
                        />
                    </Grid>

                </Grid>

            </Grid>
            <Grid item textAlign={'center'}>
                <Grid container sx={{mt: '-5vh'}} justifyContent={'center'}>

                    <Box item xs={8} sx={{borderRadius: '10px'}} bgcolor={'white'} boxShadow={1} p={1}>
                        <Typography pt={1} variant={"h5"}>You may also like</Typography>
                        <Grid container>
                            <Grid item pl={2} pr={1}>
                                <Box>
                                    <CardMedia
                                        component="img"
                                        height="200px"
                                        image={displayedRecommendations[0]?.product?.image}
                                        alt=""
                                    />
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="div" mt={2}>
                                            {displayedRecommendations[0]?.product?.name.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item pl={1} pr={1}>
                                <Box>
                                    <CardMedia
                                        component="img"
                                        height="200px"
                                        image={displayedRecommendations[1]?.product?.image}
                                        alt=""
                                    />
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="div" mt={2}>
                                            {displayedRecommendations[1]?.product?.name.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item pl={1} pr={1}>
                                <Box>
                                    <CardMedia
                                        component="img"
                                        height="200px"
                                        image={displayedRecommendations[2]?.product?.image}
                                        alt=""
                                    />
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="div" mt={2}>
                                            {displayedRecommendations[2]?.product?.name.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item pl={1} pr={2}>
                                <Box>
                                    <CardMedia
                                        component="img"
                                        height="200px"
                                        image={displayedRecommendations[3]?.product?.image}
                                        alt=""
                                    />
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="div"mt={2}>
                                            {displayedRecommendations[3]?.product?.name.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>


                </Grid>

            </Grid>
        </Grid>
    );
}

export default PresentationPage2;