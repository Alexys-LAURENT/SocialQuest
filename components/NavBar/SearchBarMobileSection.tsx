import { Dispatch, SetStateAction } from 'react';
import SearchBar from './SearchBar';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SearchBarMobileSection = ({
  setShowNavBarMobile,
}: {
  setShowNavBarMobile: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed w-full z-[9999] h-screen top-0 left-0 bg-tempBgDark flex flex-col items-center p-2 gap-2">
      <div className="w-full flex items-center justify-end">
        <XMarkIcon className="w-6 h-6 text-white" onClick={() => setShowNavBarMobile(false)} />
      </div>
      <SearchBar closeSearchBarMobile={() => setShowNavBarMobile(false)} />
    </div>
  );
};

export default SearchBarMobileSection;
