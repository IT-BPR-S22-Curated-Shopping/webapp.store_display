import * as React from "react";
import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import WindowUtil from '../util/WindowUtil'

function BasePage() {
    const windowUtil = WindowUtil();

    return (
        <Box>
            <video loop autoPlay style={{
                objectFit: "cover",
                height: windowUtil.size().height,
                width: windowUtil.size().width,
                top: 0,
                left: 0,
                position: "fixed",
                zIndex: -1
            }}>
                <source
                    src={require("../resources/videos/shopping_background_video_horizontal.mp4")}
                    type="video/mp4"
                />
            </video>
            <Grid container display={'flex'} flexDirection={'column'} justifyContent={'center'} alignContent={'center'} style={{background: 'rgba(109,112,115,0.7)', height: "100vh"}}>
                <Box>
                    <Typography variant={"h2"} textAlign={'center'} color={"whitesmoke"} marginY={"auto"} mx={"auto"}>Experience curated shopping@</Typography>
                </Box>
                <Box marginTop={5}>
                    <Typography variant={"h2"} textAlign={'center'} color={"whitesmoke"} marginY={"auto"} mx={"auto"}>https://curatedshopping.netlify.app/presentation/locationId/layout/layoutId</Typography>
                </Box>
            </Grid>
        </Box>
    )
}

export default BasePage;