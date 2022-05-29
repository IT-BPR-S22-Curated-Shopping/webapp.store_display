import * as React from "react";
import Grid from "@mui/material/Grid";
import {Box, ImageList, ImageListItem, Paper, Typography} from "@mui/material";
import {getFont} from "../util/StyleProvider";

function SingleProductRecommendation (props) {

    return (
        <Grid item display={'flex'} flexDirection={"row"} justifyContent={'center'} alignContent={"space-between"}>
            <Paper elevation={0} sx={{padding: 3}} >
                <Typography sx={{
                    typography: 'h6',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    color: 'black',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 60,
                    fontFamily: getFont(),
                    letterSpacing: 5,
                    lineHeight: 'normal',
                    marginBottom: 3
                }}>
                    Just 4 U
                </Typography>
                <Box width={'40vh'} height={'40vh'} margin={5} bgcolor={'green'} sx={{ backgroundImage: `url(${props.product.image})`, backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/>

                <Typography sx={{
                    typography: 'h5',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    color: 'black',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 60,
                    fontFamily: 'default',
                    letterSpacing: 5,
                    lineHeight: 'normal',
                    marginBottom: 1
                }}>
                    {props.product.name}
                </Typography>
                <Typography sx={{
                    typography: 'subtitle1',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    color: 'black',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 25,
                    fontFamily: 'secondary',
                    letterSpacing: 4,
                    lineHeight: 'normal'
                }}>
                    {props.product.caption}
                </Typography>
                <Typography sx={{
                    typography: 'body1',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    color: 'black',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'secondary',
                    letterSpacing: 4,
                    lineHeight: 'normal',
                    marginTop:2
                }}>
                    {props.product.price} Kr
                </Typography>
            </Paper>

        </Grid>

    )
}

export default SingleProductRecommendation;