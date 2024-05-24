import Head from "next/head";

import { Inter } from "next/font/google";

import Signup from './signup'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
      </Head>
   
   <Signup/>
   
   
   
    </>
  );
}