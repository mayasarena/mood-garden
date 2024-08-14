// Helper function to format the view range (weekly, monthly, and yearly)
export function formatViewRange(date, mode) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    if (mode === 'weekly') {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Set to start of the week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
        return `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
    } else if (mode === 'monthly') {
        return `${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    } else if (mode === 'yearly') {
        return `${date.getFullYear()}`;
    }
    return date.toLocaleDateString('en-US', options);
};

// Function to get the value of the mood from the flower ID
export function getValueFromFlowerId(flowerId) {
    const [_, moodId] = flowerId.split('-');

    switch (moodId) {
        case 'vhappy':
            return 4;
        case 'happy':
            return 3;
        case 'neutral':
            return 2;
        case 'sad':
            return 1;
        case 'vsad':
            return 0;
        default:
            return 2;
    }
}

// Helper function to get the week days of the current week
export function getWeekDays(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Set to start of the week (Sunday)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)

    // Create an array to hold all the dates from start to end of the week
    const daysArray = [];
    let currentDate = new Date(startOfWeek);

    while (currentDate <= endOfWeek) {
        daysArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray;
}

export function getMonthDays(date) {
    // Clone the date to avoid mutating the original
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1); // Start of the month
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0); // End of the month

    // Create an array to hold all the dates from start to end of the month
    const daysArray = [];
    let currentDate = new Date(monthStart);

    while (currentDate <= monthEnd) {
        daysArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray;
}

// Function to get month identifiers for a given year
export function getYearMonths(year) {
    const monthsArray = [];
    for (let month = 0; month < 12; month++) {
        monthsArray.push(new Date(year, month, 1));
    }
    return monthsArray;
}

// Function to get the top flowers
export function getTopFlowers(data) {
    const flowerCounts = {};
    let maxFlowerCount = 0;

    // Count occurrences and determine max value
    Object.values(data).forEach(moodData => {
        Object.entries(moodData).forEach(([flower, count]) => {
            flowerCounts[flower] = (flowerCounts[flower] || 0) + count;
            if (flowerCounts[flower] > maxFlowerCount) {
                maxFlowerCount = flowerCounts[flower];
            }
        });
    });

    // Find top flowers and their counts
    const topFlowers = Object.entries(flowerCounts)
        .filter(([flowerId, count]) => count === maxFlowerCount)
        .map(([flowerId]) => ({ flowerId, count: maxFlowerCount }));

    return topFlowers;
}

// Function to get the top flower types
export function getTopFlowerTypes(data) {
    const flowerTypeCounts = {};
    let maxFlowerTypeCount = 0;

    // Count occurrences and determine max value
    Object.values(data).forEach(moodData => {
        Object.entries(moodData).forEach(([flower, count]) => {
            const flowerType = flower.split('-')[0];
            flowerTypeCounts[flowerType] = (flowerTypeCounts[flowerType] || 0) + count;
            if (flowerTypeCounts[flowerType] > maxFlowerTypeCount) {
                maxFlowerTypeCount = flowerTypeCounts[flowerType];
            }
        });
    });

    // Find top flower types and their counts
    const topFlowerTypes = Object.entries(flowerTypeCounts)
        .filter(([flowerType, count]) => count === maxFlowerTypeCount)
        .map(([flowerType]) => ({ flowerType, count: maxFlowerTypeCount }));

    return topFlowerTypes;
}