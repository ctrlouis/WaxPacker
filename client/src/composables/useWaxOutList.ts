import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordModel } from 'pocketbase';

export function useWaxOutList() {

    const authentication = useAuthentication();

    const waxOutList = ref<RecordModel[]>();

    async function getWaxOutList() {
        const resultList = await authentication.pb.collection('wax_out').getList(1, 50, {});
        return resultList;
    }

    async function syncWaxOutList() {
        const resultList = await getWaxOutList();
        waxOutList.value = resultList.items;
    }

    // async function subscribeWaxOut(callback: Function) {
    //     unsubscribeWaxOut();
    //     channel.value = supabase
    //         .channel('any')
    //         .on('postgres_changes', { event: '*', schema: '*', table: tableName }, payload => {
    //             callback(payload);
    //         })
    //         .subscribe();
    // }

    // async function unsubscribeWaxOut() {
    //     if (channel.value) {
    //         supabase.removeChannel(channel.value);
    //     }
    // }

    return {
        waxOutList,
        getWaxOutList,
        syncWaxOutList,
        // subscribeWaxOut,
        // unsubscribeWaxOut,
    }
}