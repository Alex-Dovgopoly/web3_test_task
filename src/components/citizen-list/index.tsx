import { useMemo, useState } from "react";
import { Box, Pagination, Stack } from "@mui/material";
import CitizenListItem from "../citizen-list-item";

function CitizenList({ citizenListData }: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 5;

    const currentPageData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return citizenListData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, citizenListData]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                {currentPageData.map((citizen: any) => (
                    <CitizenListItem itemData={citizen} key={citizen.id.value} />
                )
                )}
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center" }} py={3}>
                <Pagination count={Math.ceil(citizenListData.length / 5)} page={currentPage} onChange={handleChangePage} />
            </Box>
        </Box>
    )
};

export default CitizenList;