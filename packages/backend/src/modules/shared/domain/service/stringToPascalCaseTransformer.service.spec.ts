import { StringToPascalCaseTransformerService } from '@src/modules/shared/domain/service/stringToPascalCaseTransformer.service';

describe('StringToPascalCaseTransformer', () => {
  let stringToPascalCaseTransformer;

  beforeEach(() => {
    stringToPascalCaseTransformer = new StringToPascalCaseTransformerService();
  });

  it('should transform string to PascalCase', () => {
    const inputString = 'hello_world-how-are_you';
    const expectedResult = 'HelloWorldHowAreYou';

    const result = stringToPascalCaseTransformer.transformStringToPascalCase(inputString);

    expect(result).toEqual(expectedResult);
  });

  it('should handle empty string', () => {
    const inputString = '';
    const expectedResult = '';

    const result = stringToPascalCaseTransformer.transformStringToPascalCase(inputString);

    expect(result).toEqual(expectedResult);
  });

  it('should handle string with single word', () => {
    const inputString = 'hello';
    const expectedResult = 'Hello';

    const result = stringToPascalCaseTransformer.transformStringToPascalCase(inputString);

    expect(result).toEqual(expectedResult);
  });

  it('should handle string with leading/trailing spaces', () => {
    const inputString = '  hello_world  ';
    const expectedResult = 'HelloWorld';

    const result = stringToPascalCaseTransformer.transformStringToPascalCase(inputString);

    expect(result).toEqual(expectedResult);
  });

  it('should handle string with special characters', () => {
    const inputString = '!@#$hello_world*&';
    const expectedResult = 'HelloWorld';

    const result = stringToPascalCaseTransformer.transformStringToPascalCase(inputString);

    expect(result).toEqual(expectedResult);
  });
});
