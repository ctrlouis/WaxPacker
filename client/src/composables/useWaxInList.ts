import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordListOptions, RecordModel } from 'pocketbase';

export function useWaxInList() {

    const authentication = useAuthentication();

    const waxInList = ref<RecordModel[]>();

    async function getWaxInList(options: RecordListOptions ={}) {
        const resultList = await authentication.pb.collection('wax_in').getList(1, 50, options);
        return resultList;
    }

    async function syncWaxInList(options: RecordListOptions ={}) {
        const resultList = await getWaxInList(options);
        waxInList.value = resultList.items;
    }

    // async function subscribeWaxIn(callback: Function) {
    //     unsubscribeWaxIn();
    //     channel.value = supabase
    //         .channel('any')
    //         .on('postgres_changes', { event: '*', schema: '*', table: tableName }, payload => {
    //             callback(payload);
    //         })
    //         .subscribe();
    // }

    // async function unsubscribeWaxIn() {
    //     if (channel.value) {
    //         supabase.removeChannel(channel.value);
    //     }
    // }

    return {
        waxInList,
        getWaxInList,
        syncWaxInList,
        // subscribeWaxIn,
        // unsubscribeWaxIn,
    }
}