import * as React from "react";
import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

function TextComponent (props) {
    const style = props.style
    const [mainText, subText] = props.text.split('\n')

    return (
        <Grid item {...props.gridProps} >
            <Box sx={style.text.wrapper.sx}>
                <Typography {...style.text.head}>
                    {mainText}
                </Typography>
                <Typography {...style.text.sub}>
                    {subText}
                </Typography>
            </Box>
        </Grid>
    );
}

export default TextComponent;