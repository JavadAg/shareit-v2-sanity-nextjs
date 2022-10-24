import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "0pkg03n5",
  dataset: "production",
  apiVersion: "2022-10-24",
  useCdn: false
})
