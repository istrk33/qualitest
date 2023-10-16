export class StringToPascalCaseTransformerService {
  transformStringToPascalCase(stringToTransform: string): string {
    const words = stringToTransform.split(/[^a-zA-Z0-9]+/);
    const pascalCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const pascalCaseString = pascalCaseWords.join('');
    return pascalCaseString;
  }
}
