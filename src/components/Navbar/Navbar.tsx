
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';

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
        <div className='flex gap-4'>
            <SignedOut>
              <Button className='rounded-xl font-extrabold bg-[#9290C3] text-[#070F2B] hover:bg-[#535C91] h-full'><SignInButton /> </Button>
              <Button className='rounded-xl font-extrabold bg-[#9290C3] text-[#070F2B] hover:bg-[#535C91] h-full'><SignUpButton /> </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default Navbar