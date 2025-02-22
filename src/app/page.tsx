import LoginLinks from '@/app/LoginLinks'
import { Container } from '@/components/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My Therapy Network',
}

const Home = () => {
    return (
        <>
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
            <main>
                <section className="py-8">
                    <Container>hello</Container>
                </section>
            </main>
        </>
    )
}

export default Home
