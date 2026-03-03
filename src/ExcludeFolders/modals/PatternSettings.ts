import { Modal, Setting, type App } from 'obsidian';
import { t } from '../../lang/helpers';
import type FolderNotesPlugin from '../../main';
import type { ExcludePattern } from 'src/ExcludeFolders/ExcludePattern';
import { refreshAllFolderStyles } from 'src/functions/styleFunctions';

export default class PatternSettings extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	pattern: ExcludePattern;
	constructor(app: App, plugin: FolderNotesPlugin, pattern: ExcludePattern) {
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
		contentEl.createEl('h2', { text: t('MODAL_TITLE_PATTERN_SETTINGS') });

		new Setting(contentEl)
			.setName(t('SETTING_DISABLE_SYNC'))
			// eslint-disable-next-line max-len
			.setDesc(t('SETTING_DISABLE_SYNC_PATTERN_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.disableSync)
					.onChange(async (value) => {
						this.pattern.disableSync = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DISABLE_AUTO_CREATE'))
			// eslint-disable-next-line max-len
			.setDesc(t('SETTING_DISABLE_AUTO_CREATE_PATTERN_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.disableAutoCreate)
					.onChange(async (value) => {
						this.pattern.disableAutoCreate = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DONT_SHOW_OVERVIEW'))
			.setDesc(t('SETTING_DONT_SHOW_OVERVIEW_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.excludeFromFolderOverview)
					.onChange(async (value) => {
						this.pattern.excludeFromFolderOverview = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_SHOW_IN_EXPLORER'))
			.setDesc(t('SETTING_SHOW_IN_EXPLORER_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.showFolderNote)
					.onChange(async (value) => {
						this.pattern.showFolderNote = value;
						await this.plugin.saveSettings();
						refreshAllFolderStyles(true, this.plugin);
						this.display();
					}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_DISABLE_OPEN_NOTE'))
			.setDesc(t('SETTING_DISABLE_OPEN_NOTE_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.disableFolderNote)
					.onChange(async (value) => {
						this.pattern.disableFolderNote = value;
						await this.plugin.saveSettings(true);
						this.display();
					}),
			);

		if (!this.pattern.disableFolderNote) {
			new Setting(contentEl)
				.setName(t('SETTING_COLLAPSE_OPEN'))
				.setDesc(t('SETTING_COLLAPSE_OPEN_DESC'))
				.addToggle((toggle) =>
					toggle
						.setValue(this.pattern.enableCollapsing)
						.onChange(async (value) => {
							this.pattern.enableCollapsing = value;
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
