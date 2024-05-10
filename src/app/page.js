'use client'
import styles from "./page.module.css";
import Link from "next/link";
import MenuWeb from "@/components/MenuWeb";

export default function Home() {

  return (
    <>
      <MenuWeb />
      <main className={styles.main}>
        <div className={styles.description}>
        <h1>Esthetic este sera el home</h1>
        <Link href={{pathname: `/es/registro/guillermo-vera`, query: {id: 1}}}>link</Link>
        </div>
      </main>
    </>
  );
}
