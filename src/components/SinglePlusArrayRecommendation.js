import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import SingleProductRecommendation from "./SingleProductReccomendation";
import RecommendationArray from "./RecommendationArray";
import * as React from "react";

function SinglePlusArrayRecommendation (props) {

    return (
        <Grid container display={'flex'} flexDirection={'row'} justifyContent={'center'} alignContent={'center'} xs={12} >
            <Box>
                <SingleProductRecommendation product={props.recommendation.product}/>
            </Box>
            <Box marginTop={3}>
                <RecommendationArray products={props.recommendation.recommendedProducts}/>
            </Box>
        </Grid>
        )
}

export default SinglePlusArrayRecommendation