import React from "react";
import Link from "next/link";
import styles from "./PokemonItem.module.css";
import { PokemonItemType } from "@/types/pokemon";

type Props = {
  pokemon: PokemonItemType;
};

export const PokemonItem: React.FC<Props> = ({ pokemon }) => {
  return (
    <Link href={`/${pokemon.name}`} className={styles.card}>
      <p className={styles.text}>{pokemon.name}</p>
    </Link>
  );
};
