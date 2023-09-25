import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordModel } from 'pocketbase';

export function usePocketbaseItem(collectionName: string) {

    const authentication = useAuthentication();

    const item = ref<RecordModel>();

    async function get(id: string) {
        const record = await authentication.pb.collection(collectionName).getOne(id, {});
        return record;
    }

    async function sync(id: string) {
        item.value = await get(id);
    }

    async function create(data: {}) {
        const record = await authentication.pb.collection(collectionName).create(data);
    }

    async function remove(id: string) {
        await authentication.pb.collection(collectionName).delete(id);
    }

    return {
        item,
        get,
        sync,
        create,
        remove,
    }
}