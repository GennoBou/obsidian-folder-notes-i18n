import { Modal, type App, type TFolder } from 'obsidian';
import { t } from '../lang/helpers';
import type FolderNotesPlugin from '../main';
export default class NewFolderNameModal extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	folder: TFolder;
	constructor(app: App, plugin: FolderNotesPlugin, folder: TFolder) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.folder = folder;
	}

	onOpen(): void {
		const { contentEl } = this;

		contentEl.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				this.saveFolderName();
				this.close();
			}
		});

		this.modalEl.classList.add('mod-file-rename');
		const modalTitle = this.modalEl.querySelector('div.modal-title');
		if (modalTitle) {
			modalTitle.textContent = t('MODAL_TITLE_FOLDER_TITLE');
		}

		const textarea = contentEl.createEl('textarea', {
			text: this.folder.name.replace(this.plugin.settings.folderNoteType, ''),
			attr: {
				placeholder: t('PLACEHOLDER_ENTER_FOLDER_NAME'),
				rows: '1',
				spellcheck: 'false',
				class: 'rename-textarea',
			},
		});

		textarea.addEventListener('focus', function () {
			this.select();
		});

		textarea.focus();

		const buttonContainer = this.modalEl.createDiv({ cls: 'modal-button-container' });
		const saveButton = buttonContainer.createEl('button', { text: t('BUTTON_SAVE'), cls: 'mod-cta' });
		saveButton.addEventListener('click', async () => {
			this.saveFolderName();
			this.close();
		});

		const cancelButton = buttonContainer.createEl('button', {
			text: t('CANCEL'),
			cls: 'mod-cancel',
		});
		cancelButton.addEventListener('click', () => {
			this.close();
		});
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}

	saveFolderName(): void {
		const textarea = this.contentEl.querySelector('textarea');
		if (textarea) {
			const newName = textarea.value.trim();
			if (newName.trim() !== '') {
				const folderBasePath = this.folder.path.slice(
					0,
					this.folder.path.lastIndexOf('/') + 1,
				);
				const newFolderPath = folderBasePath + newName.trim();
				if (!this.app.vault.getAbstractFileByPath(newFolderPath)) {
					this.plugin.app.fileManager.renameFile(this.folder, newFolderPath);
				}
			}
		}
	}
}
