import { Modal, Setting, type App } from 'obsidian';
import { t } from '../../lang/helpers';
import type FolderNotesPlugin from '../../main';
import type { WhitelistedFolder } from '../WhitelistFolder';
export default class WhitelistFolderSettings extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	whitelistedFolder: WhitelistedFolder;
	constructor(app: App, plugin: FolderNotesPlugin, whitelistedFolder: WhitelistedFolder) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.whitelistedFolder = whitelistedFolder;
	}

	onOpen(): void {
		this.display();
	}

	display(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl('h2', { text: t('MODAL_TITLE_WHITELISTED_FOLDER') });
		new Setting(contentEl)
			.setName(t('SETTING_INCLUDE_SUBFOLDERS'))
			.setDesc(t('SETTING_INCLUDE_SUBFOLDERS_WHITELIST_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.whitelistedFolder.subFolders)
					.onChange(async (value) => {
						this.whitelistedFolder.subFolders = value;
						await this.plugin.saveSettings(true);
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_ENABLE_SYNC'))
			// eslint-disable-next-line max-len
			.setDesc(t('SETTING_ENABLE_SYNC_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.whitelistedFolder.enableSync)
					.onChange(async (value) => {
						this.whitelistedFolder.enableSync = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTINGS_TAB_FOLDER_OVERVIEW'))
			.setDesc(t('SETTING_DONT_SHOW_OVERVIEW_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.whitelistedFolder.showInFolderOverview)
					.onChange(async (value) => {
						this.whitelistedFolder.showInFolderOverview = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_HIDE_IN_EXPLORER'))
			.setDesc(t('SETTING_HIDE_IN_EXPLORER_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.whitelistedFolder.hideInFileExplorer)
					.onChange(async (value) => {
						this.whitelistedFolder.hideInFileExplorer = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_ALLOW_AUTO_CREATE'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.whitelistedFolder.enableAutoCreate)
					.onChange(async (value) => {
						this.whitelistedFolder.enableAutoCreate = value;
						await this.plugin.saveSettings();
					}),
			);


		new Setting(contentEl)
			.setName(t('SETTING_OPEN_ON_CLICK'))
			.setDesc(t('SETTING_OPEN_ON_CLICK_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.whitelistedFolder.enableFolderNote)
					.onChange(async (value) => {
						this.whitelistedFolder.enableFolderNote = value;
						await this.plugin.saveSettings(true);
						this.display();
					}),
			);

		if (this.whitelistedFolder.enableFolderNote) {
			new Setting(contentEl)
				.setName(t('SETTING_DONT_COLLAPSE'))
				.setDesc(t('SETTING_DONT_COLLAPSE_DESC'))
				.addToggle((toggle) =>
					toggle
						.setValue(this.whitelistedFolder.disableCollapsing)
						.onChange(async (value) => {
							this.whitelistedFolder.disableCollapsing = value;
							await this.plugin.saveSettings();
						}),
				);
		}

	}
	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
