import {useEffect, useState} from "react";
import * as React from "react";
import {useParams} from "react-router-dom";
import ProductPresentationComponent from "../components/ProductPresentationComponent";
import SinglePlusArrayRecommendation from "../components/SinglePlusArrayRecommendation";


function PresentationPage(props) {
    const params = useParams();
    const WSHandler = props.webSocketHandler;
    const [idle, setIdle] = useState(true);

    const [productReceived, setProductReceived] = useState(false);
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [recommendation, setRecommendation] = useState({});



    useEffect(() => {
        let locationId = params.locationId;
        if (locationId !== undefined) {
            WSHandler.connect(locationId);
            WSHandler.setCallbacks(onMessageCallback, onInitialProduct);
        }
    }, [])

    const onInitialProduct = (data) => {
        setProduct(data.currentProduct);
        setRelatedProducts(data.recommendations);
        setProductReceived(true);
        console.log("presentation page initial data");
    }

    const onMessageCallback = (payload) => {
        const recommendation = {
            product: payload.product.product,
            recommendedProducts: payload.recommendedProducts.map(recommendation => recommendation.product)
        }
        setRecommendation(recommendation)
        setIdle(false)
    }

    return idle ? (
        productReceived && (
           <ProductPresentationComponent product={product} relatedProducts={relatedProducts} />
        )
    ) : (
        <SinglePlusArrayRecommendation recommendation={recommendation}/>
    )}

export default PresentationPage;