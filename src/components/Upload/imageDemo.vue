<template>
    <div class="upload-list">
        <div class="upload-img">
            <el-upload action="" class="avatar-uploader" :show-file-list="false" :http-request="httpRequest">
                <img v-if="imageURL && !imageFlag" :src="base_img + imageURL" class="avatar">
                <i v-else-if="!imageFlag" class="el-icon-plus avatar-uploader-icon"></i>
                <el-progress v-if="imageFlag" type="circle" :percentage="UploadPercent"></el-progress>
            </el-upload>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name: 'UploadImage',
    props: {
        //是否回显图片
        img: {
            type: String,
            default: "",
        },
        code: {//游戏商code（上传游戏图片需要传此信息）
            type: String,
            default: "",
        },
        Fn: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            imageURL: '',
            imageFlag: false,
            UploadPercent: 0,
            lang: '',
            base_img: ''
        };
    },
    created() {
        this.base_img = process.env.NODE_ENV == 'development' ? 'https://gwstatic.mvkbnb.com/' : 'https://static.44dog.cc/'
        this.imageURL = this.img
    },
    methods: {
        httpRequest(item) {
            let Fn, Code
            let that = this;
            let formData = new FormData()
            that.UploadPercent = 0
            that.imageFlag = true
            Fn = this.Fn ? this.Fn : 'demogame'
            formData.append('file', item.file)
            request({
                url: `/upload/image/single`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Function': Fn,
                    'GamerCode': ''
                },
                onUploadProgress: (progressEvent) => {
                    that.UploadPercent = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    )
                    if (that.UploadPercent == 100) {
                        that.imageFlag = true
                    }
                },

            }).then((res) => {
                that.imageFlag = false
                that.imageURL = res.resultSet;
                that.$emit("Upload", res.resultSet);
                this.$message.success("上传成功！")
            }).catch((err) => {
                console.log(err);

                that.imageFlag = false
                that.UploadPercent = false
                that.imageURL = '';
                this.$message.error("出错了！")
            });

        },
    },
};
</script>
<style lang="scss">
.upload-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .upload-img {
        text-align: center;

        .avatar-uploader {
            width: 178px;
            height: 178px;
            border: 1px dashed #494b4b3d;
            border-radius: 6px;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload {
            width: 178px;
            height: 178px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader:hover {
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

        .el-progress-circle {
            width: 178px !important;
            height: 178px !important;
        }
    }
}
</style>
