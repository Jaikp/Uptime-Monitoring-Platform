"use server"
import { auth } from "../utils/auth"

export async function getServerSideProps(ctx : any) {
  const session = await auth(ctx)
 
  return {
    props: {
      session,
    },
  }
}