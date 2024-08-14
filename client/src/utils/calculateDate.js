// Function to calculate date from indices
export function calculateDateFromIndices(i, j, currentMonth) {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const monthStartDate = new Date(year, month, 1);
    const monthStartDay = monthStartDate.getDay(); // Get the starting day of the month (0=Sunday, 6=Saturday)
    
    // Calculate the offset to align the first day of the month correctly in the grid
    const gridOffset = monthStartDay; // Adjusting for grid starting from Sunday (subtract 1 to make week start day Monday)
    const reversedRowIndex = 4 - i;
    const dayOffset = reversedRowIndex * 7 + j - gridOffset; // Calculate the offset from the first day of the month

    const selectedDate = new Date(year, month, 1);
    selectedDate.setDate(selectedDate.getDate() + dayOffset);

    return selectedDate;
};

// Function to calculate indices from the date
export function calculateIndicesFromDate(date, currentMonth) {
    const year = date.getFullYear();
    const month = currentMonth.getMonth();
    const dayOfMonth = date.getDate();
    const monthStartDate = new Date(year, month, 1);
    
    let monthStartDay = monthStartDate.getDay(); 
    monthStartDay = (monthStartDay === 0) ? 6 : monthStartDay - 1; // Adjust for Monday start, 0 becomes 6, others shift by 1

    const dayOffset = dayOfMonth; // subtract 1 for Monday as start weekday
    const gridIndex = monthStartDay + dayOffset;

    const reversedRowIndex = 4 - Math.floor(gridIndex / 7); // Reverse the row index
    const colIndex = gridIndex % 7;

    return { i: reversedRowIndex, j: colIndex };
}