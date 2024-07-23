import  { getLinks } from "@/queries/link";

export async function GET() {
    const data = await getLinks();

    return Response.json({ data });
}