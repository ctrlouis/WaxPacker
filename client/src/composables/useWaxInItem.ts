import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordModel } from 'pocketbase';

const collectionName = 'wax_in';

export function useWaxInItem() {

    const authentication = useAuthentication();

    const item = ref<RecordModel>();

    async function create(data: {}) {
        const record = await authentication.pb.collection(collectionName).create(data);
        console.log(record);
    }

    async function remove(id: string) {
        await authentication.pb.collection(collectionName).delete(id);
    }

    return {
        waxInItem: item,
        createWaxInItem: create,
        removeWaxInItem: remove,
    }
}