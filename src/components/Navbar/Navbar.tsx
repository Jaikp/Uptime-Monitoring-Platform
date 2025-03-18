
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = async () => {
  return (
    <div className='px-10 py-4 flex justify-between items-center '>
        <div className='text-white text-2xl'>
            <Link href='/'>Uptime</Link>
        </div>
        <div className='text-white flex gap-4 font-sans'>
            <Link className='hover:text-slate-400' href='/'>Home</Link>
            <Link className='hover:text-slate-400' href='/monitors'>Monitor</Link>
        </div>
        <div>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default Navbar