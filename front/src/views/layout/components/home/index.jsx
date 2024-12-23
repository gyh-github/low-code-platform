import { defineComponent, onMounted } from "vue";
import { getUsersAll, addUser } from '@/apis/user';

export default defineComponent({
    setup() {
        onMounted(() => {
            // addUser({ user_name: 'xxx', user_phone: '15699067790' });
            getUsersAll();
        })

        return () => (<>home
        </>)
    }
})