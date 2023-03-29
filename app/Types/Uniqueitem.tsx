export default interface Uniqueitem {
    displayName: string,
    itemName: string,
    baseName: string,
    itemFlavourText: string,
    itemFlask?: {
        lastsSeconds: number,
        consumesCharges: number,
        maxCharges: number,
        baseEffect: string
    },
    itemArmour?: {
        quality?:number;
        armour?: number;
        evasion?: number;
        energyshield?: number;
        chanceToBlock?: number;
    }
    itemJewel?:{
        limit:number;
        radius:string;
    }
    itemWeapon?:{
        base?:string,
        physDmgMin?:number,
        physDmgMax?:number,
        crit?:number,
        aps?:number,
        weaponrange?:number
    }
    itemRequirement: number,
    itemImplicit: string[],
    itemExplicit: string[],
    tooltipWidth: number,
    itemPrice: number
    corrupted?:boolean;
}