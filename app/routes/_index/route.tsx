import type { MetaFunction } from "@remix-run/node";
import { features } from "./features";
import { Card } from "~/components/Card/card";
import * as Accordion from '@radix-ui/react-accordion';

import styles from "./styles.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Explanation() {
  return <div className={styles.contentArea}>
    <h1>What is FIRE?</h1>
    <p style={{ padding: "1rem", fontStyle: "italic" }}>'Financial Independence, Retire Early (FIRE) is a movement of people devoted to a program of extreme savings and investment that aims to allow them to retire far earlier than traditional budgets and retirement plans would permit.'</p>
    <p style={{ textAlign: "end" }}><a href="https://www.investopedia.com/terms/f/financial-independence-retire-early-fire.asp">Investopedia</a></p>
    <br />
    <h1>What do we do?</h1>
    <p style={{ padding: "1rem" }}>
      This is a solution designed to help you achieve your financial goals. Although a recognised element of FIRE is achieving extreme savings, we enable you to do that or find a style that works best for you. Our main goal is ensuring you have the capabilities needed to better understand your finances and current posistion.
    </p>
  </div>
}

function FeaturesCards() {
  const featureCards = features.map((feature) => {
    const header = <img src={feature.svg} alt="" width={200} />
    const description = <div>
      <h2>{feature.title}</h2>
      <br />
      <p className={styles.featuresDescription}>{feature.description}</p>
    </div>
    return <Card
      key={feature.title}
      title={header}
      body={description}
      footer={<></>}
    />
  })
  return <div className={styles.features}>
    {featureCards}
  </div>
}

function Features() {
  return <div className={styles.contentArea}>
    <h1>What we offer</h1>
    <p style={{ padding: "1rem" }}>Our Feature set is ever expanding but our 3 main features are...</p>
    <FeaturesCards />
  </div>
}

export default function Index() {
  return <div className={styles.contentGrid}>
    <Explanation />
    <Features />
  </div>;
}
