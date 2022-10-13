import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { FC } from 'react';

export interface IColumn {
    title: string;
    render: (row: any, rIndex: number) => any;
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

interface IProps {
    columns: IColumn[];
    data: any;
}

const BasicTable: FC<IProps> = ({ columns = [], data }, ref) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    {columns.map((cell, i) => (
                        <TableCell align={cell.align} key={i}>
                            {cell.title}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row: any, rI: number) => (
                    <TableRow key={rI}>
                        {columns.map((column, cI) => (
                            <TableCell key={cI}>{column.render(row, rI)}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default BasicTable;
