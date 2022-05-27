import ProductComponent from "./ProductComponent";
import Grid from "@mui/material/Grid";

function ProductArrayComponent (props) {

    let  key = 0;

    return (
        <Grid container item>
            {
                props.products.map(product => {
                    key++;
                    return <ProductComponent key={key} product={product}/>
                })
            }
        </Grid>
    )
}

export default ProductArrayComponent;