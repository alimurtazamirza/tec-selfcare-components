"use client";
import { Card, Box, Typography, Button } from "@mui/material";
import { CircularProgress } from "../../ui";
import { ChevronRight } from "@mui/icons-material";
// calls={{used: 15, total: 60}} data={{used: 2.67, total: 3}} sms={{used: 0, total: 0}}
export default function UsageCard({ width, marginTop, size=60 }) {
    const circle = (title, value, total, color, postFix) => (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CircularProgress
                variant="determinate"
                title={title}
                value={value}
                total={total}
                postFix={postFix}
                size={size}
                thickness={5}
                sx={{ color }}
            />
            <Typography variant="body2" sx={{ p: 1 }}>
                Out of {total} {postFix}
            </Typography>
            <Button
                variant="contained"
                size="small"
                sx={(theme) => ({
                    fontWeight:'bold',
                    borderRadius: 4,
                    width: "80px",
                    textTransform: "none",
                    backgroundColor: `${theme.palette.primary.main}1A`, // 10% opacity (hex 1A)
                    color: theme.palette.primary.main,
                })}
            >
                Add
            </Button>
        </Box>
    );

    return (
        <Card sx={{ p: 2, borderRadius: 3, width: width ||"100%", mx: "auto", mt: marginTop || 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={700}>
                    Remaining Usage
                </Typography>
                <Button variant="text" size="small" sx={{ textTransform: "none" }}>
                    View Details <ChevronRight />
                </Button>
            </Box>

            <Box display="flex" justifyContent="space-around" mt={2}>
                {circle("Calls", 55, 60, "orange", "Min")}
                {circle("Data", 11.5, 15, "green", "GB")}
                {circle("SMS", 3357, 5000, "grey", "SMS")}
            </Box>
        </Card>
    );
}