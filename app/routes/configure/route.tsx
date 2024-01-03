import { Outlet } from "@remix-run/react";
import { HeaderLayout } from "~/components/PageHeader/header";
import { AddJobDialog } from "./addJob";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export async function action({ request }: ActionFunctionArgs) {
  const formBody = await request.formData();
  try {
    const response = prisma.jobHistory.create({
      data: {
        jobTitle: formBody.get("jobTitle") as string,
        employer: formBody.get("employer") as string,
        startDate: new Date(formBody.get("startDate") as string),
        salary: Number(formBody.get("salary") as string),
      }
    })
    return redirect(`/configure`);
  } catch (error) {
    return json({ error: { general: "Something went wrong" } }, { status: 500 });  }
}

export default function ConfigureHeader() {
  return <div>
    <HeaderLayout
      title={<h1>Configuration</h1>}
      subTitle={"Setup the tool for your needs"}
      subPages={[<AddJobDialog />]}
    />
    <Outlet />
  </div>
}