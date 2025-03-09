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
import { API } from '@/lib/api/api'
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

export const AvailabilityTable = async () => {
  const { data } = await API.availability.list()

  return (
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
        {data.data.map(d => (
          <TableRow key={d.id}>
            <TableCell>{formatDate(d.start_at)}</TableCell>
            <TableCell>{formatDate(d.end_at)}</TableCell>
            <TableCell>4.5</TableCell>
            <TableCell>
              <Modal availability={d} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
