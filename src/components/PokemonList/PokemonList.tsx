import React, { useEffect, useState } from "react";
import { PokemonItem } from "../PokemonItem/PokemonItem";
import axios from "axios";
import styles from "./PokemonList.module.css";
import { PokemonListType } from "@/types/pokemon";

type Props = {};

export const PokemonList: React.FC<Props> = () => {
  const [pokemons, setPokemons] = useState<PokemonListType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
          {
            signal: controller.signal,
          }
        );
        setPokemons(res.data);
        setError(undefined);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
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
