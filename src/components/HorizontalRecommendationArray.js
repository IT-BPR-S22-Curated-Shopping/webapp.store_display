import * as React from "react";
import TextComponent from "./TextComponent";
import ProductArrayComponent from "./ProductArrayComponent"
import {getCatchPhrase} from "../util/CatchPhraseProvider";
import Grid from "@mui/material/Grid";
import {getStyle} from "../util/StyleProvider";

function HorizontalRecommendationArray (props) {
    const style = getStyle();
    return (
        <Grid container item xs={12} display={'flex'} flexDirection={props.reverse ? 'row-reverse' : 'row'} justifyContent={'center'} alignContent={'center'}>
            <TextComponent
                style={style}
                gridProps={{display:'flex', flexDirection:'column', justifyContent:'flex-start', xs: 3, md: 4, alignContent:'center'}}
                text={getCatchPhrase()}
            />
            <ProductArrayComponent
                gridProps={{ display:'flex', flexDirection:'row', justifyContent:'center', xs: 9, md: 8, alignContent:'center'}}
                products={props.products}
            />
        </Grid>
    )
}

export default HorizontalRecommendationArray;