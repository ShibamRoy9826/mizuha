
export default function HeadingText({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="heading underline col-span-2 w-full ">
            {children}
        </h1>
    );
}