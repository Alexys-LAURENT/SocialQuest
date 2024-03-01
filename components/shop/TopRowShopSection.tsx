'use client';
import { shopSearchParmas } from '@/app/types/entities';
import { Input, Select, SelectItem } from '@nextui-org/react';

const TopRowShopSection = ({ searchParams }: { searchParams: shopSearchParmas }) => {
  const getDefaultValue = (paramsOrder?: string) => {
    if (!paramsOrder) return '';
    switch (paramsOrder) {
      case 'pasc':
        return 'prix-croissant';
      case 'pdesc':
        return 'prix-décroissant';
      case 'az':
        return 'A-Z';
      case 'za':
        return 'Z-A';
      default:
        return '';
    }
  };

  return (
    <div className="w-full p-4 flex flex-col sm:flex-row items-center justify-between">
      <Input
        className="w-full sm:w-7/12 !min-h-10 !h-10"
        classNames={{ inputWrapper: '!min-h-10 !h-10' }}
        defaultValue={searchParams.name}
        placeholder="Rechercher un item"
      />
      <div className="flex items-center w-full sm:w-3/12">
        <label htmlFor="" className="flex text-tiny w-[80px]">
          Trier par:
        </label>
        <Select
          aria-label="Trier par"
          variant="underlined"
          placeholder="Choisir un filtre"
          classNames={{ trigger: 'border-none py-0' }}
          multiple={false}
          defaultSelectedKeys={[getDefaultValue(searchParams.order)]}
        >
          <SelectItem key="prix-croissant" value="prix-croissant">
            Prix (croissant)
          </SelectItem>
          <SelectItem key="prix-décroissant" value="prix-décroissant">
            Prix (décroissant)
          </SelectItem>
          <SelectItem key="A-Z" value="A-Z">
            A-Z
          </SelectItem>
          <SelectItem key="Z-A" value="Z-A">
            Z-A
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default TopRowShopSection;
