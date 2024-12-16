<template>
    <div>
        <audio src="@/assets/payouts.mp3" controls hidden ref="payouts"></audio>
        <audio src="@/assets/recharge.mp3" controls hidden ref="recharge"></audio>
    </div>
</template>

<script>
import { toBeReviewed } from '@/api/finance/memberwithdrawal';
import { getToken } from "@/utils/auth";
let intervalId;
export default {
    name: 'AudioPlayer',
    created() {
        // 创建一个每秒执行一次的定时器
        intervalId = setInterval(() => {
            if (getToken()) {
                toBeReviewed().then(res => {
                    if (res.resultSet.cashCount > 0) {
                        this.$refs.payouts.play();
                    }
                    if(res.resultSet.incomeCount > 0){
                        setTimeout(() => {
                            this.$refs.recharge.play(); 
                        },1500)
                    }
                })
            }
        }, 10000);
    },
    beforeDestroy() {
        // 清除定时器
        clearInterval(intervalId);
    },
}
</script>