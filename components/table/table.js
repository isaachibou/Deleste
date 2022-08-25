import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const header = ['row1', 'row2', 'row3']

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const Table1 = () => (<TableHead>
    <TableRow>
        <StyledTableCell>{header[0]}</StyledTableCell>
        <StyledTableCell>{header[1]}</StyledTableCell>
        <StyledTableCell>{header[2]}</StyledTableCell>
    </TableRow>
</TableHead>)

export default Table1