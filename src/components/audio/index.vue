<template>
    <audio src="@/assets/y1897.mp3" controls hidden ref="refaudio"></audio>
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
                    if (res.resultSet > 0) {
                        this.$refs.refaudio.play();
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