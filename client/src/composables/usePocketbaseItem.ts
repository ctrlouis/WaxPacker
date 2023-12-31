import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordListOptions, RecordModel } from 'pocketbase';

export function usePocketbaseItem(collectionName: string) {

    const authentication = useAuthentication();

    const item = ref<RecordModel>();

    async function get(id: string, options: RecordListOptions ={}) {
        const record = await authentication.pb.collection(collectionName).getOne(id, options);
        return record;
    }

    async function sync(id: string, options: RecordListOptions ={}) {
        item.value = await get(id, options);
    }

    async function create(data: {}) {
        const record = await authentication.pb.collection(collectionName).create(data);
        return record;
    }

    async function update(data: {}, id: string|null =null) {
        let itemID: string;
        if (id) {
            itemID = id;
        } else if (item.value) {
            itemID = item.value.id;
        } else {
            throw new Error("No ID provided for update");
        }
        const record = await authentication.pb.collection(collectionName).update(itemID, data);
        return record;
    }

    async function remove(id: string) {
        await authentication.pb.collection(collectionName).delete(id);
    }

    return {
        item,
        get,
        sync,
        create,
        update,
        remove,
    }
}