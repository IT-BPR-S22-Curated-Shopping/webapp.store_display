import * as React from "react";
import TextComponent from "./TextComponent";
import ProductArrayComponent from "./ProductArrayComponent"
import {getCatchPhrase} from "../util/CatchPhraseProvider";
import Grid from "@mui/material/Grid";
import {getStyle} from "../util/StyleProvider";

function VerticalRecommendationArray (props) {
    const style = getStyle();
    return (
        <Grid container item xs={12} display={'flex'} flexDirection={ props.reverse ? 'column-reverse' : 'column'} justifyContent={'center'} alignContent={'center'}>
            <TextComponent
                style={style}
                gridProps={{display:'flex', flexDirection:'column', justifyContent:'center', xs: 12, alignContent:'center', width:1}}
                text={getCatchPhrase()}
            />
            <ProductArrayComponent
                gridProps={{ display:'flex', flexDirection:'row', justifyContent:'center', xs: 12, alignContent:'center'}}
                products={props.products}
            />
        </Grid>
    )
}

export default VerticalRecommendationArray;
