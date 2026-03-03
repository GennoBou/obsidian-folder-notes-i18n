import {
	addExcludeFolderListItem,
	addExcludedFolder,
} from 'src/ExcludeFolders/functions/folderFunctions';
import { ExcludedFolder } from 'src/ExcludeFolders/ExcludeFolder';
import { addExcludePatternListItem } from 'src/ExcludeFolders/functions/patternFunctions';
import { Setting } from 'obsidian';
import { t } from '../lang/helpers';
import type { SettingsTab } from './SettingsTab';
import ExcludedFolderSettings from 'src/ExcludeFolders/modals/ExcludeFolderSettings';
import PatternSettings from 'src/ExcludeFolders/modals/PatternSettings';
import WhitelistedFoldersSettings from 'src/ExcludeFolders/modals/WhitelistedFoldersSettings';
// import ExcludedFoldersWhitelist from 'src/ExcludeFolders/modals/WhitelistModal';

export async function renderExcludeFolders(settingsTab: SettingsTab): Promise<void> {
	const containerEl = settingsTab.settingsPage;
	const manageExcluded = new Setting(containerEl)
		.setHeading()
		.setClass('fn-excluded-folder-heading')
		.setName(t('HEADER_MANAGE_EXCLUDED'));
	const desc3 = document.createDocumentFragment();
	const descParts = t('DESC_EXCLUDED_FOLDERS').split('<br>');
	descParts.forEach((part, index) => {
		desc3.append(part);
		if (index < descParts.length - 1) {
			desc3.createEl('br');
		}
	});
	manageExcluded.setDesc(desc3);
	// eslint-disable-next-line max-len
	manageExcluded.infoEl.appendText(t('INFO_REGEX_WILDCARDS'));
	manageExcluded.infoEl.createEl('br');
	// eslint-disable-next-line max-len
	manageExcluded.infoEl.appendText(t('INFO_SWITCH_PATH'));
	// eslint-disable-next-line max-len
	manageExcluded.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';


	new Setting(containerEl)
		.setName(t('SETTING_WHITELISTED_FOLDERS'))
		.setDesc(t('SETTING_WHITELISTED_FOLDERS_DESC'))
		.addButton((cb) => {
			cb.setButtonText(t('BUTTON_MANAGE'));
			cb.setCta();
			cb.onClick(async () => {
				new WhitelistedFoldersSettings(settingsTab).open();
			});
		});

	new Setting(containerEl)
		.setName(t('SETTING_EXCLUDE_FOLDER_DEFAULT'))
		.addButton((cb) => {
			cb.setButtonText(t('BUTTON_MANAGE'));
			cb.setCta();
			cb.onClick(async () => {
				new ExcludedFolderSettings(
					settingsTab.app,
					settingsTab.plugin,
					settingsTab.plugin.settings.excludeFolderDefaultSettings,
				).open();
			});
		});

	new Setting(containerEl)
		.setName(t('SETTING_EXCLUDE_PATTERN_DEFAULT'))
		.addButton((cb) => {
			cb.setButtonText(t('BUTTON_MANAGE'));
			cb.setCta();
			cb.onClick(async () => {
				new PatternSettings(
					settingsTab.app,
					settingsTab.plugin,
					settingsTab.plugin.settings.excludePatternDefaultSettings,
				).open();
			});
		});


	new Setting(containerEl)
		.setName(t('SETTING_ADD_EXCLUDED_FOLDER'))
		.setClass('add-exclude-folder-item')
		.addButton((cb) => {
			cb.setIcon('plus');
			cb.setClass('add-exclude-folder');
			cb.setTooltip(t('TOOLTIP_ADD_EXCLUDED_FOLDER'));
			cb.onClick(() => {
				const excludedFolder = new ExcludedFolder(
					'',
					settingsTab.plugin.settings.excludeFolders.length,
					undefined,
					settingsTab.plugin,
				);
				addExcludeFolderListItem(settingsTab, containerEl, excludedFolder);
				addExcludedFolder(settingsTab.plugin, excludedFolder);
				settingsTab.renderSettingsPage(settingsTab.plugin.settings.settingsTab);
			});
		});

	settingsTab.plugin.settings.excludeFolders
		.filter((folder) => !folder.hideInSettings)
		.sort((a, b) => a.position - b.position)
		.forEach((excludedFolder) => {
			if (
				excludedFolder.string?.trim() !== '' &&
				excludedFolder.path?.trim() === ''
			) {
				addExcludePatternListItem(settingsTab, containerEl, excludedFolder);
			} else {
				addExcludeFolderListItem(settingsTab, containerEl, excludedFolder);
			}
		});
}
