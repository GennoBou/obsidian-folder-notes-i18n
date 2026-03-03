/* eslint-disable max-len */
import { Setting } from 'obsidian';
import { t } from '../lang/helpers';
import type { SettingsTab } from './SettingsTab';
export async function renderPath(settingsTab: SettingsTab): Promise<void> {
	const containerEl = settingsTab.settingsPage;
	new Setting(containerEl)
		.setName(t('SETTING_OPEN_THROUGH_PATH'))
		.setDesc(t('SETTING_OPEN_THROUGH_PATH_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.openFolderNoteOnClickInPath)
				.onChange(async (value) => {
					settingsTab.plugin.settings.openFolderNoteOnClickInPath = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	if (settingsTab.plugin.settings.openFolderNoteOnClickInPath) {
		new Setting(containerEl)
			.setName(t('SETTING_OPEN_SIDEBAR_MOBILE'))
			.setDesc(t('SETTING_OPEN_SIDEBAR_MOBILE_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.openSidebar.mobile)
					.onChange(async (value) => {
						settingsTab.plugin.settings.openSidebar.mobile = value;
						await settingsTab.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t('SETTING_OPEN_SIDEBAR_DESKTOP'))
			.setDesc(t('SETTING_OPEN_SIDEBAR_DESKTOP_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.openSidebar.desktop)
					.onChange(async (value) => {
						settingsTab.plugin.settings.openSidebar.desktop = value;
						await settingsTab.plugin.saveSettings();
					}),
			);
	}

	if (settingsTab.plugin.settings.frontMatterTitle.enabled) {
		new Setting(containerEl)
			.setName(t('SETTING_AUTO_UPDATE_PATH'))
			.setDesc(t('SETTING_AUTO_UPDATE_PATH_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.frontMatterTitle.path)
					.onChange(async (value) => {
						settingsTab.plugin.settings.frontMatterTitle.path = value;
						await settingsTab.plugin.saveSettings();
						if (value) {
							settingsTab.plugin.updateAllBreadcrumbs();
						} else {
							settingsTab.plugin.updateAllBreadcrumbs(true);
						}
					}),
			);
	}

	settingsTab.settingsPage.createEl('h3', { text: t('HEADER_STYLE_SETTINGS') });

	new Setting(containerEl)
		.setName(t('SETTING_UNDERLINE_PATH'))
		.setDesc(t('SETTING_UNDERLINE_PATH_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.underlineFolderInPath)
				.onChange(async (value) => {
					settingsTab.plugin.settings.underlineFolderInPath = value;
					if (value) {
						document.body.classList.add('folder-note-underline-path');
					} else {
						document.body.classList.remove('folder-note-underline-path');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_BOLD_PATH'))
		.setDesc(t('SETTING_BOLD_PATH_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.boldNameInPath)
				.onChange(async (value) => {
					settingsTab.plugin.settings.boldNameInPath = value;
					if (value) {
						document.body.classList.add('folder-note-bold-path');
					} else {
						document.body.classList.remove('folder-note-bold-path');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_CURSIVE_PATH'))
		.setDesc(t('SETTING_CURSIVE_PATH_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.cursiveNameInPath)
				.onChange(async (value) => {
					settingsTab.plugin.settings.cursiveNameInPath = value;
					if (value) {
						document.body.classList.add('folder-note-cursive-path');
					} else {
						document.body.classList.remove('folder-note-cursive-path');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);
}
