import './globals.css'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import getCurrentUser from './actions/getCurrentUser'

import Navbar from './components/navbar/Navbar'

import RegisterModal from './components/Modals/RegisterModal'
import LoginModal from './components/Modals/LoginModal'
import RentModal from './components/Modals/RentModal'
import SearchModal from './components/Modals/SearchModal'
import ClientOnly from './components/ClientOnly'


const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
      <ClientOnly>
      <Toaster/>
      <RegisterModal/>
      <RentModal/>
      <LoginModal/>
      <SearchModal/>
      <Navbar currentUser={currentUser}/>
      </ClientOnly>

      {children}

      </body>
    </html>
  )
}
