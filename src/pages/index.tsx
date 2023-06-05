import Head from "next/head";
import styles from "./Home.module.css";
import { PokemonList } from "@/components/PokemonList/PokemonList";
import React from 'react'

const Home = () => {
  return (
    <>
      <Head>
        <title>ポケモン一覧</title>
        <meta name="description" content="ポケモンの一覧ページです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <PokemonList />
      </main>
    </>  )
}

export default Home