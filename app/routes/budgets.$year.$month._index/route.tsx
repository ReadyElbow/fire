import { ExpenseBudget } from "~/components/BudgetCards/expenseBudget";
import layoutStyle from "./layout.module.css";
import { GeneralSavingsCard } from "~/components/BudgetCards/generalSavings";
import { SavingsGoal } from "~/components/BudgetCards/savingGoal";
import { AddCategoryDialog } from "./addCategory";
import { LoaderFunctionArgs } from "@remix-run/node";


function ExpensesBudget() {

  return <div className={layoutStyle.budgetItemContainer}>
    <ExpenseBudget title={"Food"} amount={30} budget={50} />
    <ExpenseBudget title={"Food"} amount={30} budget={50} />
    <ExpenseBudget title={"Food"} amount={30} budget={50} />
    <ExpenseBudget title={"Food"} amount={30} budget={50} />
    <ExpenseBudget title={"Food"} amount={30} budget={50} />
  </div>
}

export default function Budgeting() {
  return <div className={layoutStyle.structure}>
    {/* <div className={layoutStyle.expensesContainer}>
      <div className={layoutStyle.expensesTitle}>
        <div>
          <h4>Expenses</h4>
          <p style={{ color: "var(--color-subtext)" }}>Monthly expenses</p>
        </div>
        <AddCategoryDialog expense />
      </div>
      <br />
      <ExpensesBudget />
    </div>
    <div className={layoutStyle.savingsGenerealContainer}>
      <div className={layoutStyle.expensesTitle}>
        <div>
          <h4>General Savings</h4>
          <p style={{ color: "var(--color-subtext)" }}>Savings for the long term</p>
        </div>
        <AddCategoryDialog generalSaving />
      </div>
      <br />
      <div className={layoutStyle.budgetItemContainer}>
        <GeneralSavingsCard title={"Holiday"} monthlyContributions={20} total={100} />
        <GeneralSavingsCard title={"Holiday"} monthlyContributions={20} total={100} />
        <GeneralSavingsCard title={"Holiday"} monthlyContributions={20} total={100} />
        <GeneralSavingsCard title={"Holiday"} monthlyContributions={20} total={100} />
      </div>
    </div>
    <div className={layoutStyle.savingGoalsContainer}>
      <div className={layoutStyle.expensesTitle}>
        <div>
          <h4>Saving Goals</h4>
          <p style={{ color: "var(--color-subtext)" }}>Saving up for that special something?</p>
        </div>
        <AddCategoryDialog savingsGoal />
      </div>
      <br />
      <div className={layoutStyle.budgetItemContainer}>
        <SavingsGoal title={"Holiday"} monthlyContributions={20} currentAmount={1000} goal={10000} />
        <SavingsGoal title={"Holiday"} monthlyContributions={20} currentAmount={1000} goal={10000} />
        <SavingsGoal title={"Holiday"} monthlyContributions={20} currentAmount={1000} goal={10000} />
        <SavingsGoal title={"Holiday"} monthlyContributions={20} currentAmount={5000} goal={10000} />
      </div>
    </div> */}
  </div>
}