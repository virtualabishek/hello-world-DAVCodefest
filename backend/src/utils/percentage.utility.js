export function calculatePercentage(initial, total) {
    if (total === 0) return "Total cannot be zero";
    return (initial / total) * 100;
}

console.log(calculatePercentage(20, 100)); 
console.log(calculatePercentage(50, 200));
console.log(calculatePercentage(0, 100));  
console.log(calculatePercentage(10, 0));   