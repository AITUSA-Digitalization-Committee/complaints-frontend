'use client'

import CategoryInfo from '@/components/complaint/CategoryInfo';
import Form from '@/components/complaint/Form';
import View from '@/components/View';
import { useAuth } from '@/hooks/student';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ComplaintPage() {

  const router = useRouter();
  const { canSubmit } = useAuth();

  useEffect(() => {
    if (canSubmit) {
      return;
    }

    router.push('/');
    toast.error("Лимит жалоб (Попробуйте в течение 3 часов)")

  }, [])

  return (
    <View>

      <div className='text-dark text-2xl font-semibold mb-3'>Выбранная категория</div>

      <CategoryInfo />

      <Form />

    </View>
  );
}
