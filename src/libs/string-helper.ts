export const toPascalCase = (string: string) => {
  const words = string.split(/[\s_]+/);

  // Capitalize the first letter of each word and join them
  const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words to form the PascalCase string
  const pascalCaseString = pascalCaseWords.join('');

  return pascalCaseString;
}

export const formatDate = (date: Date) => {
  // Extract date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Extract time components
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Create the formatted date and time string
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  return formattedDate;
}