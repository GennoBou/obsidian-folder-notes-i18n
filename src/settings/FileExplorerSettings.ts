/* eslint-disable max-len */
import { Setting } from 'obsidian';
import { t } from '../lang/helpers';
import type { SettingsTab } from './SettingsTab';
export async function renderFileExplorer(settingsTab: SettingsTab): Promise<void> {
	const containerEl = settingsTab.settingsPage;

	new Setting(containerEl)
		.setName(t('SETTING_HIDE_FOLDER_NOTE'))
		.setDesc(t('SETTING_HIDE_FOLDER_NOTE_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.hideFolderNote)
				.onChange(async (value) => {
					settingsTab.plugin.settings.hideFolderNote = value;
					await settingsTab.plugin.saveSettings();
					if (value) {
						document.body.classList.add('hide-folder-note');
					} else {
						document.body.classList.remove('hide-folder-note');
					}
					settingsTab.display();
				}),
		);

	const setting2 = new Setting(containerEl)
		.setName(t('SETTING_DISABLE_CLICK_MOBILE'))
		.setDesc(t('SETTING_DISABLE_CLICK_MOBILE_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.disableOpenFolderNoteOnClick)
				.onChange(async (value) => {
					settingsTab.plugin.settings.disableOpenFolderNoteOnClick = value;
					await settingsTab.plugin.saveSettings();
				}),
		);

	setting2.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
	const setting2AccentColor = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';
	setting2.infoEl.style.color = setting2AccentColor;

	new Setting(containerEl)
		.setName(t('SETTING_OPEN_DIRECTLY_ONLY'))
		.setDesc(t('SETTING_OPEN_DIRECTLY_ONLY_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(!settingsTab.plugin.settings.stopWhitespaceCollapsing)
				.onChange(async (value) => {
					if (!value) {
						document.body.classList.add('fn-whitespace-stop-collapsing');
					} else {
						document.body.classList.remove('fn-whitespace-stop-collapsing');
					}
					settingsTab.plugin.settings.stopWhitespaceCollapsing = !value;
					await settingsTab.plugin.saveSettings();
				}),
		);

	const disableSetting = new Setting(containerEl);
	disableSetting.setName(t('SETTING_DISABLE_COLLAPSING'));
	disableSetting.setDesc(t('SETTING_DISABLE_COLLAPSING_DESC'));
	disableSetting.addToggle((toggle) =>
		toggle
			.setValue(!settingsTab.plugin.settings.enableCollapsing)
			.onChange(async (value) => {
				settingsTab.plugin.settings.enableCollapsing = !value;
				await settingsTab.plugin.saveSettings();
			}),
	);
	disableSetting.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
	const accentColor = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';
	disableSetting.infoEl.style.color = accentColor;

	new Setting(containerEl)
		.setName(t('SETTING_USE_SUBMENUS'))
		.setDesc(t('SETTING_USE_SUBMENUS_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.useSubmenus)
				.onChange(async (value) => {
					settingsTab.plugin.settings.useSubmenus = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	if (settingsTab.plugin.settings.frontMatterTitle.enabled) {
		new Setting(containerEl)
			.setName(t('SETTING_AUTO_UPDATE_EXPLORER'))
			.setDesc(t('SETTING_AUTO_UPDATE_EXPLORER_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.frontMatterTitle.explorer)
					.onChange(async (value) => {
						settingsTab.plugin.settings.frontMatterTitle.explorer = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.plugin.app.vault.getFiles().forEach((file) => {
							settingsTab.plugin.fmtpHandler?.fmptUpdateFileName(
								{
									id: '',
									result: false,
									path: file.path,
									pathOnly: false,
								},
								false,
							);
						});
					}),
			);
	}

	settingsTab.settingsPage.createEl('h3', { text: t('HEADER_STYLE_SETTINGS') });

	new Setting(containerEl)
		.setName(t('SETTING_HIGHLIGHT_FOLDER_EXPLORER'))
		.setDesc(t('SETTING_HIGHLIGHT_FOLDER_EXPLORER_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.highlightFolder)
				.onChange(async (value) => {
					settingsTab.plugin.settings.highlightFolder = value;
					if (!value) {
						document.body.classList.add('disable-folder-highlight');
					} else {
						document.body.classList.remove('disable-folder-highlight');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_HIDE_COLLAPSE_ICON'))
		.setDesc(t('SETTING_HIDE_COLLAPSE_ICON_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.hideCollapsingIcon)
				.onChange(async (value) => {
					settingsTab.plugin.settings.hideCollapsingIcon = value;
					if (value) {
						document.body.classList.add('fn-hide-collapse-icon');
					} else {
						document.body.classList.remove('fn-hide-collapse-icon');
					}
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_HIDE_COLLAPSE_ICON_EVERY'))
		.setDesc(t('SETTING_HIDE_COLLAPSE_ICON_EVERY_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.hideCollapsingIconForEmptyFolders)
				.onChange(async (value) => {
					settingsTab.plugin.settings.hideCollapsingIconForEmptyFolders = value;
					await settingsTab.plugin.saveSettings();
					if (value) {
						document.body.classList.add('fn-hide-empty-collapse-icon');
					} else {
						document.body.classList.remove('fn-hide-empty-collapse-icon');
					}
					settingsTab.display();
				},
				));

	if (settingsTab.plugin.settings.hideCollapsingIcon) {
		new Setting(containerEl)
			.setName(t('SETTING_IGNORE_ATTACHMENT_FOLDER'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.ignoreAttachmentFolder)
					.onChange(async (value) => {
						if (value) {
							document.body.classList.add('fn-ignore-attachment-folder');
						} else {
							document.body.classList.remove('fn-ignore-attachment-folder');
						}
						settingsTab.plugin.settings.ignoreAttachmentFolder = value;
						await settingsTab.plugin.saveSettings();
					}),
			);
	}

	new Setting(containerEl)
		.setName(t('SETTING_UNDERLINE_FOLDER_EXPLORER'))
		.setDesc(t('SETTING_UNDERLINE_FOLDER_EXPLORER_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.underlineFolder)
				.onChange(async (value) => {
					settingsTab.plugin.settings.underlineFolder = value;
					if (value) {
						document.body.classList.add('folder-note-underline');
					} else {
						document.body.classList.remove('folder-note-underline');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_BOLD_FOLDER_EXPLORER'))
		.setDesc(t('SETTING_BOLD_FOLDER_EXPLORER_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.boldName)
				.onChange(async (value) => {
					settingsTab.plugin.settings.boldName = value;
					if (value) {
						document.body.classList.add('folder-note-bold');
					} else {
						document.body.classList.remove('folder-note-bold');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_CURSIVE_FOLDER_EXPLORER'))
		.setDesc(t('SETTING_CURSIVE_FOLDER_EXPLORER_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.cursiveName)
				.onChange(async (value) => {
					settingsTab.plugin.settings.cursiveName = value;
					if (value) {
						document.body.classList.add('folder-note-cursive');
					} else {
						document.body.classList.remove('folder-note-cursive');
					}
					await settingsTab.plugin.saveSettings();
				}),
		);

}
