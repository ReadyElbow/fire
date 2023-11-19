import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from '@remix-run/node'

export async function loader({
    params,
  }: LoaderFunctionArgs) {
    return json({ hello: 'world' });
  }