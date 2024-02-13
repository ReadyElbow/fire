import { Cross1Icon, Pencil2Icon, CheckIcon } from "@radix-ui/react-icons";
import style from "./style.module.css"
import { Card } from "../Card/card";
import { ModifyCategoryDialog } from "./modifyButton";
import { DeleteCategory } from "~/components/BudgetCards/deleteCategory";


export function GeneralSavingsCard(props: { title: string, monthlyContributions: number, total: number }) {
  const cardTitle = <div className={style.cardTitle}>
    <h4>{props.title}</h4>
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <ModifyCategoryDialog type="generalSaving" placeholders={{ name: props.title, amount: props.monthlyContributions }} />
      <DeleteCategory type="expense" name={props.title} budgetDate={new Date("12-01-2024")} />
    </div>
  </div>
  const cardBody = <>
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <p>Contributions</p>
      <p style={{ color: "var(--color-primary)", textAlign: "end" }}>£{props.monthlyContributions}</p>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
      <p>Total</p>
      <p style={{ color: "var(--color-primary)", textAlign: "end" }}>£{props.total}</p>
    </div>
  </>

  return (
    <Card
      title={cardTitle}
      body={cardBody}
      overwriteStyle={{ gap: "0.5rem" }}
    />
  );
}
