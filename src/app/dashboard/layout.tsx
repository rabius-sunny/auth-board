import Sidebar from '@/components/shared/sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='col-span-1'>
        <Sidebar />
      </div>
      <div className='py-2 px-4'>
        <div className='py-2 px-4'>{children}</div>
      </div>
    </div>
  );
}
