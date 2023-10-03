import { computed, ref } from 'vue';
import type {  RecordModel } from 'pocketbase';

export function useThirdPartie() {

    const thirdPartie = ref<RecordModel>();

    const fullAddress = computed(() => {
        let a = "";
        if (thirdPartie.value) {
            a += `${thirdPartie.value.address}`;
            if (thirdPartie.value.zip_code || thirdPartie.value.city) {
                if (a.length > 0) a += ', ';
                if (thirdPartie.value.zip_code) {
                    a += thirdPartie.value.zip_code;
                    if (thirdPartie.value.city) a += ' ';
                }
                if (thirdPartie.value.city) {
                    a += thirdPartie.value.city;
                }
            }
            if (thirdPartie.value.country) {
                if (a.length > 0) a += ', ';
                a += thirdPartie.value.country;
            }
            if (thirdPartie.value.state) {
                if (a.length > 0) a += ' - ';
                a += thirdPartie.value.state;
            }
        }
        return a;
    });

    return {
        thirdPartie,
        fullAddress,
    }
}