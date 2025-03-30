import React from "react";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Page from "./page";
const RootLayout = ({ children }: { children: ReactNode }) => {
    return(
        <div className='root-layout'>
            <nav>
                <Link href ='/' className='flex items-center gap-2'>
                <Image src="/logo.svg" alt="Logo" width={32} height={32} className="rounded-full" />
                <h2 className="text-primary-100">InterVue AI</h2>
                </Link>
            </nav>
            {/* <Page/> */}
            {children}
        </div>
    );
}
export default RootLayout;
