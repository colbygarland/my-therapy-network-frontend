import LoginLinks from '@/app/LoginLinks'
import { Container } from '@/components/Container'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export const metadata = {
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
                    <Container>
                        <div className="px-8">
                            <h2>Quick Booking</h2>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="canada">
                                        Canada
                                    </SelectItem>
                                    <SelectItem value="new_zealand">
                                        New Zealand
                                    </SelectItem>
                                    <SelectItem value="spain">Spain</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

export default Home
