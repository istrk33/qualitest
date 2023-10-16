interface Translation {
  localeCode: string;
  [key: string]: any;
}

type FindTranslationByLocaleCode = <T extends Translation>(translations: T[], localeCode: string) => T;

export const findTranslationByLocaleCode: FindTranslationByLocaleCode = (translations, localeCode) => {
  return translations.find((translation) => translation.localeCode === localeCode);
};
