import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Box, CardMedia, Fade, Slide, Typography, Zoom} from '@mui/material';
import {useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {useInterval} from '../util/UseInterval';

function PresentationPage2(props) {
    const params = useParams();
    const WSHandler = props.webSocketHandler;

    const [initialRecommendedProducts, setInitialRecommendedProducts] = useState([]);

    const [displayedProduct, setDisplayedProduct] = useState({});
    const [displayedRecommendations, setDisplayedRecommendation] = useState([]);
    const [displayedColor, setDisplayedColor] = useState('#39afd2');
    const [isRecommendation, setIsRecommendation] = useState(false);
    const [zoom, setZoom] = useState(true);
    const colors = ['#9d9d9d', '#ff5606', '#4153b8', '#00bbd4', '#39afd2', '#353f45', '#9e32af', '#f0245e'];
    const timer = useRef(null);

    useEffect(() => {
        let locationId = params.locationId;
        if (locationId !== undefined) {
            WSHandler.connect(locationId);
            WSHandler.setCallbacks(onMessageCallback, onInitialProduct);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const interval = useInterval(() => {
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
                recArray.push(item);
            }
        }
        setDisplayedRecommendation(recArray);

        setZoom(true);

    }, 10000);

    function startTimer() {
        // Start a timer
        if (timer.current == null)
            timer.current = setTimeout(timeoutCallback, 20000);
    }

    function timeoutCallback() {
        timer.current = null;
        setIsRecommendation(false);
        interval.resume();
    }

    // recommendation
    const onMessageCallback = (data) => {
        console.log('received recommendation');
        setIsRecommendation(true);
        let randomColorNum = Math.floor(Math.random() * colors.length);
        setDisplayedColor(colors[randomColorNum]);
        setDisplayedProduct(data.product);
        setDisplayedRecommendation(data.recommendedProducts);

        interval.pause();
        startTimer();

    };
    // initial product
    const onInitialProduct = (data) => {
        let randomColorNum = Math.floor(Math.random() * colors.length);
        // set products to display
        setDisplayedColor(colors[randomColorNum]);
        setDisplayedProduct(data.recommendations[0]);
        setDisplayedRecommendation(data.recommendations);
        // set initial products
        setInitialRecommendedProducts(data.recommendations);
    };

    return (
        <Grid container direction={'column'}>
            <Grid item bgcolor={displayedColor} alignContent={'center'}>
                <Grid container direction={'row'}>
                    {!isRecommendation && (
                        <Grid item xs={6}>
                            <Grid container height={'100%'} direction={'column'} justifyContent={'center'}
                                  textAlign={'center'}>
                                <Box color={'white'}>
                                    {isRecommendation && displayedProduct.score && (
                                        <Box>
                                            <Typography variant="h5" m={2}>Your recommendation</Typography>

                                            <Typography variant={'h7'}>Product score</Typography>
                                            <Typography variant={'h5'}>{Math.floor(
                                                displayedProduct?.score * 100)}</Typography>
                                        </Box>

                                    )}

                                    {
                                        zoom && (
                                            <Zoom in={true}
                                                  style={{transitionDelay: '500ms', transitionDuration: '1000ms'}}>
                                                <Box>
                                                    <Typography sx={{fontWeight: 'bold'}} p={5}
                                                                variant="h2">{displayedProduct?.product?.name?.toUpperCase()}</Typography>
                                                    <Typography p={5} bgcolor={'white'} color={displayedColor}
                                                                sx={{fontWeight: 'bold'}}>
                                                        {displayedProduct?.product?.description}
                                                    </Typography>
                                                    <Typography p={5}
                                                                variant="h4">price: {displayedProduct.product?.price},-</Typography>
                                                </Box>
                                            </Zoom>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    <Grid item xs={isRecommendation ? 12 : 6}>
                        <Box
                            height={'80vh'}
                            sx={{
                                backgroundImage: `url(${displayedProduct?.product?.image})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 0',
                            }}
                        >
                            <Slide direction="right" in={isRecommendation}>
                                <Box bgcolor={'white'} p={3} style={{position: 'fixed', top: '10%', left: 'auto'}}>
                                    <Typography variant={'h5'}>Your recommendation</Typography>
                                    <Typography variant={'h7'}>Product score</Typography>
                                    {displayedProduct && (
                                        <Box>
                                            <Typography variant={'h5'}>{displayedProduct?.score ? Math.floor(
                                                displayedProduct?.score * 100) : ''}</Typography>
                                            <Typography variant={'h3'}
                                                        mt={3}>{displayedProduct?.product?.name}</Typography>
                                            <Typography variant={'h7'}
                                                        mt={3}>{displayedProduct?.product?.caption}</Typography>
                                        </Box>

                                    )}

                                </Box>
                            </Slide>

                        </Box>

                    </Grid>
                </Grid>
            </Grid>
            <Slide in={true} direction={'up'}>
                <Grid item textAlign={'center'}>
                    <Grid container sx={{mt: '-10vh'}} justifyContent={'center'}>
                        <Box item xs={8} sx={{borderRadius: '10px'}} bgcolor={'white'} boxShadow={1} p={1}>
                            <Typography pt={1} variant={'h5'}>You may also like</Typography>
                            <Grid container>
                                <Grid item pl={2} pr={1}>
                                    <Fade in={true} style={{transformOrigin: '0 0 0', transitionDelay: '800ms'}}>
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
                                    </Fade>

                                </Grid>
                                <Grid item pl={1} pr={1}>
                                    <Fade in={true} style={{transformOrigin: '0 0 0', transitionDelay: '1000ms'}}>
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
                                    </Fade>
                                </Grid>
                                {displayedRecommendations[2]?.product?.image && (
                                    <Grid item pl={1} pr={1}>
                                        <Fade in={true} style={{transformOrigin: '0 0 0', transitionDelay: '1200ms'}}>
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
                                        </Fade>
                                    </Grid>
                                )}
                                {displayedRecommendations[3]?.product?.image && (
                                    <Grid item pl={1} pr={2}>
                                        <Fade in={true} style={{transformOrigin: '0 0 0', transitionDelay: '1400ms'}}>
                                            <Box>
                                                <CardMedia
                                                    component="img"
                                                    height="200px"
                                                    image={displayedRecommendations[3]?.product?.image}
                                                    alt=""
                                                />
                                                <Box>
                                                    <Typography gutterBottom variant="h5" component="div" mt={2}>
                                                        {displayedRecommendations[3]?.product?.name.toUpperCase()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Slide>

        </Grid>
    );
}

export default PresentationPage2;