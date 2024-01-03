import { BankTransactions, Prisma } from "@prisma/client";
import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { expenseAccountTypes } from "~/utils/account_types";
import { prisma } from "~/utils/prisma.server";
import style from "./tableStyle.module.css"

type TBankTransactionsCategorised = Prisma.PromiseReturnType<typeof fetchBanTransactionsCategorised>


function fetchBanTransactionsCategorised(accountID: number) {
  return prisma.bankTransactions.findMany({
    where: {
      accountID: accountID
    },
    include: {
      transactionCategory: true
    }
  })
}


export async function loader(request: LoaderFunctionArgs) {
  const transactions = await fetchBanTransactionsCategorised(Number(request.params.id));
  const accountType = await prisma.accounts.findFirst({
    where: {
      id: Number(request.params.id)
    },
    select: {
      bankAccountType: true
    }
  })
  const data = {
    transactions: transactions,
    accountType: accountType?.bankAccountType
  };
  return json(data);
}

function TransactionsTable(props: { transactions: SerializeFrom<TBankTransactionsCategorised>, accountType: string }) {
  const expensesAccount = expenseAccountTypes.includes(props.accountType)
  
  let fakeID = 0;
  const transactions = props.transactions
  const renderedTransactions = transactions.map((transaction) => {
    fakeID += 1;
    return <tr key={fakeID}>
        <td data-label="id">{fakeID}</td>
        <td data-label="date">{transaction.transactionDate}</td>
        <td data-label="description">{transaction.description}</td>
        <td data-label="notes">{
          transaction.notes.length > 0 ?
            transaction.notes :
            "None"
        }
        </td>
        {
          expensesAccount &&
          <>
            <td data-label="category">{transaction.transactionCategory ? transaction.transactionCategory.budgetCategory : "Missing"}</td>
          </>
        }
        <td data-label="amount">£{transaction.amount.toFixed(2)}</td>
        <td data-label="balance">£{transaction.balanceAfterTransaction.toFixed(2)}</td>
      </tr>
  })
  return <>
    <table className={style.table}>
      <caption>Account Transactions</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Transaction Date</th>
          <th>Description</th>
          <th>Notes</th>
          {
            expensesAccount &&
            <>
              <th>Budget Category</th>
            </>
          }
          <th>Amount</th>
          <th>Remaining Balance</th>
        </tr>
      </thead>
      <tbody>
        {renderedTransactions}
      </tbody>
    </table>
  </>
}

export default function Transactions() {
  const data = useLoaderData<typeof loader>();
  let body: JSX.Element;
  if (data.accountType === undefined) {
    body = <p>Account information missing</p>
  } else if (data.transactions.length === 0) {
    body = <p>No transactions found</p>
  } else {
    body = <TransactionsTable accountType={data.accountType} transactions={data.transactions} />
  }
  return (
    <>
      {body}
    </>
  )
}