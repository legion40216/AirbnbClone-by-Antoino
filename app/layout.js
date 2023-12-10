import './globals.css'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import AuthProvider from './api/auth/provider'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/Modals/RegisterModal'
import LoginModal from './components/Modals/LoginModal'
import RentModal from './components/Modals/RentModal'
import SearchModal from './components/Modals/SearchModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={nunito.className}>
      <AuthProvider>
        <Toaster/>
        <RegisterModal/>
        <RentModal/>
        <LoginModal/>
        <SearchModal/>
        <Navbar/>
        {children}
      </AuthProvider>
      </body>
    </html>
  )
}
