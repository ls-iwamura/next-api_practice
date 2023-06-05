export type PokemonItemType = {
  name: string; // ポケモンの英語名
};

export type PokemonListType = {
  results: PokemonItemType[]; // 上のPokemonItemTypeが配列になってこのresultsに入る
};

export type PokemonDetailType = {
  name: string;
  sprites: {
    front_default: string; // ポケモンの正面の画像URL
    front_shiny: string; // ポケモン正面（色違い）の画像URL
  };
  types: {
    type: {
      name: string; // ポケモンのタイプ名
    };
  }[]; // ポケモンのタイプ配列
};
