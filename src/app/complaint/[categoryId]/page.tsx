import CategoryInfo from '@/components/complaint/CategoryInfo';
import Form from '@/components/complaint/Form';
import View from '@/components/View';

export default function ComplaintPage() {

  return (
    <View>

      <div className='text-dark text-2xl font-semibold mb-3'>Выбранная категория</div>
      
      <CategoryInfo />
      
      <Form />

    </View>
  );
}
