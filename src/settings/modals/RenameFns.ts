import BackupWarningModal from './BackupWarning';
import type FolderNotesPlugin from 'src/main';
import { Setting } from 'obsidian';
import { t } from '../../lang/helpers';

export default class RenameFolderNotesModal extends BackupWarningModal {
	constructor(
		plugin: FolderNotesPlugin,
		title: string,
		description: string,
		callback: (...args: unknown[]) => void,
		args: unknown[] = [],
	) {
		super(plugin, title, description, callback, args);
	}

	insertCustomHtml(): void {
		const { contentEl } = this;
		new Setting(contentEl)
			.setName(t('SETTING_OLD_FOLDER_NOTE_NAME'))
			// eslint-disable-next-line max-len
			.setDesc(t('SETTING_OLD_FOLDER_NOTE_NAME_DESC'))
			.addText((text) => text
				.setPlaceholder(t('PLACEHOLDER_ENTER_OLD_NAME'))
				.setValue(this.plugin.settings.oldFolderNoteName || '')
				.onChange(async (value) => {
					this.plugin.settings.oldFolderNoteName = value;
				}),
			);

		new Setting(contentEl)
			.setName(t('SETTING_NEW_FOLDER_NOTE_NAME'))
			// eslint-disable-next-line max-len
			.setDesc(t('SETTING_NEW_FOLDER_NOTE_NAME_DESC'))
			.addText((text) => text
				.setPlaceholder(t('PLACEHOLDER_ENTER_NEW_NAME'))
				.setValue(this.plugin.settings.folderNoteName || '')
				.onChange(async (value) => {
					this.plugin.settings.folderNoteName = value;
					this.plugin.settingsTab.display();
				}),
			);
	}
}
