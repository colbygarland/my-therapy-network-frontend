import { AvailabilityTable } from '@/components/AvailabilityTable'
import { Container } from '@/components/Container'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import { Label } from '@/components/ui/label'
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

const COUNTRIES = ['Canada']
const STATES = ['Alberta', 'British Columbia']
const CITIES = ['Grande Prairie', 'Edmonton', 'Vancouver']
const THERAPY = ['Massage Therapist', 'Acupuncture', 'Occupational Therapist']

const Home = async () => {
    return (
        <main>
            <section className="py-8">
                <Container>
                    <div className="px-8">
                        <h2>Quick Booking</h2>
                        <div className="mt-8 flex gap-8">
                            <div>
                                <Label className="mb-2">
                                    What are you looking for?
                                </Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Therapy Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {THERAPY.map(value => (
                                            <SelectItem
                                                value={value.toLocaleLowerCase()}
                                                key={value}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="mb-2">Country</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COUNTRIES.map(value => (
                                            <SelectItem
                                                value={value.toLocaleLowerCase()}
                                                key={value}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="mb-2">Province</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATES.map(value => (
                                            <SelectItem
                                                value={value.toLocaleLowerCase()}
                                                key={value}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="mb-2">City</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CITIES.map(value => (
                                            <SelectItem
                                                value={value.toLocaleLowerCase()}
                                                key={value}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="mb-2">
                                    Choose date and time
                                </Label>
                                <div className="min-w-[200px]">
                                    <DateTimePicker />
                                </div>
                            </div>
                            <div />
                        </div>
                    </div>
                </Container>
            </section>
            <section className="py-8">
                <Container>
                    <div className="px-8">
                        <AvailabilityTable />
                    </div>
                </Container>
            </section>
        </main>
    )
}

export default Home
