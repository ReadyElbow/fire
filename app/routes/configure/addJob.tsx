import { useFetcher } from "@remix-run/react";
import * as Dialog from "@radix-ui/react-dialog";
import { SubNavigationButton } from "~/components/SubNavigation/subnav";
import style from "./addJobDialog.module.css"
import { Button } from "~/components/Button/button";
import { UpdateIcon } from "@radix-ui/react-icons";

type TErrorMapping = {
  [key: string]: string
}

export function AddJobDialog() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const errors = (fetcher.data as { error?: TErrorMapping })?.error;


  const buttonStyle: React.CSSProperties = { width: "4rem", height: "2rem" }
  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <SubNavigationButton>Add Job</SubNavigationButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={style.createDialogOverlay} />
      <Dialog.Content className={style.createDialogContent}>
        <Dialog.Title>Create Account</Dialog.Title>
        <Dialog.Description className="backgroundText">
          Setup your job
        </Dialog.Description>
        <fetcher.Form method="post">
          <div className={style.createDialogForm}>
            {
              errors?.general &&
              <div className={style.createDialogFormRow}>
                <p>{errors.general}</p>
              </div>
            }
            <div className={style.createDialogFormRow}>
              <label htmlFor="jobTitle">Job Title</label>
              <input className={style.createDialogFormRowContainer} required id="jobTitle" name="jobTitle" type="text" />
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="employer">Employer</label>
              <input className={style.createDialogFormRowContainer} required id="employer" name="employer" type="text" />
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="startDate">Start Date</label>
              <input className={style.createDialogFormRowContainer} type="date" />
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="salary">Salary</label>
              <div style={{display: "flex", gap: "0.25rem"}} className={style.createDialogFormRowContainer}>
                <p>£</p>
                <input required id="salary" name="salary" type="number" step="0.01"/>
              </div>
            </div>
          </div>
          <div className={style.createDialogActions}>
            <Dialog.Close asChild>
              <Button style={buttonStyle} variant="secondary">Cancel</Button>
            </Dialog.Close>
            {
              isSubmitting
                ?
                <Button style={buttonStyle} disabled><UpdateIcon className={style.spinningIcon}></UpdateIcon></Button>
                :
                <Button style={buttonStyle} >Create</Button>
            }
          </div>
        </fetcher.Form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
