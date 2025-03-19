import { AvailabilityTable } from '@/components/AvailabilityTable'
import { Maintenance } from '@/components/Maintenance'
import { API } from '@/lib/api/api'

export const metadata = {
  title: 'My Therapy Network',
}

const Home = async () => {
  // Handle in case the Laravel server is down
  const apiResponse = await API.meta.up().catch(e => e)
  if (apiResponse.status !== 200) {
    return <Maintenance />
  }

  return (
    <main>
      <AvailabilityTable />
    </main>
  )
}

export default Home
