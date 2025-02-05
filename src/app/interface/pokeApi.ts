export interface PokemonDetailedInfo {
    id: number;
    name: string;
    sprites: {front_default: string};
    weight: number;        
    stats: StatInfo[];            
    abilities: Ability[];         
    types: Type[];     

}
export interface PokemonBasicInfo {
    url: string;
    name: string;
}

export interface Stat {
    name: string; 
  }
  
  export interface StatInfo {
    stat: Stat;        
    base_stat: number; 
  }
  
  export interface Ability {
    ability: {
      name: string;   
    };
  }
  
  export interface Type {
    slot: number;   
    type: {
      name: string; 
    };
  }
  