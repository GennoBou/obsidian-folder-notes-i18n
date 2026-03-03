import { Modal, Setting, type App } from 'obsidian';
import { t } from '../../lang/helpers';
import type FolderNotesPlugin from '../../main';
import type { WhitelistedPattern } from '../WhitelistPattern';

export default class WhitelistPatternSettings extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	pattern: WhitelistedPattern;
	constructor(app: App, plugin: FolderNotesPlugin, pattern: WhitelistedPattern) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.pattern = pattern;
	}

	onOpen(): void {
		this.display();
	}

	display(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl('h2', { text: t('MODAL_TITLE_WHITELISTED_PATTERN') });
		new Setting(contentEl)
			.setName(t('SETTING_ENABLE_SYNC'))
			// eslint-disable-next-line max-len
			.setDesc(t('SETTING_ENABLE_SYNC_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.enableSync)
					.onChange(async (value) => {
						this.pattern.enableSync = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_ALLOW_AUTO_CREATE'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.enableAutoCreate)
					.onChange(async (value) => {
						this.pattern.enableAutoCreate = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTINGS_TAB_FOLDER_OVERVIEW'))
			.setDesc(t('SETTING_DONT_SHOW_OVERVIEW_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.showInFolderOverview)
					.onChange(async (value) => {
						this.pattern.showInFolderOverview = value;
						await this.plugin.saveSettings();
					}),
			);


		new Setting(contentEl)
			.setName(t('SETTING_OPEN_ON_CLICK'))
			.setDesc(t('SETTING_OPEN_ON_CLICK_PATTERN_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.enableFolderNote)
					.onChange(async (value) => {
						this.pattern.enableFolderNote = value;
						await this.plugin.saveSettings(true);
						this.display();
					}),
			);

		if (this.pattern.enableFolderNote) {
			new Setting(contentEl)
				.setName(t('SETTING_DONT_COLLAPSE'))
				.setDesc(t('SETTING_DONT_COLLAPSE_DESC'))
				.addToggle((toggle) =>
					toggle
						.setValue(this.pattern.disableCollapsing)
						.onChange(async (value) => {
							this.pattern.disableCollapsing = value;
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
