export const toPascalCase = (string: string) => {
  const words = string.split(/[\s_]+/);

  // Capitalize the first letter of each word and join them
  const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words to form the PascalCase string
  const pascalCaseString = pascalCaseWords.join('');

  return pascalCaseString;
}