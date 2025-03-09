import { Nunito } from 'next/font/google'
import '@/app/global.css'
import { Container } from '@/components/Container'
import LoginLinks from './LoginLinks'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
                <header className="bg-gray-100 px-6 py-4">
                    <Container>
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">
                                My Therapy Network
                            </h1>
                            <LoginLinks />
                        </div>
                    </Container>
                </header>
                {children}
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default RootLayout
