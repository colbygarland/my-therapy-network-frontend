import { Container } from '@/components/Container'
import { API } from '@/lib/api/api'

const Page = async ({ params }) => {
  const { id } = await params
  const { data, error } = await API.availability.get(id)
  const { data: list } = await API.availability.list()

  console.log(data)
  console.log(list.data)
  if (error) {
    return <div>error</div>
  }

  return (
    <main>
      <section>
        <div className="py-8">
          <Container>
            <h2>
              Please confirm tha you would like to book an appointment for{' '}
            </h2>
          </Container>
        </div>
      </section>
    </main>
  )
}

export default Page
