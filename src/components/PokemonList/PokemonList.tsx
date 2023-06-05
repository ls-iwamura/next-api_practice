import React from "react";
import styles from "./PokemonList.module.css";
import useFetch from "../../hooks/useFetch";
import { PokemonItem } from "../PokemonItem/PokemonItem";
import { PokemonListType } from "@/types/pokemon";

type Props = {};

export const PokemonList: React.FC<Props> = () => {
  const {
    data: pokemons,
    isLoading,
    error,
  } = useFetch<PokemonListType>("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: 151,
      offset: 0,
    },
  });

  if (error) {
    return <div className={styles.error_message}>{error.response?.status}</div>;
  }

  if (isLoading) {
    return <div className={styles.loading_message}>...Loading</div>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {pokemons?.results.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonItem pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </div>
  );
};
