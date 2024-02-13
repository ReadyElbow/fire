import { prisma } from "~/utils/prisma.server";

// Check if the current expense is present in any transactions of the current month
export async function checkImpactedExpenses(budgetName: string, budgetDate: Date) {
  // Budget Threshold
  const firstDay = new Date(budgetDate.getFullYear(), budgetDate.getMonth(), 1);
  const lastDay = new Date(budgetDate.getFullYear(), budgetDate.getMonth() + 1, 0);
  const exisitingTransactions = await prisma.transactionCategories.findFirst({
    where: {
      budgetCategory: budgetName,
      date: {
        gte: firstDay,
        lt: lastDay
      }
    }
  });
  if (exisitingTransactions) {
    return true;
  }
  return false;
}

// let selectRemapOptions;
// if (impactedExpenses) {
//   const remapOptions = await prisma.transactionCategories.findMany({
//     where: {
//       NOT: {
//         budgetCategory: props.name
//       },
//       date: {
//         gte: new Date(props.budgetDate.getFullYear(), props.budgetDate.getMonth(), 1),
//         lt: new Date(props.budgetDate.getFullYear(), props.budgetDate.getMonth() + 1, 0)
//       }
//     }
//   });
//   selectRemapOptions = <div className={dialogStyle.createDialogForm}>
//     <div className={dialogStyle.createDialogFormRow}>
//       <label htmlFor="remappedCategory">Remap Expenses</label>
//       <select required name="remappedCategory" id="remappedCategory">
//         {remapOptions?.map((option) => {
//           return <option value={option.budgetCategory}>{option.budgetCategory}</option>;
//         })}
//       </select>
//     </div>
//   </div>
// }