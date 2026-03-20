import { Metadata } from 'next';
import AdminDashboard from './AdminDashboard';

export const metadata: Metadata = {
  title: 'Leads | Admin',
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <AdminDashboard />;
}
