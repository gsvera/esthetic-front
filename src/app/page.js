'use client'
import { useSelector, useDispatch } from "react-redux";
import { setToken } from '@/store-redux/slide/userSlide'
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const userSlice = useSelector(store => store.userSlice);
  const dispatch = useDispatch();
  console.log("🚀 ~ Home ~ userSlice:", userSlice)

  function renderNotification() {
    dispatch(setToken("sssss"))
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <h1 onClick={renderNotification}>Esthetic este sera el home</h1>
      <Link href={{pathname: `/es/registro/guillermo-vera`, query: {id: 1}}}>link</Link>
      </div>
    </main>
  );
}
