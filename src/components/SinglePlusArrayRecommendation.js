import Grid from "@mui/material/Grid";
import SingleProductRecommendation from "./SingleProductReccomendation";
import RecommendationArray from "./RecommendationArray";
import * as React from "react";

function SinglePlusArrayRecommendation (props) {

    return (
        <Grid container item display={'flex'} direction={'row'} justifyContent={'center'} alignContent={'center'}>
            <Grid item md={7} lg={5} >
                <SingleProductRecommendation product={props.recommendation.product}/>
            </Grid>
            <Grid item md={5} lg={7} marginTop={3}>
                <RecommendationArray products={props.recommendation.recommendedProducts}/>
            </Grid>
        </Grid>
        )
}

export default SinglePlusArrayRecommendation