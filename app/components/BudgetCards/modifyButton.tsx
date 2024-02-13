import * as Dialog from "@radix-ui/react-dialog";
import { Pencil2Icon, UpdateIcon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/Button/button";
import dialogStyle from "~/components/Dialog/dialogStyle.module.css";


export function ModifyCategoryDialog(props: {
  type: "expense" | "generalSaving" | "savingsGoal",
  placeholders: {
    name: string,
    amount: number,
    savingsGoalAmount?: number
  }
}) {
  const buttonStyle: React.CSSProperties = { width: "4rem", height: "2rem" }
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button style={{ padding: "0rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "transaparent" }}><Pencil2Icon width={"1.5rem"} height={"1.5rem"} /></Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={dialogStyle.createDialogOverlay} />
      <Dialog.Content className={dialogStyle.createDialogContent}>
        <Dialog.Title>Modify {props.placeholders.name}</Dialog.Title>
        <Dialog.Description className="backgroundText">
          Modify the category to get started.
        </Dialog.Description>
        <fetcher.Form method="post">
          <div className={dialogStyle.createDialogForm}>
            <div className={dialogStyle.createDialogFormRow}>
              <label htmlFor="name">Name</label>
              <input required id="name" name="name" type="text" value={props.placeholders.name} />
            </div>
            <div className={dialogStyle.createDialogFormRow}>
              <label htmlFor="amount">Monthly Budgeted Amount</label>
              <input required id="amount" name="amount" type="number" step={2} value={props.placeholders.amount.toString()} />
            </div>
            {
              props.type === "savingsGoal" &&
              <div className={dialogStyle.createDialogFormRow}>
                <label htmlFor="savingsGoalAmount">Target</label>
                <input required id="savingsGoalAmount" name="savingsGoalAmount" type="number" step={2} value={props.placeholders.savingsGoalAmount?.toString()} />
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