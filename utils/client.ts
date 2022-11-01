import sanityClient from "@sanity/client"

export const client = sanityClient({
  projectId: "0pkg03n5",
  dataset: "production",
  apiVersion: "2022-10-31",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})
