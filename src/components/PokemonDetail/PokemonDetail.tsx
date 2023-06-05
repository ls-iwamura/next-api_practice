import { PokemonDetailType } from "@/types/pokemon";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./PokemonDetail.module.css";
import Image from "next/image";

type Props = {
  pokemonName: string;
};

export const PokemonDetail: React.FC<Props> = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState<PokemonDetailType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
          {
            signal: controller.signal,
          }
        );
        setPokemon(res.data);
        setError(undefined);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
    return () => controller.abort();
  }, [pokemonName]);

  if (error) {
    return <div className={styles.error_message}>{error.message}</div>;
  }

  if (isLoading || pokemon == null) {
    return <div className={styles.loading_message}>...Loading</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.description}>
        <p>Name: {pokemon.name}</p>
        <p>
          Type:{" "}
          {pokemon.types.map(
            (type, index) =>
              `${type.type.name}${
                index === pokemon.types.length - 1 ? "" : " / "
              }`
          )}
        </p>
      </div>
    </div>
  );
};
