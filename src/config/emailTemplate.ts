export interface StockDetails {
    url: string;
    itemName: string;
    time: string;
}

const getTemplate = (details: StockDetails): string => {
    return  `
    Hello,
    
    Hurry! The following item was yoinked: ${details.itemName}. There is stock avaliable at the following bestbuy link ${details.url}.
    Bot TIMESTAMP: ${details.time}

    Thanks,
    
    Bestbuy Canada Scalper Bot
    `
   
};

export default getTemplate;
