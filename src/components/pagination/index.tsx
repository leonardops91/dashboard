import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./paginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 2;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return index + from + 1;
    })
    .filter((index) => index > 0);
}

export default function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  return (
    <Stack
      direction='row'
      mt='8'
      justify='space-between'
      align='center'
      spacing='6'
    >
      <Box>
        <strong>{(currentPage - 1) * registersPerPage + 1 }</strong> - <strong>{currentPage * registersPerPage }</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange}/>
            {currentPage > 2 + siblingsCount && <Text color='gray.300' w={8} textAlign='center'>...</Text>}
          </>
        )}
        {previousPages &&
          previousPages.map((p) => {
            return <PaginationItem number={p} key={p} onPageChange={onPageChange}/>;
          })}
        <PaginationItem isCurrent number={currentPage} onPageChange={onPageChange}/>
        {nextPages &&
          nextPages.map((p) => {
            return <PaginationItem number={p} key={p} onPageChange={onPageChange}/>;
          })}
        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount < lastPage - 2 && <Text color='gray.300' w={8} textAlign='center'>...</Text>}
            <PaginationItem number={lastPage} onPageChange={onPageChange}/>
          </>
        )}
      </Stack>
    </Stack>
  );
}
