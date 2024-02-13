
import { prisma } from "~/utils/prisma.server";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/Button/button";
import dialogStyle from "~/components/Dialog/dialogStyle.module.css";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";

export function DeleteCategory(props: { type: "expense" | "generalSaving" | "savingsGoal", name: string, budgetDate: Date }) {
  const fetcher = useFetcher();
  // I need to fetch the current state of the fetcher? rendering two forms essentially
  // On submit the form will need to send out a request to delete the category
  // If the action detects exisiting mapped transactions it will return an error
  // If the action detects no mapped transactions it will delete the category
  // On the clientside, it will need to potentially present a follow on form to reassign the transactions to a new category
  // I am using remix



  const isSubmitting = fetcher.state === "submitting";
  const data = fetcher.data
  let body;
  // if (data.asdas === ") {
  // }
  const buttonStyle: React.CSSProperties = { width: "4rem", height: "2rem" }

  return <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Button style={{ padding: "0rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "transaparent" }}><Cross1Icon width={"1.5rem"} height={"1.5rem"} /></Button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className={dialogStyle.createDialogOverlay} />
      <AlertDialog.Content className={dialogStyle.createDialogContent}>
        <AlertDialog.Title>Delete {props.name}</AlertDialog.Title>
        <AlertDialog.Description className="backgroundText">
          Are you sure you want to delete this category?
        </AlertDialog.Description>
        <br />
        <fetcher.Form method="delete">
          <div className={dialogStyle.createDialogActions}>
            <AlertDialog.Cancel asChild>
              <Button style={buttonStyle} variant="secondary">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              {
                isSubmitting ?
                  <Button style={buttonStyle} variant="primary"><UpdateIcon className={dialogStyle.spinningIcon} /></Button> :
                  <Button style={buttonStyle} variant="primary">Create</Button>
              }
            </AlertDialog.Action>
          </div>
        </fetcher.Form>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
}