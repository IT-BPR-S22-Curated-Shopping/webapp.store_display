import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Chip } from "@mui/material";
import Grid from "@mui/material/Grid";

function ProductComponent (props) {

    return (
        <Grid item xs={12} md={4}>
            <Card sx={{ margin: 1, minHeight: 402}} >
                <CardMedia
                    component="img"
                    image={props.product.image}
                    sx={{
                        height: props.window.height > props.window.width ? props.window.height * 0.2 :  props.window.height * 0.3,
                        width: props.window.height > props.window.width ? 'auto' : 'auto',
                        padding:2}}
                />
                <CardContent>
                    <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5" component="div" fontSize={35}>
                            {props.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontSize={20} marginTop={2}>
                            {props.product.price} Kr
                        </Typography>
                    </Grid>
                        <Typography variant="body2" color="text.secondary" fontSize={20} marginBottom={1} marginTop={1}>
                            {props.product.caption}
                        </Typography>
                    <Grid container>
                        {props.product.commonTags?.map((commonTag, key) => (
                            <Chip  key={commonTag.tag} label={commonTag.tag} sx={{mr: 1, mt:1}} variant="outlined" color="success" />
                        ))}
                    </Grid>
                </CardContent>
            </Card>

        </Grid>
    )
}

export default ProductComponent;