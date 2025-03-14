'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { formatDate } from '@/lib/date'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
// eslint-disable-next-line no-unused-vars
import type { Availability } from '@/lib/api/types/Availability'
import { Container } from './Container'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { DatePicker } from './ui/DatePicker'
import { Label } from './ui/label'
import { useAPI } from '@/lib/api/api'

const Modal = ({ availability }: { availability: Availability }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            You are currently booking a {availability.practition_type.type}
            appointment for {formatDate(availability.start_at)} to{' '}
            {formatDate(availability.end_at)}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const AvailabilityTable = () => {
  const {
    data: availability,
    error,
    isLoading,
  } = useAPI('availability', 'list')
  const { data: practitionTypes } = useAPI('practitionTypes', 'list')

  if (error) {
    return 'error'
  }
  if (isLoading) {
    return 'loading'
  }

  return (
    <>
      <section className="py-8">
        <Container>
          <div className="px-8">
            <h2>Quick Booking</h2>
            <div className="mt-8 flex gap-8">
              <form>
                <div>
                  <Label className="mb-2">What are you looking for?</Label>
                  <Select>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Therapy Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {practitionTypes?.map(({ type, id }) => (
                        <SelectItem value={type.toLocaleLowerCase()} key={id}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2">Choose date and time</Label>
                  <div className="min-w-[280px]">
                    <DatePicker />
                  </div>
                </div>
                <div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
      <Table>
        <TableCaption>Available Time Slots</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Starts</TableHead>
            <TableHead>Ends</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {availability?.map(d => {
            return (
              <TableRow key={d.id}>
                <TableCell>{formatDate(d.start_at)}</TableCell>
                <TableCell>{formatDate(d.end_at)}</TableCell>
                <TableCell>4.5</TableCell>
                <TableCell>
                  <Modal availability={d} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
