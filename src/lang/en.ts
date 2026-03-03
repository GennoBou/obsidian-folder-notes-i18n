const en = {
	// Settings Tab Names
	SETTINGS_TAB_GENERAL: 'General',
	SETTINGS_TAB_FOLDER_OVERVIEW: 'Folder overview',
	SETTINGS_TAB_EXCLUDE_FOLDERS: 'Exclude folders',
	SETTINGS_TAB_FILE_EXPLORER: 'File explorer',
	SETTINGS_TAB_PATH: 'Path',

	// Settings Tab Messages
	START_UPDATING_FOLDER_NOTES: 'Starting to update folder notes...',
	FINISHED_UPDATING_FOLDER_NOTES: 'Finished updating folder notes',
	START_SWITCHING_STORAGE_LOCATION: 'Starting to switch storage location...',
	FINISHED_SWITCHING_STORAGE_LOCATION: 'Finished switching storage location',

	// General Settings
	RESTART_TO_TAKE_EFFECT: 'Requires a restart to take effect',
	CONFIRM: 'Confirm',
	CANCEL: 'Cancel',
	RENAME_ALL_EXISTING_NOTES: 'Rename all existing folder notes',
	RENAME_ALL_EXISTING_NOTES_DESC: 'When you click on "Confirm" all existing folder notes will be renamed to the new folder note name.',

	// Setting Names - General
	SETTING_FOLDER_NOTE_NAME_TEMPLATE: 'Folder note name template',
	SETTING_FOLDER_NOTE_NAME_TEMPLATE_DESC: 'All folder notes will use this name. Use {{folder_name}} to insert the folder’s name. Existing notes won’t update automatically; click on the button to apply the new name.',
	BUTTON_RENAME_EXISTING_NOTES: 'Rename existing folder notes',
	
	SETTING_TAB_MANAGER: 'Display Folder Name in Tab Title',
	SETTING_TAB_MANAGER_DESC: 'Use the actual folder name in the tab title instead of the custom folder note name (e.g., "Folder Note").',

	SETTING_DEFAULT_FILE_TYPE: 'Default file type for new folder notes',
	SETTING_DEFAULT_FILE_TYPE_DESC: 'Choose the default file type (canvas, markdown, ...) used when creating new folder notes.',
	
	SETTING_SUPPORTED_FILE_TYPES: 'Supported file types',
	SETTING_SUPPORTED_FILE_TYPES_DESC: 'Specify which file types are allowed as folder notes. Applies to both new and existing folders. Adding many types may affect performance.',
	BUTTON_ADD_CUSTOM_FILE_TYPE: 'Add custom file type',

	SETTING_TEMPLATE_PATH: 'Template path',
	SETTING_TEMPLATE_PATH_DESC: 'Can be used with templater/templates plugin. If you add the location of the templates there.',
	
	SETTING_STORAGE_LOCATION: 'Storage location',
	SETTING_STORAGE_LOCATION_DESC: 'Choose where to store the folder notes',
	BUTTON_SWITCH: 'Switch',
	MODAL_SWITCH_STORAGE_LOCATION: 'Switch storage location',
	MODAL_SWITCH_STORAGE_LOCATION_DESC: 'When you click on "Confirm" all folder notes will be moved to the new storage location.',

	SETTING_SYNC_DELETE: 'Delete folder notes when deleting the folder',
	SETTING_SYNC_DELETE_DESC: 'Delete the folder note when deleting the folder',
	SETTING_SYNC_MOVE: 'Move folder notes when moving the folder',
	SETTING_SYNC_MOVE_DESC: 'Move the folder note file along with the folder when it is moved',

	// Keyboard Shortcuts
	HEADER_KEYBOARD_SHORTCUTS: 'Keyboard Shortcuts',
	SETTING_KEY_CREATE_NOTE: 'Key for creating folder note',
	SETTING_KEY_CREATE_NOTE_DESC: 'The key combination to create a folder note',
	SETTING_KEY_OPEN_NOTE: 'Key for opening folder note',
	SETTING_KEY_OPEN_NOTE_DESC: 'Select the combination to open a folder note',

	// Behavior
	HEADER_FOLDER_NOTE_BEHAVIOR: 'Folder note behavior',
	SETTING_CONFIRM_DELETION: 'Confirm folder note deletion',
	SETTING_CONFIRM_DELETION_DESC: 'Ask for confirmation before deleting a folder note',
	SETTING_DELETED_NOTES_ACTION: 'Deleted folder notes',
	SETTING_DELETED_NOTES_ACTION_DESC: 'What happens to the folder note after you delete it',
	
	SETTING_OPEN_IN_NEW_TAB: 'Open folder note in a new tab by default',
	SETTING_OPEN_IN_NEW_TAB_DESC: 'Always open folder notes in a new tab unless the note is already open in the current tab.',
	SETTING_FOCUS_EXISTING_TAB: 'Focus existing tab instead of creating a new one',
	SETTING_FOCUS_EXISTING_TAB_DESC: 'If a folder note is already open in a tab, focus that tab instead of creating a new one.',
	SETTING_SYNC_FOLDER_NAME: 'Sync folder name',
	SETTING_SYNC_FOLDER_NAME_DESC: 'Automatically rename the folder note when the folder name is changed',

	// Automation
	HEADER_AUTOMATION_SETTINGS: 'Automation settings',
	SETTING_CREATE_FOR_ALL: 'Create folder notes for all folders',
	SETTING_CREATE_FOR_ALL_DESC: 'Generate folder notes for every folder in the vault.',
	TOOLTIP_CREATE_NOTES: 'Create folder notes',
	
	SETTING_AUTO_CREATE: 'Auto-create on folder creation',
	SETTING_AUTO_CREATE_DESC: 'Automatically create a folder note whenever a new folder is added.',
	SETTING_AUTO_OPEN: 'Auto-open after creation',
	SETTING_AUTO_OPEN_DESC: 'Open the folder note immediately after it’s created automatically.',
	SETTING_AUTO_CREATE_ATTACHMENTS: 'Auto-create for attachment folders',
	SETTING_AUTO_CREATE_ATTACHMENTS_DESC: 'Also automatically create folder notes for attachment folders (e.g., "Attachments", "Media", etc.).',
	SETTING_AUTO_CREATE_FOR_FILES: 'Auto-create when creating notes',
	SETTING_AUTO_CREATE_FOR_FILES_DESC: 'Automatically create a folder note when a regular note is created inside a folder. Works for supported file types only.',

	// Integration
	HEADER_INTEGRATION_COMPATIBILITY: 'Integration & Compatibility',
	SETTING_FMTP_INTEGRATION: 'Enable front matter title plugin integration',
	SETTING_FMTP_INTEGRATION_DESC: 'Allows you to use the front matter title plugin with folder notes. It allows you to set the folder name to some name you set in the front matter.',

	// Persistence
	HEADER_SESSION_PERSISTENCE: 'Session & Persistence',
	SETTING_PERSIST_AFTER_RESTART: 'Persist tab after restart',
	SETTING_PERSIST_AFTER_RESTART_DESC: 'Restore the same settings tab after restarting Obsidian.',
	SETTING_PERSIST_SESSION_ONLY: 'Persist tab during session only',
	SETTING_PERSIST_SESSION_ONLY_DESC: 'Keep the current settings tab open during the session, but reset it after a restart or reload.',

	// File Explorer Settings
	SETTING_HIDE_FOLDER_NOTE: 'Hide folder notes',
	SETTING_HIDE_FOLDER_NOTE_DESC: 'Hide the folder note file from appearing in the file explorer',
	SETTING_DISABLE_CLICK_MOBILE: 'Disable click-to-open folder note on mobile',
	SETTING_DISABLE_CLICK_MOBILE_DESC: 'Prevents folder notes from opening when tapping the folder name or surrounding area on mobile devices. They can now only be opened via the context menu or a command.',
	SETTING_OPEN_DIRECTLY_ONLY: 'Open folder notes by only clicking directly on the folder name',
	SETTING_OPEN_DIRECTLY_ONLY_DESC: 'Only allow folder notes to open when clicking directly on the folder name in the file explorer',
	SETTING_DISABLE_COLLAPSING: 'Disable folder collapsing',
	SETTING_DISABLE_COLLAPSING_DESC: 'When enabled, folders in the file explorer will only collapse when clicking the collapse icon next to the folder name, not when clicking near a folder name when it has a folder note.',
	SETTING_USE_SUBMENUS: 'Use submenus',
	SETTING_USE_SUBMENUS_DESC: 'Use submenus for file/folder commands',
	SETTING_AUTO_UPDATE_EXPLORER: 'Auto update folder name in the file explorer (front matter title plugin only)',
	SETTING_AUTO_UPDATE_EXPLORER_DESC: 'Automatically update the folder name in the file explorer when the front matter title plugin is enabled and the title for a folder note is changed in the front matter. This will not change the file name, only the displayed name in the file explorer.',
	SETTING_HIGHLIGHT_FOLDER_EXPLORER: 'Highlight folder in the file explorer',
	SETTING_HIGHLIGHT_FOLDER_EXPLORER_DESC: 'Highlight the folder in the file explorer when it has a folder note and the folder note is open in the editor',
	SETTING_HIDE_COLLAPSE_ICON: 'Hide collapse icon',
	SETTING_HIDE_COLLAPSE_ICON_DESC: 'Hide the collapse icon in the file explorer next to the name of a folder when a folder only contains a folder note',
	SETTING_HIDE_COLLAPSE_ICON_EVERY: 'Hide collapse icon for every empty folder',
	SETTING_HIDE_COLLAPSE_ICON_EVERY_DESC: 'Hide the collapse icon in the file explorer next to the name of a folder when a folder is empty',
	SETTING_IGNORE_ATTACHMENT_FOLDER: 'Hide collapse icon also when only the attachment folder is in the same folder',
	SETTING_UNDERLINE_FOLDER_EXPLORER: 'Underline the name of folder notes',
	SETTING_UNDERLINE_FOLDER_EXPLORER_DESC: 'Add an underline to folders that have a folder note in the file explorer',
	SETTING_BOLD_FOLDER_EXPLORER: 'Bold the name of folder notes',
	SETTING_BOLD_FOLDER_EXPLORER_DESC: 'Make the folder name bold in the file explorer when it has a folder note',
	SETTING_CURSIVE_FOLDER_EXPLORER: 'Cursive the name of folder notes',
	SETTING_CURSIVE_FOLDER_EXPLORER_DESC: 'Make the folder name cursive in the file explorer when it has a folder note',

	// Path Settings
	SETTING_OPEN_THROUGH_PATH: 'Open folder note through path',
	SETTING_OPEN_THROUGH_PATH_DESC: 'Open a folder note when clicking on a folder name in the path if it is a folder note',
	SETTING_OPEN_SIDEBAR_MOBILE: 'Open sidebar when opening a folder note through path (Mobile only)',
	SETTING_OPEN_SIDEBAR_MOBILE_DESC: 'Open the sidebar when opening a folder note through the path on mobile',
	SETTING_OPEN_SIDEBAR_DESKTOP: 'Open sidebar when opening a folder note through path (Desktop only)',
	SETTING_OPEN_SIDEBAR_DESKTOP_DESC: 'Open the sidebar when opening a folder note through the path on desktop',
	SETTING_AUTO_UPDATE_PATH: 'Auto update folder name in the path (front matter title plugin only)',
	SETTING_AUTO_UPDATE_PATH_DESC: 'Automatically update the folder name in the path when the front matter title plugin is enabled and the title for a folder note is changed in the front matter. This will not change the file name, only the displayed name in the path.',
	HEADER_STYLE_SETTINGS: 'Style settings',
	SETTING_UNDERLINE_PATH: 'Underline folders in the path',
	SETTING_UNDERLINE_PATH_DESC: 'Add an underline to folders that have a folder note in the path above a note',
	SETTING_BOLD_PATH: 'Bold folders in the path',
	SETTING_BOLD_PATH_DESC: 'Make the folder name bold in the path above a note when it has a folder note',
	SETTING_CURSIVE_PATH: 'Cursive the name of folder notes in the path',
	SETTING_CURSIVE_PATH_DESC: 'Make the folder name cursive in the path above a note when it has a folder note',

	// Exclude Folders Settings
	HEADER_MANAGE_EXCLUDED: 'Manage excluded folders',
	DESC_EXCLUDED_FOLDERS: 'Add {regex} at the beginning of the folder name to use a regex pattern.<br>Use * before and after to exclude folders that include the name between the *s.<br>Use * before the folder name to exclude folders that end with the folder name.<br>Use * after the folder name to exclude folders that start with the folder name.',
	INFO_REGEX_WILDCARDS: 'The regexes and wildcards are only for the folder name, not the path.',
	INFO_SWITCH_PATH: 'If you want to switch to a folder path delete the pattern first.',
	SETTING_WHITELISTED_FOLDERS: 'Whitelisted folders',
	SETTING_WHITELISTED_FOLDERS_DESC: 'Folders that override the excluded folders/patterns',
	BUTTON_MANAGE: 'Manage',
	SETTING_EXCLUDE_FOLDER_DEFAULT: 'Exclude folder default settings',
	SETTING_EXCLUDE_PATTERN_DEFAULT: 'Exclude pattern default settings',
	SETTING_ADD_EXCLUDED_FOLDER: 'Add excluded folder',
	TOOLTIP_ADD_EXCLUDED_FOLDER: 'Add excluded folder',

	// Folder Overview Settings
	HEADER_GLOBAL_SETTINGS: 'Global settings',
	SETTING_AUTO_UPDATE_LINKS: 'Auto-update links without opening the overview',
	SETTING_AUTO_UPDATE_LINKS_DESC: 'If enabled, the links that appear in the graph view will be updated even when you don\'t have the overview open somewhere.',
	HEADER_OVERVIEWS_DEFAULT: 'Overviews default settings',
	DESC_EDIT_DEFAULT_SETTINGS: 'Edit the default settings for new folder overviews, ',
	DESC_WONT_APPLY_EXISTING: "this won't apply to already existing overviews.",

	// Commands
	COMMAND_TURN_INTO_FOLDER_NOTE: 'Use this file as the folder note for its parent folder',
	COMMAND_CREATE_FOLDER_WITH_NOTE: 'Make a folder with this file as its folder note',
	COMMAND_CREATE_MD_NOTE_CURRENT: 'Create markdown folder note for this folder',
	COMMAND_CREATE_TYPE_NOTE_CURRENT: 'Create {{type}} folder note for this folder',
	COMMAND_CREATE_TYPE_NOTE_ACTIVE: 'Create {{type}} folder note for current active folder in file explorer',
	COMMAND_DELETE_LINKED_NOTE: 'Delete this folder\'s linked note',
	COMMAND_DELETE_LINKED_NOTE_ACTIVE: 'Delete folder note of current active folder in file explorer',
	COMMAND_OPEN_LINKED_NOTE: 'Open this folder\'s linked note',
	COMMAND_OPEN_LINKED_NOTE_ACTIVE: 'Open folder note of current active folder in file explorer',
	COMMAND_CREATE_FROM_SELECTION: 'Create folder note from selection',

	// Menu Items
	MENU_CREATE_FOLDER_NOTE: 'Create folder note',
	MENU_TURN_INTO_FOLDER_NOTE: 'Turn into folder note for {{folder}}',
	MENU_REMOVE_EXCLUDED: 'Remove folder from excluded folders',
	MENU_REMOVE_DETACHED: 'Remove folder from detached folders',
	MENU_EXCLUDE_FOLDER: 'Exclude folder from folder notes',
	MENU_DELETE_FOLDER_NOTE: 'Delete folder note',
	MENU_OPEN_FOLDER_NOTE: 'Open folder note',
	MENU_DETACH_FOLDER_NOTE: 'Detach folder note',
	MENU_COPY_URL: 'Copy Obsidian URL',
	MENU_HIDE_IN_EXPLORER: 'Hide folder note in explorer',
	MENU_SHOW_IN_EXPLORER: 'Show folder note in explorer',
	MENU_CREATE_MD_NOTE: 'Create markdown folder note',
	MENU_CREATE_TYPE_NOTE: 'Create {{type}} folder note',
	MENU_FOLDER_NOTE_COMMANDS: 'Folder Note Commands',

	// Notices & Errors
	NOTICE_FOLDER_ALREADY_EXISTS: 'Folder already exists',
	NOTICE_FILE_ALREADY_EXISTS: 'File already exists',
	NOTICE_NOTE_ALREADY_EXISTS: 'Folder note already exists',
	NOTICE_INVALID_CHARS: 'File name cannot contain any of the following characters: * " \\ / < > : | ?',
	NOTICE_END_WITH_DOT: 'File name cannot end with a dot',
	NOTICE_REMOVED_FROM_EXCLUDED: 'Successfully removed folder from excluded folders',
	NOTICE_EXCLUDED_SUCCESS: 'Successfully excluded folder from folder notes',
	ERROR_CREATING_OVERVIEW: 'Error creating folder overview (folder notes plugin) - check console for more details',
	NOTICE_EXTENSION_ALREADY_SUPPORTED: 'This extension is already supported',
	NOTICE_CHOOSE_EXTENSION: 'Please choose a file extension',
	NOTICE_SAME_NAME_EXISTS: 'A folder with the same name already exists',

	// Modals - Delete Confirmation
	MODAL_TITLE_DELETE_NOTE: 'Delete folder note',
	MODAL_CONFIRM_DELETE_NOTE: "Are you sure you want to delete the folder note '{{file}}' ?",
	MODAL_TRASH_SYSTEM: 'It will be moved to your system trash.',
	MODAL_TRASH_OBSIDIAN: 'It will be moved to your Obsidian trash, which is located in the ".trash" hidden folder in your vault.',
	MODAL_DELETE_PERMANENT: 'It will be permanently deleted.',
	BUTTON_DONT_ASK_AGAIN: "Don't ask again",
	BUTTON_DELETE_DONT_ASK_AGAIN: "Delete and don't ask again",
	BUTTON_DELETE: 'Delete',

	// Modals - Folder Name
	MODAL_TITLE_FOLDER_NAME: 'Folder name',
	MODAL_TITLE_FOLDER_TITLE: 'Folder title',
	PLACEHOLDER_ENTER_FOLDER_NAME: 'Enter the name of the folder',
	BUTTON_SAVE: 'Save',
	BUTTON_RENAME: 'Rename',
	BUTTON_RENAME_DONT_ASK: 'Rename and don\'t ask again',

	// Modals - Existing Note
	MODAL_TITLE_NOTE_EXISTS: 'A folder note for this folder already exists',
	MODAL_CONFIRM_TURN_AND_RENAME: 'Are you sure you want to turn the note into a folder note and rename the existing folder note?',

	// Modals - Add Supported File Type
	MODAL_TITLE_EXTENSION_NAME: 'Extension name',
	SETTING_EXTENSION_NAME: 'Enter the name of the extension (only the short form, e.g. "md")',

	// Modals - Backup & Confirmation
	HEADER_BACKUP_VAULT: 'Make sure to backup your vault before using this feature.',
	BUTTON_CREATE: 'Create',
	HEADER_CREATE_FOR_EVERY: 'Create folder note for every folder',
	INFO_CREATE_FOR_EVERY: 'This feature will create a folder note for every folder in your vault.',
	INFO_ALREADY_HAS_NOTE_IGNORED: 'Every folder that already has a folder note will be ignored.',
	INFO_EXCLUDED_IGNORED: 'Every excluded folder will be ignored.',
	SETTING_EXTENSION_CHOICE: 'Folder note file extension',
	SETTING_EXTENSION_CHOICE_DESC: 'Choose the file extension for the folder notes.',

	// Modals - Excluded Folder Settings
	MODAL_TITLE_EXCLUDED_FOLDER: 'Excluded folder settings',
	SETTING_INCLUDE_SUBFOLDERS: 'Include subfolders',
	SETTING_INCLUDE_SUBFOLDERS_DESC: 'Choose if the subfolders of the folder should also be excluded',
	SETTING_DISABLE_SYNC: 'Disable folder name sync',
	SETTING_DISABLE_SYNC_DESC: 'Choose if the folder note should be renamed when the folder name is changed',
	SETTING_DONT_SHOW_OVERVIEW: "Don't show folder in folder overview",
	SETTING_DONT_SHOW_OVERVIEW_DESC: 'Choose if the folder should be shown in the folder overview',
	SETTING_SHOW_IN_EXPLORER: 'Show folder note in the file explorer',
	SETTING_SHOW_IN_EXPLORER_DESC: 'Choose if the folder note should be shown in the file explorer',
	SETTING_DISABLE_AUTO_CREATE: 'Disable auto creation of folder notes in this folder',
	SETTING_DISABLE_AUTO_CREATE_DESC: 'Choose if a folder note should be created when a new folder is created',
	SETTING_DISABLE_OPEN_NOTE: 'Disable open folder note',
	SETTING_DISABLE_OPEN_NOTE_DESC: 'Choose if the folder note should be opened when the folder is opened',
	SETTING_COLLAPSE_OPEN: 'Collapse folder when opening folder note',
	SETTING_COLLAPSE_OPEN_DESC: 'Choose if the folder should be collapsed when the folder note is opened',

	// Modals - Whitelist Folder Settings
	MODAL_TITLE_WHITELISTED_FOLDER: 'Whitelisted folder settings',
	SETTING_INCLUDE_SUBFOLDERS_WHITELIST_DESC: 'Choose if the subfolders of the folder should also be whitelisted',
	SETTING_ENABLE_SYNC: 'Enable folder name sync',
	SETTING_ENABLE_SYNC_DESC: 'Choose if the name of a folder note should be renamed when the folder name is changed',
	SETTING_HIDE_IN_EXPLORER: 'Hide folder note in file explorer',
	SETTING_HIDE_IN_EXPLORER_DESC: 'Choose if the folder note should be hidden in the file explorer',
	SETTING_ALLOW_AUTO_CREATE: 'Allow auto creation of folder notes in this folder',
	SETTING_OPEN_ON_CLICK: 'Open folder note when clicking on the folder',
	SETTING_OPEN_ON_CLICK_DESC: 'Choose if the folder note should be opened when the folder is opened',
	SETTING_DONT_COLLAPSE: 'Don\'t collapse folder when opening folder note',
	SETTING_DONT_COLLAPSE_DESC: 'Choose if the folder should be collapsed when the folder note is opened',

	// Modals - Whitelist Pattern Settings
	MODAL_TITLE_WHITELISTED_PATTERN: 'Whitelisted pattern settings',
	SETTING_OPEN_ON_CLICK_PATTERN_DESC: 'Choose if the folder note should be opened when you click on the folder',

	// Modals - Pattern Settings
	MODAL_TITLE_PATTERN_SETTINGS: 'Pattern settings',
	SETTING_DISABLE_SYNC_PATTERN_DESC: 'Choose if the folder name should be renamed when the file name has been changed',
	SETTING_DISABLE_AUTO_CREATE_PATTERN_DESC: 'Choose if a folder note should be created when a new folder is created that matches this pattern',

	// Modals - Whitelisted Folders
	MODAL_TITLE_MANAGE_WHITELISTED: 'Manage whitelisted folders',
	SETTING_ADD_WHITELISTED: 'Add whitelisted folder',
	TOOLTIP_ADD_WHITELISTED: 'Add whitelisted folder',

	// Modals - Rename Folder Notes
	SETTING_OLD_FOLDER_NOTE_NAME: 'Old Folder Note Name',
	SETTING_OLD_FOLDER_NOTE_NAME_DESC: 'Every folder note that matches this name will be renamed to the new folder note name.',
	PLACEHOLDER_ENTER_OLD_NAME: 'Enter the old folder note name',
	SETTING_NEW_FOLDER_NOTE_NAME: 'New Folder Note Name',
	SETTING_NEW_FOLDER_NOTE_NAME_DESC: 'Every folder note that matches the old folder note name will be renamed to this name.',
	PLACEHOLDER_ENTER_NEW_NAME: 'Enter the new folder note name',

	// List Component & Functions
	PLACEHOLDER_PATTERN: 'Pattern',
	PLACEHOLDER_FOLDER_PATH: 'Folder path',
	TOOLTIP_EDIT_PATTERN: 'Edit pattern',
	TOOLTIP_EDIT_FOLDER_NOTE: 'Edit folder note',
	TOOLTIP_MOVE_UP: 'Move up',
	TOOLTIP_MOVE_DOWN: 'Move down',
	TOOLTIP_DELETE_PATTERN: 'Delete pattern',
	TOOLTIP_DELETE_EXCLUDED: 'Delete excluded folder',
};

export default en;
