import { Modal, Platform, type App, type TFile } from 'obsidian';
import { t } from '../lang/helpers';
import type FolderNotesPlugin from '../main';
import { deleteFolderNote } from 'src/functions/folderNoteFunctions';
export default class DeleteConfirmationModal extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	file: TFile;
	constructor(app: App, plugin: FolderNotesPlugin, file: TFile) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.file = file;
	}
	onOpen(): void {
		const { contentEl, plugin } = this;
		const modalTitle = contentEl.createDiv({ cls: 'fn-modal-title' });
		const modalContent = contentEl.createDiv({ cls: 'fn-modal-content' });
		modalTitle.createEl('h2', { text: t('MODAL_TITLE_DELETE_NOTE') });
		// eslint-disable-next-line max-len
		modalContent.createEl('p', { text: t('MODAL_CONFIRM_DELETE_NOTE').replace('{{file}}', this.file.name) });
		switch (plugin.settings.deleteFilesAction) {
			case 'trash':
				modalContent.createEl('p', { text: t('MODAL_TRASH_SYSTEM') });
				break;
			case 'obsidianTrash':
				// eslint-disable-next-line max-len
				modalContent.createEl('p', { text: t('MODAL_TRASH_OBSIDIAN') });
				break;
			case 'delete':
				modalContent
					.createEl('p', { text: t('MODAL_DELETE_PERMANENT') })
					.setCssStyles({ color: 'red' });
				break;
		}

		const buttonContainer = contentEl.createEl('div', { cls: 'modal-button-container' });

		if (!Platform.isMobile) {
			const checkbox = buttonContainer.createEl('label', { cls: 'mod-checkbox' });
			checkbox.tabIndex = -1;
			checkbox.createEl('input', { type: 'checkbox' });
			checkbox.appendText(t('BUTTON_DONT_ASK_AGAIN'));
			const input = checkbox.querySelector('input');
			input?.addEventListener('change', (e) => {
				const target = e.target as HTMLInputElement;
				if (target.checked) {
					plugin.settings.showDeleteConfirmation = false;
				} else {
					plugin.settings.showDeleteConfirmation = true;
				}
				plugin.saveSettings();
			});
		} else {
			const confirmButton = buttonContainer.createEl('button', {
				text: t('BUTTON_DELETE_DONT_ASK_AGAIN'),
				cls: 'mod-destructive',
			});
			confirmButton.addEventListener('click', async () => {
				plugin.settings.showDeleteConfirmation = false;
				plugin.saveSettings();
				this.close();
				deleteFolderNote(plugin, this.file, false);
			});
		}

		const deleteButton = buttonContainer.createEl('button', {
			text: t('BUTTON_DELETE'),
			cls: 'mod-warning',
		});
		deleteButton.addEventListener('click', async () => {
			this.close();
			deleteFolderNote(plugin, this.file, false);
		});
		deleteButton.focus();

		const cancelButton = buttonContainer.createEl('button', {
			text: t('CANCEL'),
			cls: 'mod-cancel',
		});
		cancelButton.addEventListener('click', async () => {
			this.close();
		});
	}
	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
