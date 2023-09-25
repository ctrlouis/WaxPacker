import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';
import type { RecordListOptions, RecordModel } from 'pocketbase';

export function usePocketbaseList(collectionName: string) {

    const authentication = useAuthentication();

    const list = ref<RecordModel[]>();

    async function get(options: RecordListOptions ={}) {
        const resultList = await authentication.pb.collection(collectionName).getList(1, 50, options);
        return resultList;
    }

    async function sync(options: RecordListOptions ={}) {
        const resultList = await get(options);
        list.value = resultList.items;
    }

    // async function subscribe(callback: Function) {
    //     unsubscribe();
    //     channel.value = supabase
    //         .channel('any')
    //         .on('postgres_changes', { event: '*', schema: '*', table: tableName }, payload => {
    //             callback(payload);
    //         })
    //         .subscribe();
    // }

    // async function unsubscribe() {
    //     if (channel.value) {
    //         supabase.removeChannel(channel.value);
    //     }
    // }

    return {
        list,
        get,
        sync,
        // subscribe,
        // unsubscribe,
    }
}