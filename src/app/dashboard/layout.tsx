import Sidebar from '@/components/shared/sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-4'>
      <Sidebar />
      {children}
    </div>
  );
}
