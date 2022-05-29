import Grid from "@mui/material/Grid";
import SingleProductRecommendation from "./SingleProductReccomendation";
import RecommendationArray from "./RecommendationArray";
import * as React from "react";
import WindowUtil from "../util/WindowUtil";

function SinglePlusArrayRecommendation (props) {
    const windowUtil = WindowUtil();

    return (
        <Grid container item display={'flex'} direction={windowUtil.size().width > windowUtil.size().height ? 'row' : 'column'} justifyContent={'space-evenly'} alignContent={'space-evenly'}>
            <Grid item >
                <SingleProductRecommendation product={props.recommendation.product} window={windowUtil.size()}/>
            </Grid>
            <Grid item  marginTop={windowUtil.size().width > windowUtil.size().height ? 0 : 5}>
                <RecommendationArray products={props.recommendation.recommendedProducts} window={windowUtil.size()}/>
            </Grid>
        </Grid>
    )
}

export default SinglePlusArrayRecommendation