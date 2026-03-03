import { moment } from 'obsidian';
import en from './en';

const localeMap: { [key: string]: typeof en } = {
	en,
};

const locale = localeMap[moment.locale()] ?? en;

export function t(str: keyof typeof en): string {
	return locale[str] || en[str] || str;
}
