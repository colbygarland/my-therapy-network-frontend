'use client'

import { useAvailability } from '@/hooks/api/useAvailability'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table'
import { Button } from './ui/button'

export const AvailabilityTable = () => {
    const { data } = useAvailability('GET')

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
                {data?.map(d => (
                    <TableRow key={d.id}>
                        <TableCell>{d.start_at}</TableCell>
                        <TableCell>{d.end_at}</TableCell>
                        <TableCell>4.5</TableCell>
                        <TableCell>
                            <Button>Book Appointment</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
