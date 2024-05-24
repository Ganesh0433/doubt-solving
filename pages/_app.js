import { useRouter } from 'next/router';
import "@/styles/globals.css";
import Menu from "./menu";
import Box from './box';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isSignupPage = router.pathname == '/signup';
  const isLoginPage = router.pathname =='/login';
  const isIndexPage = router.pathname == '/';
  const isDashboardPage = router.pathname === '/dashboard';
  const isDoubtCreationPage = router.pathname === '/doubtcreation';



  return (
    <>
      {!isLoginPage && !isIndexPage &&(
        <>
          <Menu/>
          <Box />
        </>
      )}
      
      <Component {...pageProps}/>
    </>
  );
}

  

 

