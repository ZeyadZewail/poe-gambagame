import { Region } from "~/Types/Region";
import TradeItem from "~/Types/TradeItem";
import Trader, { TraderType } from "~/Types/Trader";

const accountKeywords = ["doctor", "lostchild", "korone", "戌神ころね", "浩志", "安成", "木村 拓哉", "ブラッド・ピット", "陽翔", "湊", "哲也", "dog", "cat", "femboy", "jester", "jojo", "kirito", "forsen", "xqc", "windows", "mac", "cheese", "pizza", "cup", "noodles", "sensei", "kohai", "dragon", "bird", "tiger", "tv", "kenja", "mahoko", "vtuber", "otonari", "hornyfemboy", "breadboat", "boatleague", "초희", "대현", "은애", "은희", "현영", "정희", "진화", "주미", "새롬", "승현", "ロクサーヌ", "セリー", "ベスタ", "ミリア", "ルティナ", "加賀 道夫", "桐ヶ谷 和人", "steelmage", "zizaran", "pathofmath", "fastaf", "jungroan", "ruetooCantafordcamera", "finance", "tech", "ninja", "coomer", "divle", "connor", "joey", "garnt", "hedidthething", "throw", "pagman", "fatLOLW", "midget", "milfhunter", "dogtamer", "treehunter", "cloud", "zack", "sephiroth", "สมศักดิ์", "สมชาย", "กิตติศักดิ์", "มะลิ", "แพรว", "เบญจกัลยาณี", "ลัดดาวรรณ", "เพ็ญศรี", "สุกัญญา", "ไชยเชษฐ์", "ภาณุมาศ", "Паша", "Денис", "Иван", "Анастасия", "Елизавета", "Наталья", "Ангелина", "Максим", "Константин", "Анатолий", "okayeg", "bigritard", "sirus", "zana", "einhar", "deadeyeenjoyer", "ranger", "duelist", "marauder", "templar", "witch", "shadow", "scion", "frostbladesenjoyer", "EePooPoo", "ascendant", "assassin", "berserker", "champion", "chieftain", "deadeye", "elementalist", "gladiator", "guardian", "hierophant", "inquisitor", "juggernaut", "necromancer", "occultist", "pathfinder", "raider", "saboteur", "slayer", "trickster", "voidwalker", "lukatim", "ayo", "handsup", "bily1337", "iamcoming", "cominghome", "lostintheechoes", "harvestenjoyer", "hardcoreenjoyer", "bussyhunter", "okayge", "donaldtrump", "joebiden", "obama", "whomegalul", "ilovecock", "frame", "bike", "canceled", "envy", "lust", "trust", "malding", "mold", "holdup", "medoctor", "smartestbaj", "clockwork", "moooods", "soysmug", "smugsoy", "iamdownbad", "lethimcook", "wholethimcook", "timapple", "lethimpee", "ineedtopee", "ohmygawd", "doublejump", "feelsgoodman", "feelsweirdman", "feelsstrongman", "sobshrimp", "nerd", "nerdge", "trapcard", "polishfemboy", "canhecook", "joemama", "gordon", "maxlevel", "youshouldmaxlevl", "lamda", "uwu", "drake", "ai", "fire", "ice", "wind", "earth", "remix", "mail", "bepsi", "coke", "burgir", "sam", "jacob", "owari", "no", "yes", "divine", "chaos", "wifi", "datapackage", "harrypottah", "trainejoyer", "famouslastwords", "morbit", "repub", "transparent", "cdv", "supamarket", "konbini", "realgamer", "xxgamerxx", "xxshadowxx", "xxemoxx", "emo", "xXKingOfArenaXx", "diesfromcringe", "everythingcringe", "youarecringe", "laughatthisuser", "justpixels", "daugherssmug", "baaaaaaat", "capeshitenjoyer", "capekarneval", "jotaro", "josuke", "appleadvice", "giorno", "dreaming", "cablelicker", "peropero", "japansoysmug", "monsterhuntie", "lethimkuk", "possesed", "insane", "samethreeblocks", "mrfors", "dothethrow"];
const characterKeywords = ["I", "Hecking", "Loooove", "Game", "Gobble", "On", "These", "Nuts", "Nutzzz", "To", "Be", "The", "And", "Lose", "Win", "Chris", "Kill", "Every", "Person", "Path", "Of", "Exile", "Sanctum", "Harvest", "Delirium", "Dolphin", "JoJo", "Cat", "Dog", "Walk", "Land", "Listener", "San", "Gohan", "Can", "You", "More", "Food", "Evolve", "Hai", "Dai", "Kentucky", "Abyss", "Harbinger", "Alva", "Einhar", "Zana", "Quin69", "Fat", "LOLW", "GodGamer", "God", "Gamer", "Nobi", "Skin", "Fire", "Burn", "Water", "Wet", "Dad", "Mom", "Father", "Mother", "MILF", "DILF", "GILF", "Booba", "DS", "Poop", "Holy", "Sanctury", "Bestiary", "Furry", "Enjoyer", "Flurry", "MC", "MCD", "MCDonald", "Scary", "Eat", "The", "Whaaaat", "Hooow", "Choices", "Face", "Coming", "On", "Your", "You", "Are", "An", "Ritard", "A", "You", "Gamble", "Now", "NOW", "GAMBLE", "HECKIN", "LOOOOOOVE", "Bruh", "Bruh", "Bruh", "Oppai", "Big", "Small", "Feet", "Hands", "I", "I", "I", "I", "I", "I", "I", "I", "Docking", "And", "And", "And", "And", "That", "That", "That", "That", "That", "Cope", "Cope", "Cope", "Cope", "Cope", "Delayed", "Ultimatum", "Can", "Can", "Can", "Can", "Dancing", "Master", "Student", "Jump", "Down", "YouShould", "YouShould", "YouShould", "YouShould", "YouShould", "YouShould", "YouShould", "YouShould", "MaxLevel", "NOW", "NOW", "NOW", "NOW", "NOW", "NOW", "NOW", "NOW", "WooooooW", "DN", "dn", "dn", "dn", "dn", "DN", "DN", "DN"];

export function generateTraders(): Trader[] {
    const traders: Trader[] = [
        { accountName: "witten_", characterName: "PoMsMcDonaldsManager", type: TraderType.Scammer, region: Region.English },
        { accountName: "PepegaIRL", characterName: "NonStopPepega", type: TraderType.Honest, region: Region.English },
        { accountName: "Ltfxx", characterName: "DivinationOrbital ", type: TraderType.Honest, region: Region.English },
        { accountName: "Syperek", characterName: "我在這裡撫摸我的雞巴我現在在我的雞巴上塗了乳液", type: TraderType.Scammer, region: Region.English },
        { accountName: "kedam7", characterName: "GeneratingGodSeed", type: TraderType.OilPrince, region: Region.English },
        { accountName: "Prise11", characterName: "BigChungus", type: TraderType.OilPrince, region: Region.English },
        { accountName: "Lev", characterName: "TriAxis", type: TraderType.PriceFixer, region: Region.Русский },

    ]
    for (let i = 0; traders.length < 150; i++) {
        let newTrader = generateRandomTrader();
        const nameExists = traders.some(trader =>
            trader.accountName === newTrader.accountName || trader.characterName === newTrader.characterName
        );
        if (!nameExists) {
            traders.push(newTrader);
        }
    }
    return traders;
}

export default function generateTradeListings(item: string, traders: Trader[]): TradeItem[] {
    const randomTraders = traders.sort(() => 0.5 - Math.random()).slice(0, 30);
    let itemPrice = 0;
    try {
        itemPrice = priceList[item];
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    const tradeListings: TradeItem[] = []
    randomTraders.forEach(trader => {
        let defaultTradeItem: TradeItem;
        if (item == "Vivid Crystallised Lifeforce")
            defaultTradeItem = generateTradeItemLifeForce(item, trader)
        else
            defaultTradeItem = generateTradeItem(item, itemPrice, trader)
        tradeListings.push(defaultTradeItem);
    })
    tradeListings.sort((a, b) => (a.price / a.stock) - (b.price / b.stock));
    return tradeListings;
}

function generateTradeItemLifeForce(item: string, trader: Trader): TradeItem {
    let defaultTradeItem: TradeItem = {
        itemName: item,
        price: generateLifeForcePrice(trader.type),
        stock: generateLifeForceStock(trader.type),
        trader: trader,
        afk: false,
        lifeForce: true
    }
    defaultTradeItem.stock = parseFloat((defaultTradeItem.price * defaultTradeItem.stock).toFixed(1));
    if (trader.type == TraderType.PriceFixer) {
        defaultTradeItem.afk = true;
    }
    return defaultTradeItem;
}

function generateTradeItem(item: string, itemPrice: number, trader: Trader): TradeItem {
    let defaultTradeItem: TradeItem = {
        itemName: item,
        price: generateItemPrice(itemPrice, trader.type),
        stock: generateItemStock(trader.type),
        trader: trader,
        afk: false,
        lifeForce: false
    }
    defaultTradeItem.price = parseFloat((defaultTradeItem.price * defaultTradeItem.stock).toFixed(1));
    if (trader.type == TraderType.PriceFixer) {
        defaultTradeItem.afk = true;
    }
    return defaultTradeItem;
}

const priceList: { [key: string]: number } = {
    "House of Mirrors": 72,
    "The Apothecary": 41.5,
    "The Price of Devotion": 35,
    "Unrequited Love": 32,
    "The Insane Cat": 16.2,
    "The Doctor": 8.5,
    "The Demon": 7.2,
    "The Immortal": 6.9,
    "The Fiend": 5,
    "Love Through Ice": 3,
    "The Shieldbearer": 3,
    "Choking Guilt": 3.4,
    "Seven Years Bad Luck": 2.1,
    "The Soul": 1.7,
    "The Cheater": 1.4,
    "The Nurse": 1,
    "The Sephirot": 0.8,
    "Divine Beauty": 0.5,
    "Succor of the Sinless": 0.3,
    "The Patient": 0.1
}

function generateLifeForcePrice(type: TraderType): number {

    let price: number;
    const randomNum = Math.random();
    if (randomNum < 0.6) {
        price = 1;
    } else if (randomNum < 0.75) {
        price = 2
    } else if (randomNum < 0.8) {
        price = 3;
    } else if (randomNum < 0.85) {
        price = 4;
    } else {
        price = 5;
    }
    if (type == TraderType.OilPrince)
        price = 10;
    if (type == TraderType.Scammer)
        price = 1;
    if (type == TraderType.PriceFixer)
        price = 1;

    return price;

}
function generateLifeForceStock(type: TraderType): number {
    let stock: number;
    const randomNum = Math.random();
    if (randomNum < 0.3) {
        stock = 6000;
    } else if (randomNum < 0.45) {
        stock = 5900;
    }
    else if (randomNum < 0.55) {
        stock = 5800;
    } else if (randomNum < 0.65) {
        stock = 5700;
    } else if (randomNum < 0.75) {
        stock = 5600;
    } else {
        stock = 5500;
    }
    if (type == TraderType.PriceFixer)
        stock = 6500;
    if (type == TraderType.OilPrince || type == TraderType.Scammer)
        stock = 6000;
    return stock;
}


function generateItemPrice(defaultPrice: number, type: TraderType): number {
    let price: number = defaultPrice;
    const randomNum = Math.random();
    if (defaultPrice > 3) {
        if (randomNum < 0.2) {
            price = defaultPrice;
        } else if (randomNum < 0.3) {
            price = defaultPrice + 0.1;
        } else if (randomNum < 0.45) {
            price = defaultPrice + 0.2;
        } else if (randomNum < 0.5) {
            price = defaultPrice + 0.3;
        } else if (randomNum < 0.6) {
            price = defaultPrice + 0.4;
        } else if (randomNum < 0.7) {
            price = defaultPrice + 0.5;
        } else if (randomNum < 0.8) {
            price = defaultPrice + 0.6;
        } else {
            price = defaultPrice + 1;
        }
        if (type == TraderType.Scammer)
            price = defaultPrice;
        if (type == TraderType.PriceFixer || type == TraderType.OilPrince)
            price = defaultPrice - 0.5;
    } else {
        if (randomNum < 0.7) {
            price = defaultPrice;
        } else if (randomNum < 0.8) {
            price = defaultPrice + 0.1;
        } else {
            price = defaultPrice + 0.2;
        }
    }
    return price;

}

function generateItemStock(type: TraderType): number {
    let stock: number;
    const randomNum = Math.random();
    if (randomNum < 0.7) {
        stock = 1;
    } else if (randomNum < 0.85) {
        stock = 2;
    } else {
        stock = 3;
    }
    if (type == TraderType.PriceFixer || type == TraderType.Scammer)
        stock = 1;
    if (type == TraderType.OilPrince)
        stock = Math.floor(Math.random() * 8) + 10;
    return stock;
}



const ratios: { [key: string]: number } = {
    [TraderType.Honest]: 0.83,
    [TraderType.Scammer]: 0.05,
    [TraderType.PriceFixer]: 0.1,
    [TraderType.OilPrince]: 0.02
};

// Function to generate a random Trader type
function generateTraderType(): TraderType {
    const r = Math.random();
    let cumulativeProb = 0;
    for (const type in ratios) {
        cumulativeProb += ratios[type];
        if (r < cumulativeProb) {
            return String(type) as TraderType;
        }
    }
    return TraderType.Honest;
}

function getRandomKeyword(keywords: string[], amount: number): string {
    var randomWord = "";
    for (let i = 0; i < amount; i++) {
        let randomIndex = Math.floor(Math.random() * keywords.length);
        randomWord += keywords[randomIndex];
    }
    return randomWord;
}


// Function to generate a random Trader object
function generateRandomTrader(): Trader {
    const accountName = `${getRandomKeyword(accountKeywords, 1)}`;
    const characterName = `${getRandomKeyword(characterKeywords, 4)}`;
    const containsJapaneseCharacter = /[^\u0000-\u007F]+/.test(accountName);
    const containsKoreanCharacter = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]+/.test(accountName);
    const containsRussianCharacter = /[\u0400-\u04FF]/.test(accountName);
    const containsThaiCharacter = /[\u0E00-\u0E7F]/.test(accountName);

    let region: Region;
    const randomNum = Math.random();
    if (randomNum < 0.6) {
        region = Region.English;
    } else if (randomNum < 0.75) {
        region = Region.Deutsch;
    } else if (randomNum < 0.85) {
        region = Region.Español;
    } else if (randomNum < 0.95) {
        region = Region.Português;
    } else {
        region = Region.Français;
    }

    if (containsJapaneseCharacter)
        region = Region.日本語;
    if (containsKoreanCharacter)
        region = Region.한국어;
    if (containsRussianCharacter)
        region = Region.Русский;
    if (containsThaiCharacter)
        region = Region.ไทย
    return {
        accountName,
        characterName,
        type: generateTraderType(),
        region: region
    };
}
