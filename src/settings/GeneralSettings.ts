/* eslint-disable max-len */
import { Setting, Platform } from 'obsidian';
import { t } from '../lang/helpers';
import type { SettingsTab } from './SettingsTab';
import { ListComponent } from '../functions/ListComponent';
import AddSupportedFileModal from '../modals/AddSupportedFileType';
import { FrontMatterTitlePluginHandler } from '../events/FrontMatterTitle';
import ConfirmationModal from './modals/CreateFnForEveryFolder';
import { TemplateSuggest } from '../suggesters/TemplateSuggester';
import { refreshAllFolderStyles } from '../functions/styleFunctions';
import BackupWarningModal from './modals/BackupWarning';
import RenameFolderNotesModal from './modals/RenameFns';

let debounceTimer: NodeJS.Timeout;

// eslint-disable-next-line complexity
export async function renderGeneral(settingsTab: SettingsTab): Promise<void> {
	const containerEl = settingsTab.settingsPage;
	const nameSetting = new Setting(containerEl)
		.setName(t('SETTING_FOLDER_NOTE_NAME_TEMPLATE'))
		.setDesc(t('SETTING_FOLDER_NOTE_NAME_TEMPLATE_DESC'))
		.addText((text) =>
			text
				.setValue(settingsTab.plugin.settings.folderNoteName)
				.onChange(async (value) => {
					if (value.trim() === '') { return; }
					settingsTab.plugin.settings.folderNoteName = value;
					await settingsTab.plugin.saveSettings();

					clearTimeout(debounceTimer);
					const FOLDER_NOTE_NAME_DEBOUNCE_MS = 2000;
					debounceTimer = setTimeout(() => {
						if (!value.includes('{{folder_name}}')) {
							if (!settingsTab.showFolderNameInTabTitleSetting) {
								settingsTab.display();
								settingsTab.showFolderNameInTabTitleSetting = true;
							}
						} else {
							if (settingsTab.showFolderNameInTabTitleSetting) {
								settingsTab.display();
								settingsTab.showFolderNameInTabTitleSetting = false;
							}
						}
					}, FOLDER_NOTE_NAME_DEBOUNCE_MS);
				}),
		)
		.addButton((button) =>
			button
				.setButtonText(t('BUTTON_RENAME_EXISTING_NOTES'))
				.setCta()
				.onClick(async () => {
					new RenameFolderNotesModal(
						settingsTab.plugin,
						t('RENAME_ALL_EXISTING_NOTES'),
						t('RENAME_ALL_EXISTING_NOTES_DESC'),
						settingsTab.renameFolderNotes,
						[])
						.open();
				}),
		);
	nameSetting.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
	nameSetting.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	if (!settingsTab.plugin.settings.folderNoteName.includes('{{folder_name}}')) {
		new Setting(containerEl)
			.setName(t('SETTING_TAB_MANAGER'))
			.setDesc(t('SETTING_TAB_MANAGER_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.tabManagerEnabled)
					.onChange(async (value) => {
						if (!value) {
							settingsTab.plugin.tabManager.resetTabs();
						} else {
							settingsTab.plugin.settings.tabManagerEnabled = value;
							settingsTab.plugin.tabManager.updateTabs();
						}
						settingsTab.plugin.settings.tabManagerEnabled = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);
	}

	new Setting(containerEl)
		.setName(t('SETTING_DEFAULT_FILE_TYPE'))
		.setDesc(t('SETTING_DEFAULT_FILE_TYPE_DESC'))
		.addDropdown((dropdown) => {
			dropdown.addOption('.ask', 'ask for file type');
			settingsTab.plugin.settings.supportedFileTypes.forEach((type) => {
				if (type === '.md' || type === 'md') {
					dropdown.addOption('.md', 'markdown');
				} else {
					dropdown.addOption('.' + type, type);
				}
			});

			if (
				!settingsTab.plugin.settings.supportedFileTypes.includes(
					settingsTab.plugin.settings.folderNoteType.replace('.', ''),
				) &&
				settingsTab.plugin.settings.folderNoteType !== '.ask'
			) {
				settingsTab.plugin.settings.folderNoteType = '.md';
				settingsTab.plugin.saveSettings();
			}

			let defaultType = settingsTab.plugin.settings.folderNoteType.startsWith('.')
				? settingsTab.plugin.settings.folderNoteType
				: '.' + settingsTab.plugin.settings.folderNoteType;
			if (
				!settingsTab.plugin.settings.supportedFileTypes.includes(
					defaultType.replace('.', ''),
				)
			) {
				defaultType = '.ask';
				settingsTab.plugin.settings.folderNoteType = defaultType;
			}

			dropdown
				.setValue(defaultType)
				.onChange(async (value: '.md' | '.canvas') => {
					settingsTab.plugin.settings.folderNoteType = value;
					settingsTab.plugin.saveSettings();
					settingsTab.display();
				});
		});

	const setting0 = new Setting(containerEl);
	setting0.setName(t('SETTING_SUPPORTED_FILE_TYPES'));
	const desc0 = document.createDocumentFragment();
	desc0.append(t('SETTING_SUPPORTED_FILE_TYPES_DESC'));
	setting0.setDesc(desc0);
	const list = new ListComponent(
		setting0.settingEl,
		settingsTab.plugin.settings.supportedFileTypes || [],
		['md', 'canvas'],
	);
	list.on('update', async (values: string[]) => {
		settingsTab.plugin.settings.supportedFileTypes = values;
		await settingsTab.plugin.saveSettings();
		settingsTab.display();
	});

	if (
		!settingsTab.plugin.settings.supportedFileTypes.includes('md') ||
		!settingsTab.plugin.settings.supportedFileTypes.includes('canvas') ||
		!settingsTab.plugin.settings.supportedFileTypes.includes('excalidraw')
	) {
		setting0.addDropdown((dropdown) => {
			const options = [
				{ value: 'md', label: 'Markdown' },
				{ value: 'canvas', label: 'Canvas' },
				{ value: 'base', label: 'Bases' },
				{ value: 'excalidraw', label: 'Excalidraw' },
				{ value: 'custom', label: 'Custom extension' },
			];

			options.forEach((option) => {
				if (!settingsTab.plugin.settings.supportedFileTypes?.includes(option.value)) {
					dropdown.addOption(option.value, option.label);
				}
			});
			dropdown.addOption('+', '+');
			dropdown.setValue('+');
			dropdown.onChange(async (value) => {
				if (value === 'custom') {
					return new AddSupportedFileModal(
						settingsTab.app,
						settingsTab.plugin,
						settingsTab,
						list as ListComponent,
					).open();
				}
				await list.addValue(value.toLowerCase());
				settingsTab.display();
				settingsTab.plugin.saveSettings();
			});
		});
	} else {
		setting0.addButton((button) =>
			button
				.setButtonText(t('BUTTON_ADD_CUSTOM_FILE_TYPE'))
				.setCta()
				.onClick(async () => {
					new AddSupportedFileModal(
						settingsTab.app,
						settingsTab.plugin,
						settingsTab,
						list as ListComponent,
					).open();
				}),
		);
	}


	const templateSetting = new Setting(containerEl)
		.setDesc(t('SETTING_TEMPLATE_PATH_DESC'))
		.setName(t('SETTING_TEMPLATE_PATH'))
		.addSearch((cb) => {
			new TemplateSuggest(cb.inputEl, settingsTab.plugin);
			cb.setPlaceholder(t('SETTING_TEMPLATE_PATH'));
			const templateFile = settingsTab.plugin.app.vault.getAbstractFileByPath(
				settingsTab.plugin.settings.templatePath,
			);
			const templateName = templateFile?.name.replace('.md', '') || '';
			cb.setValue(templateName);
			cb.onChange(async (value) => {
				if (value.trim() === '') {
					settingsTab.plugin.settings.templatePath = '';
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
					return;
				}
			});
		});
	templateSetting.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
	templateSetting.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	const storageLocation = new Setting(containerEl)
		.setName(t('SETTING_STORAGE_LOCATION'))
		.setDesc(t('SETTING_STORAGE_LOCATION_DESC'))
		.addDropdown((dropdown) =>
			dropdown
				.addOption('insideFolder', 'Inside the folder')
				.addOption('parentFolder', 'In the parent folder')
				.setValue(settingsTab.plugin.settings.storageLocation)
				.onChange(async (value: 'insideFolder' | 'parentFolder' | 'vaultFolder') => {
					settingsTab.plugin.settings.storageLocation = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
					refreshAllFolderStyles(undefined, settingsTab.plugin);
				}),
		)
		.addButton((button) =>
			button
				.setButtonText(t('BUTTON_SWITCH'))
				.setCta()
				.onClick(async () => {
					let oldStorageLocation = settingsTab.plugin.settings.storageLocation;
					if (settingsTab.plugin.settings.storageLocation === 'parentFolder') {
						oldStorageLocation = 'insideFolder';
					} else if (settingsTab.plugin.settings.storageLocation === 'insideFolder') {
						oldStorageLocation = 'parentFolder';
					}
					new BackupWarningModal(
						settingsTab.plugin,
						t('MODAL_SWITCH_STORAGE_LOCATION'),
						t('MODAL_SWITCH_STORAGE_LOCATION_DESC'),
						settingsTab.switchStorageLocation,
						[oldStorageLocation],
					).open();
				}),
		);
	storageLocation.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
	storageLocation.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	if (settingsTab.plugin.settings.storageLocation === 'parentFolder') {
		new Setting(containerEl)
			.setName(t('SETTING_SYNC_DELETE'))
			.setDesc(t('SETTING_SYNC_DELETE_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.syncDelete)
					.onChange(async (value) => {
						settingsTab.plugin.settings.syncDelete = value;
						await settingsTab.plugin.saveSettings();
					},
					),
			);
		new Setting(containerEl)
			.setName(t('SETTING_SYNC_MOVE'))
			.setDesc(t('SETTING_SYNC_MOVE_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.syncMove)
					.onChange(async (value) => {
						settingsTab.plugin.settings.syncMove = value;
						await settingsTab.plugin.saveSettings();
					}),
			);
	}
	if (Platform.isDesktopApp) {
		settingsTab.settingsPage.createEl('h3', { text: t('HEADER_KEYBOARD_SHORTCUTS') });

		new Setting(containerEl)
			.setName(t('SETTING_KEY_CREATE_NOTE'))
			.setDesc(t('SETTING_KEY_CREATE_NOTE_DESC'))
			.addDropdown((dropdown) => {
				if (!Platform.isMacOS) {
					dropdown.addOption('ctrl', 'Ctrl + Click');
					dropdown.addOption('alt', 'Alt + Click');
				} else {
					dropdown.addOption('ctrl', 'Cmd + Click');
					dropdown.addOption('alt', 'Option + Click');
				}
				dropdown.setValue(settingsTab.plugin.settings.ctrlKey ? 'ctrl' : 'alt');
				dropdown.onChange(async (value) => {
					settingsTab.plugin.settings.ctrlKey = value === 'ctrl';
					settingsTab.plugin.settings.altKey = value === 'alt';
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				});
			});

		new Setting(containerEl)
			.setName(t('SETTING_KEY_OPEN_NOTE'))
			.setDesc(t('SETTING_KEY_OPEN_NOTE_DESC'))
			.addDropdown((dropdown) => {
				dropdown.addOption('click', 'Mouse Click');
				if (!Platform.isMacOS) {
					dropdown.addOption('ctrl', 'Ctrl + Click');
					dropdown.addOption('alt', 'Alt + Click');
				} else {
					dropdown.addOption('ctrl', 'Cmd + Click');
					dropdown.addOption('alt', 'Option + Click');
				}
				if (settingsTab.plugin.settings.openByClick) {
					dropdown.setValue('click');
				} else if (settingsTab.plugin.settings.openWithCtrl) {
					dropdown.setValue('ctrl');
				} else {
					dropdown.setValue('alt');
				}
				dropdown.onChange(async (value) => {
					settingsTab.plugin.settings.openByClick = value === 'click';
					settingsTab.plugin.settings.openWithCtrl = value === 'ctrl';
					settingsTab.plugin.settings.openWithAlt = value === 'alt';
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				});
			});
	}

	settingsTab.settingsPage.createEl('h3', { text: t('HEADER_FOLDER_NOTE_BEHAVIOR') });

	new Setting(containerEl)
		.setName(t('SETTING_CONFIRM_DELETION'))
		.setDesc(t('SETTING_CONFIRM_DELETION_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.showDeleteConfirmation)
				.onChange(async (value) => {
					settingsTab.plugin.settings.showDeleteConfirmation = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_DELETED_NOTES_ACTION'))
		.setDesc(t('SETTING_DELETED_NOTES_ACTION_DESC'))
		.addDropdown((dropdown) => {
			dropdown.addOption('trash', 'Move to system trash');
			dropdown.addOption('obsidianTrash', 'Move to Obsidian trash (.trash folder)');
			dropdown.addOption('delete', 'Delete permanently');
			dropdown.setValue(settingsTab.plugin.settings.deleteFilesAction);
			dropdown.onChange(async (value: 'trash' | 'delete' | 'obsidianTrash') => {
				settingsTab.plugin.settings.deleteFilesAction = value;
				await settingsTab.plugin.saveSettings();
				settingsTab.display();
			});
		});

	if (Platform.isDesktop) {
		const setting3 = new Setting(containerEl);
		setting3.setName(t('SETTING_OPEN_IN_NEW_TAB'));
		setting3.setDesc(t('SETTING_OPEN_IN_NEW_TAB_DESC'));
		setting3.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.openInNewTab)
				.onChange(async (value) => {
					settingsTab.plugin.settings.openInNewTab = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);
		setting3.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
		setting3.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';
	}

	if (settingsTab.plugin.settings.openInNewTab) {
		new Setting(containerEl)
			.setName(t('SETTING_FOCUS_EXISTING_TAB'))
			.setDesc(t('SETTING_FOCUS_EXISTING_TAB_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.focusExistingTab)
					.onChange(async (value) => {
						settingsTab.plugin.settings.focusExistingTab = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);
	}

	new Setting(containerEl)
		.setName(t('SETTING_SYNC_FOLDER_NAME'))
		.setDesc(t('SETTING_SYNC_FOLDER_NAME_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.syncFolderName)
				.onChange(async (value) => {
					settingsTab.plugin.settings.syncFolderName = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	settingsTab.settingsPage.createEl('h4', { text: t('HEADER_AUTOMATION_SETTINGS') });

	new Setting(containerEl)
		.setName(t('SETTING_CREATE_FOR_ALL'))
		.setDesc(t('SETTING_CREATE_FOR_ALL_DESC'))
		.addButton((cb) => {
			cb.setIcon('plus');
			cb.setTooltip(t('TOOLTIP_CREATE_NOTES'));
			cb.onClick(async () => {
				new ConfirmationModal(settingsTab.app, settingsTab.plugin).open();
			});
		});

	new Setting(containerEl)
		.setName(t('SETTING_AUTO_CREATE'))
		.setDesc(t('SETTING_AUTO_CREATE_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.autoCreate)
				.onChange(async (value) => {
					settingsTab.plugin.settings.autoCreate = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	if (settingsTab.plugin.settings.autoCreate) {
		new Setting(containerEl)
			.setName(t('SETTING_AUTO_OPEN'))
			.setDesc(t('SETTING_AUTO_OPEN_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.autoCreateFocusFiles)
					.onChange(async (value) => {
						settingsTab.plugin.settings.autoCreateFocusFiles = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);

		new Setting(containerEl)
			.setName(t('SETTING_AUTO_CREATE_ATTACHMENTS'))
			.setDesc(t('SETTING_AUTO_CREATE_ATTACHMENTS_DESC'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.autoCreateForAttachmentFolder)
					.onChange(async (value) => {
						settingsTab.plugin.settings.autoCreateForAttachmentFolder = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);
	}

	new Setting(containerEl)
		.setName(t('SETTING_AUTO_CREATE_FOR_FILES'))
		.setDesc(t('SETTING_AUTO_CREATE_FOR_FILES_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.autoCreateForFiles)
				.onChange(async (value) => {
					settingsTab.plugin.settings.autoCreateForFiles = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	settingsTab.settingsPage.createEl('h3', { text: t('HEADER_INTEGRATION_COMPATIBILITY') });

	const desc1 = document.createDocumentFragment();

	const link = document.createElement('a');
	link.href = 'https://github.com/snezhig/obsidian-front-matter-title';
	link.textContent = 'front matter title plugin';
	link.target = '_blank';

	desc1.append(
		'Allows you to use the ',
		link,
		' with folder notes. It allows you to set the folder name to some name you set in the front matter.',
	);

	const fmtpSetting = new Setting(containerEl)
		.setName(t('SETTING_FMTP_INTEGRATION'))
		.setDesc(t('SETTING_FMTP_INTEGRATION_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.frontMatterTitle.enabled)
				.onChange(async (value) => {
					settingsTab.plugin.settings.frontMatterTitle.enabled = value;
					await settingsTab.plugin.saveSettings();
					if (value) {
						settingsTab.plugin.fmtpHandler =
							new FrontMatterTitlePluginHandler(settingsTab.plugin);
					} else {
						if (settingsTab.plugin.fmtpHandler) {
							settingsTab.plugin.updateAllBreadcrumbs(true);
						}
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
						settingsTab.plugin.fmtpHandler?.deleteEvent();
						settingsTab.plugin.fmtpHandler =
							new FrontMatterTitlePluginHandler(settingsTab.plugin);
					}
					settingsTab.display();
				}),
		);
	fmtpSetting.infoEl.appendText(t('RESTART_TO_TAKE_EFFECT'));
	fmtpSetting.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	settingsTab.settingsPage.createEl('h3', { text: t('HEADER_SESSION_PERSISTENCE') });

	new Setting(containerEl)
		.setName(t('SETTING_PERSIST_AFTER_RESTART'))
		.setDesc(t('SETTING_PERSIST_AFTER_RESTART_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.persistentSettingsTab.afterRestart)
				.onChange(async (value) => {
					settingsTab.plugin.settings.persistentSettingsTab.afterRestart = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	new Setting(containerEl)
		.setName(t('SETTING_PERSIST_SESSION_ONLY'))
		.setDesc(t('SETTING_PERSIST_SESSION_ONLY_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.persistentSettingsTab.afterChangingTab)
				.onChange(async (value) => {
					settingsTab.plugin.settings.persistentSettingsTab.afterChangingTab = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);
}
