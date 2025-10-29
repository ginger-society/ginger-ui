import { useOptionalTranslation } from '@src/shared/useOptionalTranslation'
import React from 'react'
import { Button, ButtonType } from '../button'
import styles from './modal.module.scss'

interface ModalFooterProps {
	onCancel: () => void
	onOk?: () => void
	okBtnLabel?: React.ReactNode
	cancelBtnLabel?: React.ReactNode
	okBtnType?: ButtonType
}

const ModalFooter: React.FC<ModalFooterProps> = ({
	onCancel,
	onOk,
	okBtnLabel,
	cancelBtnLabel,
	okBtnType = ButtonType.Primary
}) => {
	// Use optional translation hook - returns defaults if i18n not available
	const t = useOptionalTranslation({
		'uiElement.modal.ok': 'Okay',
		'uiElement.modal.cancel': 'Cancel'
	})

	return (
		<div className={styles['modal-footer']}>
			<Button
				type={okBtnType}
				label={okBtnLabel ?? t('uiElement.modal.ok')}
				onClick={onOk}
			/>
			<Button
				label={cancelBtnLabel ?? t('uiElement.modal.cancel')}
				onClick={onCancel}
			/>
		</div>
	)
}

export default ModalFooter

// ============================================
// Translation Structure for Consumer
// ============================================
/*
In your translation files (en.ts, hi.ts, etc.), add:

export const en = {
	modal: {
		ok: "Okay",
		cancel: "Cancel"
	},
	// ... other translations
}

export const hi = {
	modal: {
		ok: "ठीक है",
		cancel: "रद्द करें"
	},
	// ... other translations
}

export const ta = {
	modal: {
		ok: "சரி",
		cancel: "ரத்து செய்"
	},
	// ... other translations
}

export const te = {
	modal: {
		ok: "సరే",
		cancel: "రద్దు చేయి"
	},
	// ... other translations
}

export const kn = {
	modal: {
		ok: "ಸರಿ",
		cancel: "ರದ್ದುಮಾಡಿ"
	},
	// ... other translations
}

export const ml = {
	modal: {
		ok: "ശരി",
		cancel: "റദ്ദാക്കുക"
	},
	// ... other translations
}

export const gu = {
	modal: {
		ok: "ઠીક છે",
		cancel: "રદ કરો"
	},
	// ... other translations
}

export const bn = {
	modal: {
		ok: "ঠিক আছে",
		cancel: "বাতিল করুন"
	},
	// ... other translations
}

export const pa = {
	modal: {
		ok: "ਠੀਕ ਹੈ",
		cancel: "ਰੱਦ ਕਰੋ"
	},
	// ... other translations
}

export const or = {
	modal: {
		ok: "ଠିକ୍ ଅଛି",
		cancel: "ବାତିଲ୍ କରନ୍ତୁ"
	},
	// ... other translations
}

export const as = {
	modal: {
		ok: "ঠিক আছে",
		cancel: "বাতিল কৰক"
	},
	// ... other translations
}

export const mni = {
	modal: {
		ok: "ꯑꯣꯏ",
		cancel: "ꯀꯦꯟꯁꯦꯜ ꯇꯧ"
	},
	// ... other translations
}

export const sat = {
	modal: {
		ok: "ᱴᱷᱤᱠ",
		cancel: "ᱵᱟᱹᱛᱤᱞ"
	},
	// ... other translations
}

export const ur = {
	modal: {
		ok: "ٹھیک ہے",
		cancel: "منسوخ کریں"
	},
	// ... other translations
}
*/
