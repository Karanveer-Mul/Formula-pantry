export default function SectionSubItem(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <div className="z-10 flex flex-col w-full h-fit mt-20 pb-10 justify-around lg:flex-row gap-y-1">
            {children}
        </div>
    );
}