// ============================================
// useOptionalTranslation Hook
// ============================================
// This hook allows components to work with or without i18n context
// If i18n is available, it uses translations
// If not, it falls back to provided default values
import { useContext } from 'react'
import { I18nContext } from './i18nContext'

// Type for default translations mapping
type DefaultTranslations = Record<string, string>

/**
 * Optional translation hook that works with or without i18n context
 * @param defaults - Object mapping translation keys to default English values
 * @returns Translation function that returns translated text or defaults
 *
 * @example
 * const t = useOptionalTranslation({
 *   'header.welcome': 'Welcome',
 *   'header.logout': 'Logout'
 * })
 *
 * return <span>{t('header.welcome')}</span>
 */
export const useOptionalTranslation = (defaults: DefaultTranslations) => {
	// Try to get i18n context - will be undefined if provider not used
	const context = useContext(I18nContext)

	/**
	 * Translation function
	 * @param key - Translation key (e.g., 'header.welcome')
	 * @returns Translated string or default value
	 */
	const t = (key: string): string => {
		// If context exists, try to get translation
		if (context?.translations) {
			const keys = key.split('.')
			let value: any = context.translations

			// Navigate nested object
			for (const k of keys) {
				value = value?.[k]
				if (value === undefined) break
			}

			// Return translation if found and is a string
			if (value !== undefined && typeof value === 'string') {
				return value
			}
		}

		// Fall back to default value
		return defaults[key] || key
	}

	return t
}

// ============================================
// Alternative: Hook that returns full context info
// ============================================
/**
 * Extended optional translation hook that also returns context availability
 * @param defaults - Object mapping translation keys to default English values
 * @returns Object with translation function and metadata
 *
 * @example
 * const { t, hasI18n, language } = useOptionalTranslationExtended({
 *   'header.welcome': 'Welcome'
 * })
 */
export const useOptionalTranslationExtended = (
	defaults: DefaultTranslations
) => {
	const context = useContext(I18nContext)
	const hasI18n = !!context

	const t = (key: string): string => {
		if (context?.translations) {
			const keys = key.split('.')
			let value: any = context.translations

			for (const k of keys) {
				value = value?.[k]
				if (value === undefined) break
			}

			if (value !== undefined && typeof value === 'string') {
				return value
			}
		}

		return defaults[key] || key
	}

	return {
		t,
		hasI18n,
		language: context?.language || 'en'
	}
}

// ============================================
// Usage Examples
// ============================================
/*
// Basic usage in a component:
import { useOptionalTranslation } from '../hooks/useOptionalTranslation'

function MyComponent() {
  const t = useOptionalTranslation({
    'button.save': 'Save',
    'button.cancel': 'Cancel',
    'message.success': 'Success!'
  })

  return (
    <div>
      <button>{t('button.save')}</button>
      <button>{t('button.cancel')}</button>
    </div>
  )
}

// Extended usage with metadata:
import { useOptionalTranslationExtended } from '../hooks/useOptionalTranslation'

function AnotherComponent() {
  const { t, hasI18n, language } = useOptionalTranslationExtended({
    'greeting': 'Hello'
  })

  return (
    <div>
      <p>{t('greeting')}</p>
      {hasI18n && <small>Current language: {language}</small>}
    </div>
  )
}

// Without i18n provider (uses defaults):
// Output: "Welcome", "Logout"

// With i18n provider (uses translations):
// Output: "स्वागत है", "लॉगआउट" (for Hindi)
*/
