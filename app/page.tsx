import Hero from "@/components/Hero/Hero";
import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <Hero />
    </main>
  );
}
