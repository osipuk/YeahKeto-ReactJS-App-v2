import { campaign_306753 } from './campaign_306753';
import defaultConfig from './campaign_default';

/*
	splitTestingAllVariations format
	{{individual campaign}, {individual campaign}, {individual campaign}};
*/
const splitTestingAllVariations = {
	306753: campaign_306753
};

const getVariationValue = (campaignId, varId, page = 'promo') => {
	// check if all the required params are passed else return default config
	if (Object.keys(splitTestingAllVariations).includes(''+campaignId) &&
		Object.keys(splitTestingAllVariations[campaignId]).includes(''+varId) &&
		Object.keys(splitTestingAllVariations[campaignId][varId]).includes(''+page)) {
		return splitTestingAllVariations[campaignId][varId][page];
	}
	return defaultConfig[page];
};

export {
	getVariationValue
}
