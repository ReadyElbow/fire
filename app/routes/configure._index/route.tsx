import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Card } from "~/components/Card/card";
import { prisma } from "~/utils/prisma.server";

export async function loader(request: LoaderFunctionArgs) {
  const jobs = await prisma.jobHistory.findMany(
    {
      orderBy: {
        startDate: "desc"
      }
    }
  );
  return json({ jobs: jobs })
}

function JobCard(props: { active: boolean }) {
  return <Card title={<h3>Job Title</h3>} body={<p>Job Description</p>} footer={<p>Job Location</p>} />
}

export default function Configure() {
  const data = useLoaderData<typeof loader>();
  const inactiveJobs = data.jobs.filter(job => job.endDate);
  const activeJobs = data.jobs.filter(job => !job.endDate);
  return <>
    <h2>Active Jobs</h2>
    {activeJobs.map(job => <JobCard active={true} />)}
    <h2>Inactive Jobs</h2>
    {inactiveJobs.map(job => <JobCard active={false} />)}
  </>
}