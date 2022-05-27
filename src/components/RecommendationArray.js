import * as React from "react";
import ProductArrayComponent from "./ProductArrayComponent"
import Grid from "@mui/material/Grid";
import TextComponent from "./TextComponent";
import {getStyle} from "../util/StyleProvider";
import {getCatchPhrase} from "../util/CatchPhraseProvider";

function RecommendationArray (props) {
    return (
        <Grid item display={'flex'} flexDirection={'column'} justifyContent={'center'} xs={12}>
            <TextComponent
                text={getCatchPhrase()}
                style={getStyle()}
                gridProps={{overflow:'hidden', margin:1, display:'flex'}}
            />
            <ProductArrayComponent products={props.products} sx={{margin: 1}}/>
        </Grid>
    )
}

export default RecommendationArray;
