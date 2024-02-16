const ProfileItemSkeleton = () => {
    const tab = [1, 2, 3, 4]
    return (
        tab.map((item: number) => ((
            <div key={`${Math.random()}-ProfileItemSkeleton-${item}`} className="relative h-full animate-pulse aspect-square bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton rounded-md transition-all !duration-[500ms]">
            </div>
        )))
    );
};

export default ProfileItemSkeleton;