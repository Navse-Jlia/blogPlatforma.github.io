import { format } from 'date-fns';

export default function formattedDate(date) {
  return date ? format(new Date(date), 'MMM dd, yyyy') : '';
}
