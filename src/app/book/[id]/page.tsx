import { Container } from '@/components/Container'
import { H2 } from '@/components/Headings'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { API } from '@/lib/api/api'
import { formatDate } from '@/lib/date'
import { redirect } from 'next/navigation'
import { UserForm } from './UserForm'

export default async function Page({ params }) {
  const { id } = await params
  const { data: availability } = await API.availability.get(id)
  if (!availability?.id) {
    redirect('/?error=availability-not-found')
  }

  return (
    <main>
      <section className="py-8">
        <Container>
          <div className="grid grid-cols-2 gap-16">
            <Accordion type="single" collapsible defaultValue="info">
              <AccordionItem value="info">
                <AccordionTrigger>Contact Details</AccordionTrigger>
                <AccordionContent>
                  <H2>First, who are we booking for?</H2>
                  <UserForm />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>Payment Info</AccordionTrigger>
                <AccordionContent>
                  <p>Payment form</p>
                  <Button>Book appointment</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div>
              <H2>Appointment Details</H2>
              <p>
                <strong>Therapy type: </strong>
                {availability?.practition_type.type}
              </p>
              <p>
                <strong>Starts at: </strong>
                {formatDate(availability?.start_at!)}
              </p>
              <p>
                <strong>Ends at: </strong>
                {formatDate(availability?.end_at!)}
              </p>
              <Calendar
                disableNavigation
                disabled
                mode="single"
                selected={new Date(availability?.start_at)}
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
