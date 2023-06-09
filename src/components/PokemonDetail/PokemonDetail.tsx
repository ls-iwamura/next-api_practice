import React from "react";
import Image from "next/image";
import styles from "./PokemonDetail.module.css";
import useFetch from "@/hooks/useFetch";
import { PokemonDetailType } from "@/types/pokemon";
import { useRouter } from "next/router";

type Props = {};

export const PokemonDetail: React.FC<Props> = () => {
  const router = useRouter();
  const { pokemonName } = router.query;
  const {
    data: pokemon,
    isLoading,
    error,
  } = useFetch<PokemonDetailType>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  if (error) {
    return <div className={styles.error_message}>{error.response?.status}</div>;
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
