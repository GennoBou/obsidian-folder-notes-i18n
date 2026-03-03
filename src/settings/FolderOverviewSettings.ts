import { Setting } from 'obsidian';
import { t } from '../lang/helpers';
import type { SettingsTab } from './SettingsTab';
import { createOverviewSettings } from 'src/obsidian-folder-overview/src/settings';

export async function renderFolderOverview(settingsTab: SettingsTab): Promise<void> {
	const { plugin } = settingsTab;
	const defaultOverviewSettings = plugin.settings.defaultOverview;
	const containerEl = settingsTab.settingsPage;

	containerEl.createEl('h3', { text: t('HEADER_GLOBAL_SETTINGS') });
	new Setting(containerEl)
		.setName(t('SETTING_AUTO_UPDATE_LINKS'))
		// eslint-disable-next-line max-len
		.setDesc(t('SETTING_AUTO_UPDATE_LINKS_DESC'))
		.addToggle((toggle) =>
			toggle
				.setValue(plugin.settings.fvGlobalSettings.autoUpdateLinks)
				.onChange(async (value) => {
					plugin.settings.fvGlobalSettings.autoUpdateLinks = value;
					await plugin.saveSettings();
					if (value) {
						plugin.fvIndexDB.init(true);
					} else {
						plugin.fvIndexDB.active = false;
					}
				}),
		);

	containerEl.createEl('h3', { text: t('HEADER_OVERVIEWS_DEFAULT') });
	const pEl = containerEl.createEl('p', {
		text: t('DESC_EDIT_DEFAULT_SETTINGS'),
		cls: 'setting-item-description',
	});
	const span = createSpan({ text: t('DESC_WONT_APPLY_EXISTING'), cls: '' });
	const accentColor = (settingsTab.app.vault.getConfig('accentColor') as string) || '#7d5bed';
	span.setAttr('style', `color: ${accentColor};`);
	pEl.appendChild(span);

	createOverviewSettings(
		containerEl,
		defaultOverviewSettings,
		plugin,
		plugin.settings.defaultOverview,
		settingsTab.display,
		undefined,
		undefined,
		undefined,
		settingsTab,
	);
}
