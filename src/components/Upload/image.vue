<template>
    <el-upload action="" class="avatar-uploader" :show-file-list="false" :http-request="httpRequest">
        <img v-if="imageURL && !imageFlag" :src="imageURL" class="avatar">
        <i v-else-if="!imageFlag" class="el-icon-plus avatar-uploader-icon"></i>
        <el-progress v-if="imageFlag" type="circle" v-bind:percentage="UploadPercent"
            style="margin-top: 7px"></el-progress>
    </el-upload>
</template>

<script>
import request from '@/utils/request'
export default {
    name: 'UploadImage',
    props: {
        //是否回显图片
        img: '',
        fn:''
    },
    data() {
        return {
            imageURL: '',
            imageFlag: '',
            UploadPercent: '',
            Function: '',//功能标识符（广告：banner 活动：activity 游戏商：gamer）
            GamerCode: '',//游戏商code（上传游戏图片需要传此信息）
        };
    },
    created() {
        this.imageURL = this.img;
        this.Function = this.fn;
    },
    methods: {
        httpRequest(item) {
            let that = this;
            let formData = new FormData()
            that.UploadPercent = 0;
            that.imageFlag = true;
            formData.append('file', item.file)
            request({
                url: '/upload/image/single',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Function': that.Function,
                    'GamerCode': that.GamerCode
                },
                onUploadProgress: (progressEvent) => {
                    that.UploadPercent = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    if (that.UploadPercent == 100) {
                        that.imageFlag = true;
                    }
                },

            }).then((res) => {

                that.imageFlag = false;
                that.imageURL = res.resultSet;
                that.$emit("Upload", res.resultSet);
                this.$message.success("上传成功！")
            }).catch((err) => {
                that.imageFlag = false;
                that.imageURL = '';
                that.UploadPercent = 0
                this.$message.error("出错了！")
            });

        },
    },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
