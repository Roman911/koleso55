import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';

// Helper function to update local storage
export const updateStorage = (storageKey: string, id: number, section: string, shouldRemove: boolean) => {
	if(shouldRemove) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [ ...storage, { id, section } ]);
	}
};
