import * as Dialog from "@radix-ui/react-dialog";
import { useFetcher, useSubmit } from "@remix-run/react";
import style from "./styles.module.css";
import { Button } from "~/components/Button/button";
import { accountTypes } from "~/utils/account_types";
import { accountProviders } from "~/utils/providers";
import { UpdateIcon } from "@radix-ui/react-icons";
import { SubNavigationButton } from "~/components/SubNavigation/subnav";

type TErrorMapping = {
  [key: string]: string
}

export function AccountDialog() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const errors = (fetcher.data as { error?: TErrorMapping })?.error;
  const status = fetcher.data as { status?: number };

  const buttonStyle: React.CSSProperties = { width: "4rem", height: "2rem" }
  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <SubNavigationButton>Add Account</SubNavigationButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={style.createDialogOverlay} />
      <Dialog.Content className={style.createDialogContent}>
        <Dialog.Title>Create Account</Dialog.Title>
        <Dialog.Description className="backgroundText">
          Create a new account to get started.
          {
            errors?.general &&
            <p className="errorText">{errors.general}</p>
          }
        </Dialog.Description>
        <fetcher.Form method="post">
          <div className={style.createDialogForm}>
            <div className={style.createDialogFormRow}>
              <label htmlFor="provider">Provider</label>
              {
                errors?.provider &&
                <p className="errorText">{errors.provider}</p>
              }
              <select required name="provider" id="provider">
                {Object.keys(accountProviders).map((provider) => {
                  return <option value={provider}>{provider}</option>;
                })}
              </select>
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="bankAccountNumber">Account Number</label>
              {
                errors?.bankAccountNumber &&
                <p className="errorText">{errors.bankAccountNumber}</p>
              }
              <input
                required
                id="bankAccountNumber"
                name="bankAccountNumber"
                type="text"
              />
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="bankAccountSortCode">Sort Code</label>
              {
                errors?.bankAccountSortCode &&
                <p className="errorText">{errors.bankAccountSortCode}</p>
              }
              <input
                required
                id="bankAccountSortCode"
                name="bankAccountSortCode"
                type="text"
              />
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="bankAccountType">Account Type</label>
              {
                errors?.bankAccountType &&
                <p className="errorText">{errors.bankAccountType}</p>
              }
              <select required name="bankAccountType" id="bankAccountType">
                {accountTypes.map((accountType) => {
                  return <option value={accountType}>{accountType}</option>;
                })}
              </select>
            </div>
            <div className={style.createDialogFormRow}>
              <label htmlFor="interestRate">Interest Rate</label>
              {
                errors?.interestRate &&
                <p className="errorText">{errors.interestRate}</p>
              }
              <input required id="interestRate" name="interestRate" type="number" step="0.01" />
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
