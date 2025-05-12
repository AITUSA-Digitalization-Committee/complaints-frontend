'use client'

import { api } from '@/api/instance';
import Auth from '@/components/Auth';
import ComplaintAccordion from '@/components/ComplaintAccordion';
import Categories from '@/components/home/Categories';
import View from '@/components/View';
import { useCategories } from '@/hooks/categories';
import { ApiResponse, ICategory } from '@/types';
import { useEffect } from 'react';

export default function HomePage() {

  const { setCategories } = useCategories();

  const fetchCategories = async () => {
    await api.get<ApiResponse<ICategory[]>>('/categories')
      .then((response) => {
        if (response.data.statusCode != 200) {
          return;
        }
        setCategories(response.data.data);
      })
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <View className='flex flex-col gap-8'>
      <ComplaintAccordion />
      <Categories />
    </View>
  );
}
