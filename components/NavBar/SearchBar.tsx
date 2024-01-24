import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const SearchBar = () => {
    let list = useAsyncList({
        async load({ signal, filterText }) {
            let res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, { signal });
            let json = await res.json();

            return {
                items: json.results,
            };
        },
    });

    return (
        <Autocomplete
            aria-label="Rechercher"
            inputProps={{ classNames: { inputWrapper: "h-10 transition-all !duration-500" }, startContent: <MagnifyingGlassIcon className="w-5 h-5 text-textDark dark:text-textLight !duration-[125ms]" /> }}
            classNames={{ selectorButton: "hidden" }}
            selectorIcon={null}
            inputValue={list.filterText}
            isLoading={list.isLoading}
            items={list.items}
            placeholder="Rechercher"
            onInputChange={list.setFilterText}
        >
            {(item: any) => (
                <AutocompleteItem aria-label={item.name} key={item.name} className="capitalize">
                    {item.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}

export default SearchBar;