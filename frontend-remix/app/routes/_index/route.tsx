import type { MetaFunction } from "@remix-run/node";
import styles from "./styles.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <div className={styles.welcomeMessage}>
        <h1>Welcome</h1>
        <h1>back!</h1>
      </div>
    </div>
  );
}
