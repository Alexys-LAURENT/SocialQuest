import { Autocomplete, AutocompleteItem, AutocompleteSection, Avatar } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { doSearchByWord } from "@/utils/doSearchByWord";
import { Key, useEffect, useRef, useState } from "react";
import Link from "next/link";
const SearchBar = () => {
    const headingClasses = "flex w-full py-1.5 px-2 bg-default-100 font-bold text-sm rounded-small";
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [guildes, setGuildes] = useState<any>([])
    const [profiles, setProfiles] = useState<any>([])
    // const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [selectedKey, setSelectedKey] = useState<Key | null | undefined>();

    useEffect(() => {
        const getData = async () => {
            const data = await doSearchByWord(inputValue);
            setProfiles(data[0]);
            setGuildes(data[1]);
            setIsLoading(false);
        }
        getData();
    }, [inputValue]);

    useEffect(() => {
        setSelectedKey(null);
        setInputValue('');
    }, [selectedKey]);

    return (
        <Autocomplete
            aria-label="Rechercher"
            inputProps={{ classNames: { input: "inputFilterNavbar", inputWrapper: "h-10 transition-all !duration-500" }, startContent: <MagnifyingGlassIcon className="w-5 h-5 text-textDark dark:text-textLight !duration-[125ms]" /> }}
            classNames={{ selectorButton: "hidden" }}
            selectorIcon={null}
            defaultFilter={() => true}
            scrollShadowProps={{
                isEnabled: false,
            }}
            inputValue={inputValue}
            isLoading={isLoading}
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            placeholder="Rechercher"
            onInputChange={(value) => {
                setInputValue(value);
                setIsLoading(true);
            }}
        >

            {isLoading && (
                <AutocompleteSection title="Utilisateurs" classNames={{ group: "flex flex-col gap-1", heading: headingClasses }} showDivider>
                    {
                        [1, 2].map((i) => (
                            <AutocompleteItem value="Recherche en cours" textValue="Recherche en cours" key={`searchbar-recherche-en-cours-user-${i}`} className="animate-pulse h-12 bg-default-100 data-[hover=true]:bg-default-100">
                            </AutocompleteItem>
                        ))
                    }
                </AutocompleteSection>
            )}

            {profiles && profiles.length > 0 && !isLoading && (
                <AutocompleteSection title="Utilisateurs" classNames={{ heading: headingClasses }} showDivider>

                    {profiles.map((profile: any) => (
                        <AutocompleteItem as={Link} href={`/${profile.username}`} key={`searchbar-${profile.username}`} value={profile.username} textValue={profile.username}>
                            <div className="w-full h-full">
                                <div className="flex flex-row w-full h-fit gap-2 items-center">
                                    <Avatar size="sm" src={profile.avatar_url} />
                                    <div className="w-full h-full flex flex-col">
                                        {profile.username}
                                        <span className="text-tiny text-default-400">Utilisateur • Niveau {profile.niveau}</span>
                                    </div>
                                </div>
                            </div>
                        </AutocompleteItem>
                    ))}

                </AutocompleteSection>
            )}

            {isLoading && (
                <AutocompleteSection title="Guildes" classNames={{ group: "flex flex-col gap-1", heading: headingClasses }} showDivider>
                    {
                        [1, 2].map((i) => (
                            <AutocompleteItem value="Recherche en cours" textValue="Recherche en cours" key={`searchbar-recherche-en-cours-guilde-${i}`} className="animate-pulse h-12 bg-default-100 data-[hover=true]:bg-default-100">
                            </AutocompleteItem>
                        ))
                    }
                </AutocompleteSection>
            )}


            {guildes && guildes.length > 0 && !isLoading && (
                <AutocompleteSection title="Guildes" classNames={{ heading: headingClasses }} showDivider={inputValue ? true : false}>

                    {guildes.map((guilde: any) => (
                        <AutocompleteItem as={Link} href={`/g/${guilde.nom}`} key={`searchbar-${guilde.nom}`} value={guilde.nom} textValue={guilde.nom} >
                            <div className="w-full h-full">
                                <div className="flex flex-row w-full h-fit gap-2 items-center">
                                    <Avatar size="sm" src={guilde.avatar_url} />
                                    <div className="w-full h-full flex flex-col">
                                        {guilde.nom}
                                        <span className="text-tiny text-default-400">Guilde • {guilde.total_members} membres</span>
                                    </div>
                                </div>
                            </div>
                        </AutocompleteItem>
                    ))}

                </AutocompleteSection>
            )}

            {!isLoading && inputValue && (
                <AutocompleteSection title="Voir plus" classNames={{ heading: headingClasses }} >
                    <AutocompleteItem as={Link} href={`/?q=${inputValue}`} value="Voir plus" textValue="Voir plus" key={`searchbar-voir-plus`}>
                        <div className="w-full h-full" onClick={() => setInputValue('')}>
                            Rechercher {inputValue}
                        </div>
                    </AutocompleteItem>
                </AutocompleteSection>
            )}


        </Autocomplete>
    );
}

export default SearchBar;