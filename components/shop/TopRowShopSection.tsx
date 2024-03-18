'use client';
import { shopSearchParmas } from '@/app/types/entities';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';
const TopRowShopSection = ({ searchParams }: { searchParams: shopSearchParmas }) => {
  const getDefaultValue = (paramsOrder?: string) => {
    if (!paramsOrder) return '';
    switch (paramsOrder) {
      case 'pasc':
        return 'pasc';
      case 'pdesc':
        return 'pdesc';
      case 'az':
        return 'az';
      case 'za':
        return 'za';
      default:
        return '';
    }
  };
  const seearchParams = useSearchParams();
  const router = useRouter();

  console.log('searchParams', searchParams);

  const handleSubmitInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const currentSearchParams = new URLSearchParams(seearchParams.toString());
      currentSearchParams.set('name', e.currentTarget.value);
      router.push('/shop?' + decodeURIComponent(currentSearchParams.toString()));
    }
  };

  const handleSelectChange = (value: string) => {
    const currentSearchParams = new URLSearchParams(seearchParams.toString());
    currentSearchParams.set('order', value);
    router.push('/shop?' + decodeURIComponent(currentSearchParams.toString()));
  };

  return (
    <div className="w-full p-4 flex flex-col lg:flex-row items-center justify-between">
      <Input
        onKeyDown={(e) => {
          handleSubmitInput(e);
        }}
        className="w-full lg:w-7/12 !min-h-10 !h-10"
        classNames={{ inputWrapper: '!min-h-10 !h-10' }}
        defaultValue={typeof searchParams.name === 'string' ? searchParams.name : ''}
        placeholder="Rechercher un item"
      />
      <div className="flex items-center w-full lg:w-4/12">
        <label htmlFor="" className="flex text-tiny w-[80px]">
          Trier par:
        </label>
        <Select
          onChange={(e) => {
            handleSelectChange(e.target.value);
          }}
          fullWidth
          aria-label="Trier par"
          variant="underlined"
          placeholder="Choisir un filtre"
          multiple={false}
          defaultSelectedKeys={searchParams.order !== undefined && searchParams.order !== '' ? [getDefaultValue(typeof searchParams.order === 'string' ? searchParams.order : undefined)] : undefined}
        >
          <SelectItem key="pasc" value="pasc">
            Prix (croissant)
          </SelectItem>
          <SelectItem key="pdesc" value="pdesc">
            Prix (décroissant)
          </SelectItem>
          <SelectItem key="az" value="az">
            A-Z
          </SelectItem>
          <SelectItem key="za" value="za">
            Z-A
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default TopRowShopSection;
