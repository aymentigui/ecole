import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const Admin = async () => {
  const session=await auth()
  console.log(JSON.stringify(session))
  
  return (
    <div>
        <form action={
          async ()=>{
            "use server"
            await signOut()
          }
        }>
          <Button type='submit'>
            Deconnecter
          </Button>
        </form>
    </div>
  )
}

export default Admin
