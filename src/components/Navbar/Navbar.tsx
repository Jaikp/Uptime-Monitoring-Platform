
import { auth } from '@/utils/auth'
import { SignIn } from '../auth/signin-button'
import { SignOut } from '../auth/signout-button';
import UserAvatar from '../UseAvatar';
import Link from 'next/link';

const Navbar = async () => {
    const session = await auth();
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
            {session?.user ? 
            <div className='flex gap-5'>
                <SignOut/>
                <UserAvatar/>
            </div> 
            :<SignIn/>}
        </div>
    </div>
  )
}

export default Navbar