import { Modal, Setting, TFolder, Notice, type App, type ButtonComponent } from 'obsidian';
import { t } from '../../lang/helpers';
import type FolderNotesPlugin from '../../main';
import { createFolderNote, getFolderNote } from 'src/functions/folderNoteFunctions';
import { getTemplatePlugins } from 'src/template';
import { getExcludedFolder } from 'src/ExcludeFolders/functions/folderFunctions';
export default class ConfirmationModal extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	folder: TFolder;
	extension: string;
	constructor(app: App, plugin: FolderNotesPlugin) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.extension = plugin.settings.folderNoteType;
	}

	onOpen(): void {
		this.modalEl.addClass('fn-confirmation-modal');
		let templateFolderPath: string;
		const { templateFolder, templaterPlugin } = getTemplatePlugins(this.plugin.app);
		if ((!templateFolder || templateFolder?.trim() === '') && !templaterPlugin) {
			templateFolderPath = '';
		}
		if (templaterPlugin) {
			templateFolderPath = (
				templaterPlugin as unknown as {
					plugin?: { settings?: { templates_folder?: string } }
				}
			).plugin?.settings?.templates_folder as string;
		} else if (templateFolder) {
			templateFolderPath = templateFolder;
		}

		const { contentEl } = this;
		contentEl.createEl('h2', { text: t('HEADER_CREATE_FOR_EVERY') });
		const setting = new Setting(contentEl);
		// eslint-disable-next-line max-len
		setting.infoEl.createEl('p', { text: t('HEADER_BACKUP_VAULT') }).style.color = '#fb464c';
		// eslint-disable-next-line max-len
		setting.infoEl.createEl('p', { text: t('INFO_CREATE_FOR_EVERY') });
		// eslint-disable-next-line max-len
		setting.infoEl.createEl('p', { text: t('INFO_ALREADY_HAS_NOTE_IGNORED') });
		setting.infoEl.createEl('p', { text: t('INFO_EXCLUDED_IGNORED') });
		if (
			!this.plugin.settings.templatePath ||
			this.plugin.settings.templatePath?.trim() === ''
		) {
			new Setting(contentEl)
				.setName(t('SETTING_EXTENSION_CHOICE'))
				.setDesc(t('SETTING_EXTENSION_CHOICE_DESC'))
				.addDropdown((cb) => {
					this.plugin.settings.supportedFileTypes.forEach((extension) => {
						cb.addOption('.' + extension, extension);
					});
					cb.setValue(this.extension);
					cb.onChange(async (value) => {
						this.extension = value;
					});
				},
				);
		}
		new Setting(contentEl)
			.addButton((cb: ButtonComponent) => {
				cb.setButtonText(t('BUTTON_CREATE'));
				cb.setCta();
				cb.buttonEl.focus();
				cb.onClick(async () => {
					if (
						this.plugin.settings.templatePath &&
						this.plugin.settings.templatePath.trim() !== ''
					) {
						this.extension = '.' + this.plugin.settings.templatePath.split('.').pop();
					}
					if (this.extension === '.ask') {
						return new Notice(t('NOTICE_CHOOSE_EXTENSION'));
					}
					this.close();
					const folders = this.app.vault
						.getAllLoadedFiles()
						.filter((file) => file instanceof TFolder);
					for (const folder of folders) {
						if (folder instanceof TFolder) {
							const excludedFolder = getExcludedFolder(
								this.plugin, folder.path, true,
							);
							if (excludedFolder) continue;
							if (folder.path === templateFolderPath) continue;
							const folderNote = getFolderNote(this.plugin, folder.path);
							if (folderNote) continue;
							await createFolderNote(this.plugin, folder.path, false, this.extension);
						}
					}
				});
			})
			.addButton((cb: ButtonComponent) => {
				cb.setButtonText(t('CANCEL'));
				cb.onClick(async () => {
					this.close();
				});
			});
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
