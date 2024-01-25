const ProfileItemSkeleton = () => {
    const tab = [1, 2, 3, 4]
    return (
        tab.map((item: number) => ((
            <div key={`${Math.random()}-ProfileItemSkeleton-${item}`} className="relative h-full animate-pulse aspect-square bg-[#2e2e2e] rounded-md">
            </div>
        )))
    );
};

export default ProfileItemSkeleton;