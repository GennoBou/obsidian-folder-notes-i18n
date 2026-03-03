import { Modal, Setting, type App } from 'obsidian';
import { t } from '../../lang/helpers';
import type FolderNotesPlugin from '../../main';
import type { ExcludedFolder } from 'src/ExcludeFolders/ExcludeFolder';
import { updateCSSClassesForFolder } from 'src/functions/styleFunctions';
export default class ExcludedFolderSettings extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	excludedFolder: ExcludedFolder;
	constructor(app: App, plugin: FolderNotesPlugin, excludedFolder: ExcludedFolder) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.excludedFolder = excludedFolder;
	}
	onOpen(): void {
		this.display();
	}
	display(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl('h2', { text: t('MODAL_TITLE_EXCLUDED_FOLDER') });
		new Setting(contentEl)
			.setName(t('SETTING_INCLUDE_SUBFOLDERS'))
			.setDesc(t('SETTING_INCLUDE_SUBFOLDERS_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.excludedFolder.subFolders)
					.onChange(async (value) => {
						this.excludedFolder.subFolders = value;
						await this.plugin.saveSettings(true);
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DISABLE_SYNC'))
			.setDesc(t('SETTING_DISABLE_SYNC_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.excludedFolder.disableSync)
					.onChange(async (value) => {
						this.excludedFolder.disableSync = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DONT_SHOW_OVERVIEW'))
			.setDesc(t('SETTING_DONT_SHOW_OVERVIEW_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.excludedFolder.excludeFromFolderOverview)
					.onChange(async (value) => {
						this.excludedFolder.excludeFromFolderOverview = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_SHOW_IN_EXPLORER'))
			.setDesc(t('SETTING_SHOW_IN_EXPLORER_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.excludedFolder.showFolderNote)
					.onChange(async (value) => {
						this.excludedFolder.showFolderNote = value;
						updateCSSClassesForFolder(this.excludedFolder.path, this.plugin);
						await this.plugin.saveSettings();
						this.display();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DISABLE_AUTO_CREATE'))
			.setDesc(t('SETTING_DISABLE_AUTO_CREATE_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.excludedFolder.disableAutoCreate)
					.onChange(async (value) => {
						this.excludedFolder.disableAutoCreate = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DISABLE_OPEN_NOTE'))
			.setDesc(t('SETTING_DISABLE_OPEN_NOTE_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.excludedFolder.disableFolderNote)
					.onChange(async (value) => {
						this.excludedFolder.disableFolderNote = value;
						await this.plugin.saveSettings(true);
						this.display();
					}),
			);

		if (!this.excludedFolder.disableFolderNote) {
			new Setting(contentEl)
				.setName(t('SETTING_COLLAPSE_OPEN'))
				.setDesc(t('SETTING_COLLAPSE_OPEN_DESC'))
				.addToggle((toggle) =>
					toggle
						.setValue(this.excludedFolder.enableCollapsing)
						.onChange(async (value) => {
							this.excludedFolder.enableCollapsing = value;
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
