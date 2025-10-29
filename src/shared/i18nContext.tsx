// ============================================
// 2. I18n Context
// ============================================
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react'

// 1. Types & Interfaces

export type Language = string

export interface Translations {
	[key: string]: any
}

export interface LanguageInfo {
	code: Language
	name: string
	nativeName: string
	direction: 'ltr' | 'rtl'
}

export interface I18nConfig {
	languages: Record<Language, Translations>
	metadata: Record<Language, LanguageInfo>
	defaultLanguage: Language
}

export interface I18nContextType {
	language: Language
	setLanguage: (lang: Language) => void
	translations: Translations
	availableLanguages: Language[]
	getLanguageInfo: (lang: Language) => LanguageInfo | undefined
}

export interface TranslationParams {
	[key: string]: string | number
}

// ============================================

// ============================================

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
	children: ReactNode
	config: I18nConfig
	storageKey?: string
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
	children,
	config,
	storageKey = 'app-language'
}) => {
	const { languages, metadata, defaultLanguage } = config

	const [language, setLanguage] = useState<Language>(() => {
		const saved = localStorage.getItem(storageKey) as Language
		return saved && languages[saved] ? saved : defaultLanguage
	})

	useEffect(() => {
		localStorage.setItem(storageKey, language)
		document.documentElement.lang = language

		// Set text direction based on language metadata
		const langInfo = metadata[language]
		if (langInfo) {
			document.documentElement.dir = langInfo.direction
		}
	}, [language, storageKey, metadata])

	const getLanguageInfo = (lang: Language): LanguageInfo | undefined => {
		return metadata[lang]
	}

	const value: I18nContextType = {
		language,
		setLanguage: (lang: Language) => {
			if (languages[lang]) {
				setLanguage(lang)
			} else {
				console.warn(`Language '${lang}' not found in registry`)
			}
		},
		translations: languages[language] || languages[defaultLanguage],
		availableLanguages: Object.keys(languages),
		getLanguageInfo
	}

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// ============================================
// 3. useTranslation Hook
// ============================================
interface UseTranslationReturn {
	t: (key: string, params?: TranslationParams) => string
	language: Language
	setLanguage: (lang: Language) => void
	availableLanguages: Language[]
	getLanguageInfo: (lang: Language) => LanguageInfo | undefined
}

export const useTranslation = (): UseTranslationReturn => {
	const context = useContext(I18nContext)

	if (!context) {
		throw new Error('useTranslation must be used within I18nProvider')
	}

	const {
		language,
		setLanguage,
		translations,
		availableLanguages,
		getLanguageInfo
	} = context

	const t = (key: string, params: TranslationParams = {}): string => {
		const keys = key.split('.')
		let value: any = translations

		// Navigate nested object
		for (const k of keys) {
			value = value?.[k]
			if (value === undefined) break
		}

		// Return key if translation not found
		if (value === undefined || typeof value !== 'string') {
			console.warn(
				`Translation missing for key: ${key} in language: ${language}`
			)
			return key
		}

		// Replace variables like {{name}}
		return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
			const replacement = params[param]
			return replacement !== undefined ? String(replacement) : match
		})
	}

	return { t, language, setLanguage, availableLanguages, getLanguageInfo }
}

// ============================================
// 4. Utility Hook - useLanguage
// ============================================
export const useLanguage = (): [Language, (lang: Language) => void] => {
	const { language, setLanguage } = useTranslation()
	return [language, setLanguage]
}

// ============================================
// 5. Helper Function - Create I18n Config
// ============================================
export const createI18nConfig = (
	languages: Record<Language, Translations>,
	metadata: Record<Language, LanguageInfo>,
	defaultLanguage: Language
): I18nConfig => {
	// Validate that defaultLanguage exists
	if (!languages[defaultLanguage]) {
		throw new Error(
			`Default language '${defaultLanguage}' not found in languages registry`
		)
	}

	// Validate that all languages have metadata
	const languagesWithoutMetadata = Object.keys(languages).filter(
		(lang) => !metadata[lang]
	)
	if (languagesWithoutMetadata.length > 0) {
		console.warn(
			`Missing metadata for languages: ${languagesWithoutMetadata.join(', ')}`
		)
	}

	return {
		languages,
		metadata,
		defaultLanguage
	}
}

// ============================================
// 6. Example Usage (Documentation)
// ============================================
/*
// Step 1: Import your language files
import { en } from "./translations/en";
import { hi } from "./translations/hi";
import { ta } from "./translations/ta";

// Step 2: Create language registry
const languages = {
  en,
  hi,
  ta
};

// Step 3: Create metadata registry
const metadata = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    direction: 'ltr'
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    direction: 'ltr'
  }
};

// Step 4: Create config
const i18nConfig = createI18nConfig(languages, metadata, 'en');

// Step 5: Use in your app
function App() {
  return (
    <I18nProvider config={i18nConfig}>
      <YourApp />
    </I18nProvider>
  );
}

// Step 6: Use in components
function YourComponent() {
  const { t, language, setLanguage, availableLanguages, getLanguageInfo } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.message', { name: 'John' })}</p>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {availableLanguages.map(lang => {
          const info = getLanguageInfo(lang);
          return (
            <option key={lang} value={lang}>
              {info?.nativeName || lang}
            </option>
          );
        })}
      </select>
    </div>
  );
}
*/
