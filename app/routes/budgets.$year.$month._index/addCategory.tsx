
import * as Dialog from "@radix-ui/react-dialog";
import { SubNavigationButton } from "~/components/SubNavigation/subnav";
import dialogStyle from "~/components/Dialog/dialogStyle.module.css";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/Button/button";
import { PlusCircledIcon, UpdateIcon } from "@radix-ui/react-icons";

export function AddCategoryDialog(props: { expense?: boolean, generalSaving?: boolean, savingsGoal?: boolean }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const buttonStyle: React.CSSProperties = { width: "4rem", height: "2rem" }
  let title;
  if (props.expense) {
    title = "Add an Expense";
  } else if (props.generalSaving) {
    title = "Add Savings";
  } else if (props.savingsGoal) {
    title = "Add a Savings Goal";
  } else {
    title = "Create Category";
  }

  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button style={{ width: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}><PlusCircledIcon width="25" height="25" /></Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={dialogStyle.createDialogOverlay} />
      <Dialog.Content className={dialogStyle.createDialogContent}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description className="backgroundText">
          Create a new category to get started.
        </Dialog.Description>
        <fetcher.Form method="post">
          <div className={dialogStyle.createDialogForm}>
            <div className={dialogStyle.createDialogFormRow}>
              <label htmlFor="name">Name</label>
              <input required id="name" name="name" type="text" />
            </div>
            <div className={dialogStyle.createDialogFormRow}>
              <label htmlFor="amount">Monthly Budgeted Amount</label>
              <input required id="amount" name="amount" type="number" step={2} />
            </div>
            {
              props.savingsGoal &&
              <div className={dialogStyle.createDialogFormRow}>
                <label htmlFor="savingsGoalAmount">Target</label>
                <input required id="savingsGoalAmount" name="savingsGoalAmount" type="number" step={2} />
              </div>
            }
          </div>
        </fetcher.Form>
        <div className={dialogStyle.createDialogActions}>
          <Dialog.Close asChild>
            <Button style={buttonStyle} variant="secondary">Cancel</Button>
          </Dialog.Close>
          <Dialog.Trigger asChild>
            {
              isSubmitting ?
                <Button style={buttonStyle} variant="primary"><UpdateIcon className={dialogStyle.spinningIcon} /></Button> :
                <Button style={buttonStyle} variant="primary">Create</Button>
            }
          </Dialog.Trigger>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
