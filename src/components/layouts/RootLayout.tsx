import Link from "next/link";

const RootLayout = ({ children }: any) => {
    return (
        <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
            <div className="flex-grow">
                <h1>Root Header</h1>
                <main className="my-0 py-16">{children}</main>
            </div>
            <h1><Link href={'/admin'}>Admin</Link></h1>
        </div>
    );
};

export default RootLayout;