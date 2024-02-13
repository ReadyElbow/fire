import { Card } from "../Card/card";
import style from "./style.module.css"
import completedStyle from "./completed.module.css"
import { CheckIcon } from "@radix-ui/react-icons";
import * as Progress from '@radix-ui/react-progress';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ModifyCategoryDialog } from "./modifyButton";
import { DeleteCategory } from "~/components/BudgetCards/deleteCategory";
// Need to define a set of functions here

export function SavingsGoal(props: { title: string, monthlyContributions: number, currentAmount: number, goal: number }) {
  const cardTitle = <div className={style.cardTitle} >
    <p>{props.title}</p>
    <div style={{ display: "flex", gap: "0.5rem", alignContent: "center" }}>
      <Checkbox.Root className={completedStyle.checkboxRoot}>
        <Checkbox.Indicator>
          <CheckIcon width={"1.5rem"} height={"1.5rem"} className={completedStyle.checkboxIndicator} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <ModifyCategoryDialog type="savingsGoal" placeholders={{ name: props.title, amount: props.monthlyContributions, savingsGoalAmount: props.goal }} />
      <DeleteCategory type="expense" name={props.title} budgetDate={new Date("12-01-2024")} />
    </div>
  </div>;

  const cardBody = <>
    <p>Monthly Contributions: {props.monthlyContributions}</p>
    <div className={style.cardBody}>
      <Progress.Root className={style.progressRoot} value={props.currentAmount}>
        <Progress.Indicator
          className={style.progressIndicator}
          style={{ transform: `translateX(-${100 - (Math.max((props.currentAmount / props.goal) * 100, 0))}%)` }}
        />
      </Progress.Root>
      <p>
        £{props.goal - props.currentAmount} left of £{props.goal} spent
      </p>
    </div>
  </>

  return (
    <Card
      title={cardTitle}
      body={cardBody}
      overwriteStyle={{ padding: "0.5rem", gap: "0.25rem", width: "100%" }}
    />
  );
}