import { TemplatePurchase } from '@/components/TemplatePurchase';

export default function TemplatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TemplatePurchase />
    </main>
  );
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}