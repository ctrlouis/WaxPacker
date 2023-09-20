import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordModel } from 'pocketbase';

export function useWaxInItem() {

    const authentication = useAuthentication();

    const item = ref<RecordModel>();

    async function create(data: {}) {
        const record = await authentication.pb.collection('wax_in').create(data);
        console.log(record);
    }

    return {
        waxInItem: item,
        createWaxInItem: create,
    }
}