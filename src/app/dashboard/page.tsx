import { fetchReqRes } from '@/lib/req-res';
import { logout } from '@/actions/auth';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default async function DashboardPage() {
  const response = await fetchReqRes('https://reqres.in/api/users/2', {
    method: 'GET'
  });

  const { data: user } = (await response.json()) as { data: TUser };

  return (
    <div className='bg-gray-50 p-8 h-svh'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <form action={logout}>
          <Button
            type='submit'
            className='bg-red-600 hover:bg-red-700 flex items-center gap-2'
          >
            Logout <LogOut className='size-4' />
          </Button>
        </form>
      </div>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center gap-6'>
            <div className='relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 shrink-0'>
              <Image
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                width={96}
                height={96}
                className='object-cover rounded-full'
                priority
              />
            </div>

            <div className='flex-1'>
              <h2 className='text-2xl font-semibold text-gray-900'>
                {user.first_name} {user.last_name}
              </h2>
              <p className='text-gray-600 mt-1'>{user.email}</p>
              <p className='text-sm text-gray-500 mt-2'>User ID: {user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
