import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Chip } from "@mui/material";

function ProductComponent (props) {

    return (
        <Card sx={{ margin: 1}} >
            <CardMedia
                component="img"
                image={props.product.image}
            />
            <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography variant="h5" component="div" fontSize={35}>
                        {props.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize={20} marginTop={2}>
                        {props.product.price} Kr
                    </Typography>
                </Box>
                    <Typography variant="body2" color="text.secondary" fontSize={20} marginBottom={1}>
                        {props.product.description}
                    </Typography>
                <Box>
                    {props.product.commonTags?.map((commonTag, key) => (
                        <Chip  key={commonTag.tag} label={commonTag.tag} sx={{mr: 1, mt:1}} variant="outlined" color="success" />
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductComponent;