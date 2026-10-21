<template>
    <div class="upload-list">
        <div class="upload-img" v-for="(item, i) in lang" :key="item">
            <el-upload action="" class="avatar-uploader" :show-file-list="false"
                :disabled="imageFlag[i]"
                :accept="storage === 's3' ? 'image/png,image/jpeg,image/gif,image/webp' : undefined"
                :before-upload="beforeUpload"
                :http-request="(e) => httpRequest(e, item, i)">
                <img v-if="imageURL[i].pictureUrl && !imageFlag[i]" :src="imageSrc(imageURL[i].pictureUrl)"
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
import { uploadGameImage } from '@/api/game/image'
import { gameImageUrl } from '@/utils/gameImage'
export default {
    name: 'UploadImage',
    props: {
        //是否回显图片
        img: {
            type: [String, Array],
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
        storage: {
            type: String,
            default: 'legacy'
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
        // 开发环境
        this.base_img = process.env.NODE_ENV == 'development' ? 'https://gwstatic.mvkbnb.com/' : 'https://gwstatic.mvkbnb.com/'
        // 开发环境
        // this.base_img = process.env.NODE_ENV == 'development' ? 'https://gwstatic.mvkbnb.com/' : 'https://static.44dog.cc/'
        try {
            const pictures = typeof this.img === 'string' ? JSON.parse(this.img || '[]') : this.img
            if (!Array.isArray(pictures)) return
            this.imageURL.forEach(image => {
                const picture = pictures.find(item => item && item.language === image.language)
                if (picture && typeof picture.pictureUrl === 'string') image.pictureUrl = picture.pictureUrl
            })
            this.emitImages()
        } catch (error) {
            console.log('pictureUrl不是JSON');
        }
    },
    methods: {
        imageSrc(path) {
            if (this.storage === 's3') return gameImageUrl(path)
            return /^https?:\/\//i.test(path) ? path : this.base_img + path
        },
        beforeUpload(file) {
            if (this.storage !== 's3') return true
            if (!this.code || !this.code.trim()) {
                this.$message.error('请先选择游戏商')
                return false
            }
            if (!['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type)) {
                this.$message.error('请选择 PNG、JPG、GIF 或 WebP 图片')
                return false
            }
            if (!file.size || file.size > 5 * 1024 * 1024) {
                this.$message.error('图片不能为空，且大小不能超过 5MB')
                return false
            }
            return true
        },
        emitImages() {
            this.$emit('Upload', this.imageURL.filter(item => item.pictureUrl).map(item => ({ ...item })))
        },
        httpRequest(item, lang, index) {
            let Fn, Code
            let that = this;
            let formData = new FormData()
            // that.UploadPercent[index] = 0;
            // that.imageFlag[index] = true;
            that.$set(that.UploadPercent, index, 0)
            that.$set(that.imageFlag, index, true)
            this.$emit('uploading', true)
            if (that.fn == 'gamer') {
                Fn = that.fn
                Code = that.code + '/' + lang
            } else {
                Fn = that.fn + lang
                Code = lang
            }
            formData.append('file', item.file)
            const onUploadProgress = (progressEvent) => {
                if (progressEvent.total) {
                    that.$set(that.UploadPercent, index, Math.min(100, Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    )))
                }
            }
            const upload = this.storage === 's3'
                ? uploadGameImage(item.file, Code, onUploadProgress)
                : request({
                url: `/upload/image/single`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Function': Fn,
                    'GamerCode': Code
                },
                onUploadProgress
            })
            return upload.then((res) => {
                if (typeof res.resultSet !== 'string' || !res.resultSet.trim()) {
                    throw new Error('上传服务未返回图片地址')
                }
                that.$set(that.imageFlag, index, false)
                this.$emit('uploading', this.imageFlag.some(Boolean))
                that.imageURL[index].pictureUrl = res.resultSet;
                that.emitImages()
                this.$message.success("上传成功！")
                return res
            }).catch((err) => {
                that.$set(that.imageFlag, index, false)
                this.$emit('uploading', this.imageFlag.some(Boolean))
                that.$set(that.UploadPercent, index, 0)
                this.$message.error('图片上传失败，请重试')
                throw err
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
