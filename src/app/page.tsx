import { AvailabilityTable } from '@/components/AvailabilityTable'

export const metadata = {
  title: 'My Therapy Network',
}

const Home = async () => {
  return (
    <main>
      <AvailabilityTable />
    </main>
  )
}

export default Home
