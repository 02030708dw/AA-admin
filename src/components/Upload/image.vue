<template>
    <div class="upload-list">
        <div class="upload-img" v-for="(item, i) in lang" :key="item">
            <el-upload action="" class="avatar-uploader" :show-file-list="false"
                :http-request="(e) => httpRequest(e, item, i)">
                <img v-if="imageURL[i].pictureUrl && !imageFlag[i]" :src="base_img + imageURL[i].pictureUrl"
                    class="avatar">
                <i v-else-if="!imageFlag[i]" class="el-icon-plus avatar-uploader-icon"></i>
                <el-progress v-if="imageFlag[i]" type="circle" :percentage="UploadPercent[i]"></el-progress>
            </el-upload>
            <span>{{ item }}</span>
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
        fn: {//功能标识符（广告：banner 活动：activity 游戏商：gamer）
            type: String,
            default: "",
        },
        code: {//游戏商code（上传游戏图片需要传此信息）
            type: String,
            default: "",
        },
    },
    data() {
        return {
            imageURL: [{
                "language": "CN",
                "pictureUrl": ""
            }, {
                "language": "EN",
                "pictureUrl": ""
            }, {
                "language": "TH",
                "pictureUrl": ""
            }, {
                "language": "VN",
                "pictureUrl": ""
            }],
            imageFlag: [false, false, false, false],
            UploadPercent: [0, 0, 0, 0],
            lang: ['CN', 'EN', 'TH', 'VN'],
            base_img: ''
        };
    },
    created() {
        this.base_img = process.env.NODE_ENV == 'development' ? 'https://gwstatic.mvkbnb.com/' : 'https://static.44dog.cc/'

        if (typeof this.img === 'string') {
            try {
                let obj = JSON.parse(this.img);
                let pictureInfos = []
                if (typeof obj === 'object' && obj.length > 0) {
                    for (let i = 0; i < obj.length; i++) {
                        for (let j = 0; j < this.imageURL.length; j++) {
                            if (this.imageURL[j].language == obj[i].language) {
                                this.imageURL[j].pictureUrl = obj[i].pictureUrl
                                pictureInfos.push(obj[i])
                            }
                        }
                    }
                }
                this.$emit("Upload", pictureInfos);
            } catch (error) {
                console.log('pictureUrl不是JSON');
            }
        }
    },
    methods: {
        httpRequest(item, lang, index) {
            let Fn, Code
            let that = this;
            let formData = new FormData()
            // that.UploadPercent[index] = 0;
            // that.imageFlag[index] = true;
            that.$set(that.UploadPercent, index, 0)
            that.$set(that.imageFlag, index, true)
            if (that.fn == 'gamer') {
                Fn = that.fn
                Code = that.code + '/' + lang
            } else {
                Fn = that.fn + lang
                Code = that.code + '/' + lang
            }
            formData.append('file', item.file)
            request({
                url: `/upload/image/single`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Function': Fn,
                    'GamerCode': Code
                },
                onUploadProgress: (progressEvent) => {
                    that.$set(that.UploadPercent, index, Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    ))
                    if (that.UploadPercent[index] == 100) {
                        that.$set(that.imageFlag, index, true)
                    }
                },

            }).then((res) => {
                that.$set(that.imageFlag, index, false)
                that.imageURL[index].pictureUrl = res.resultSet;
                let setURL = []
                for (let i = 0; i < that.imageURL.length; i++) {
                    if (that.imageURL[i].pictureUrl) {
                        setURL.push(that.imageURL[i])
                    }
                }
                that.$emit("Upload", setURL);
                this.$message.success("上传成功！")
            }).catch((err) => {
                that.$set(that.imageFlag, index, false)
                that.$set(that.UploadPercent, index, 0)
                that.imageURL[index].pictureUrl = '';
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
