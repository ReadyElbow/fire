import { DeleteCategory } from "~/components/BudgetCards/deleteCategory";
import { Card } from "../Card/card";
import { ModifyCategoryDialog } from "./modifyButton";
import style from "./style.module.css"
import { Cross1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import * as Progress from '@radix-ui/react-progress';

// Need to define a set of functions here

export function ExpenseBudget(props: { title: string, amount: number, budget: number }) {
  const cardTitle = <div className={style.cardTitle} >
    <p>{props.title}</p>
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <ModifyCategoryDialog type="expense" placeholders={{ name: props.title, amount: props.budget }} />
      <DeleteCategory type="expense" name={props.title} budgetDate={new Date("12-01-2024")} />
    </div>
  </div>;

  const cardBody = <div className={style.cardBody}>
    <Progress.Root className={style.progressRoot} value={props.amount}>
      <Progress.Indicator
        className={style.progressIndicator}
        style={{ transform: `translateX(${Math.max((props.amount / props.budget) * 100, 0)}%)` }}
      />
    </Progress.Root>
    <p>
      £{props.amount} left of £{props.budget} spent
    </p>
  </div>

  return (
    <Card
      title={cardTitle}
      body={cardBody}
      overwriteStyle={{ padding: "0.5rem", gap: "0.25rem", width: "100%" }}
    />
  );
}