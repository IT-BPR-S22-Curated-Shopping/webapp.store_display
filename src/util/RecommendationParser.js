function RecommendationParser() {

    const addCommonTagsToProducts = (recommendations, customerTags) => {
        recommendations.forEach((recommendation) => {
            recommendation.product.commonTags = customerTags.filter(x => recommendation.product.tags.some(y => x.tag === y.tag));
        });
        return recommendations;
    }

    const getTopRecommendations = (recommendations, count) => recommendations.sort(function (a,b) { return b.score - a.score }).slice(0, count);

    const parseRecommendation = (payload) => {
        const data = JSON.parse(payload);

        let topRecommendations = getTopRecommendations(data.recommendations, 4);

        topRecommendations = addCommonTagsToProducts(topRecommendations, data.customer.tags);

        const highlightedProduct = topRecommendations.shift();

        return {
            "product": highlightedProduct,
            "recommendedProducts": topRecommendations
        }
    }

    const parseData = (payload) => {
        return JSON.parse(payload.data);
    }

    return {parseData, parseRecommendation}
}

export default RecommendationParser;