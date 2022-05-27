function RecommendationParser() {

    const parseRecommendation = (payload) => {
        let data = JSON.parse(payload);

        let top4Recommendations = data.recommendations.sort(function (a,b) { return b.score - a.score }).slice(0,4);

        let highlightedProduct = top4Recommendations.shift();

        let commonTags = data.customer.tags.filter(x => highlightedProduct.product.tags.some(y => x.tag === y.tag));

        return {
            "product": highlightedProduct,
            "recommendedProducts": top4Recommendations,
            "commonTags": commonTags
        }
    }

    const parseData = (payload) => {
        return JSON.parse(payload.data);
    }

    return {parseRecommendation, parseData}
}


export default RecommendationParser;