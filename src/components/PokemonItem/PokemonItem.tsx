import { PokemonItemType } from "@/types/pokemon";
import Link from "next/link";
import React from "react";
import styles from "./PokemonItem.module.css"

type Props = {
  pokemon: PokemonItemType;
};

export const PokemonItem: React.FC<Props> = ({ pokemon }) => {
  return (
    <Link href={``} className={styles.card}>
      <p className={styles.text}>{pokemon.name}</p>
    </Link>
  );
};
