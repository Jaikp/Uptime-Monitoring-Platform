"use server"
import { auth } from "../auth"

export async function getServerSideProps(ctx : any) {
  const session = await auth(ctx)
 
  return {
    props: {
      session,
    },
  }
}