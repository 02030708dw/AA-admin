<!-- tinymc富文本 -->
<template>
    <div>
        <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick">
        </editor>
    </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/skins/ui/oxide/skin.css";
import 'tinymce/icons/default/icons';
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/code";
import request from '@/utils/request'
export default {
    name: "tinymce",
    components: {
        Editor,
    },
    props: {
        //传入一个value，使组件支持v-model绑定
        value: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        plugins: {
            type: [String, Array],
            default:
                // ' anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists   noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
                "lists image media table  wordcount code",
        },
        toolbar: {
            type: [String, Array],
            default:
                // 'undo redo | searchreplace | bold  italic | underline | strikethrough | alignleft  aligncenter alignright | outdent indent  blockquote  removeformat subscript superscript code codesample hr bullist numlist link image charmap preview anchor pagebreak insertdatetime  table  forecolor backcolor'
                "undo redo |  formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat hr",
        },
    },
    data() {
        return {
            //初始化配置
            init: {
                language_url: "tinymce/langs/zh_CN.js",  //引入语言包文件
                language: "zh_CN",//语言类型
                height: 500,
                content_style: "img {max-width:100%;}",
                plugins: this.plugins,//插件配置
                toolbar: this.toolbar, //工具栏配置，设为false则隐藏
                branding: true,//tiny技术支持信息是否显示
                menubar: true,//菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
                //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
                images_upload_handler: (blobInfo, success, failure) => {
                    const img = "data:image/jpeg;base64," + blobInfo.base64();
                    console.log(blobInfo.blob());

                    let formData = new FormData()
                    formData.append('file', blobInfo.blob())
                    request({
                        url: `/upload/image/single`,
                        method: 'POST',
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Function': 'demogame',
                            'GamerCode': ''
                        },
                    }).then((res) => {
                        success('https://static.44dog.cc/' + res.resultSet);
                    }).catch(() => {
                        failure("上传出错，服务器开小差了呢");
                    });
                },
                resize: true,//编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
                skin_url: 'tinymce/skins/ui/oxide', // skin路径
                content_css: 'tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
            },
            myValue: this.value,
        };
    },
    mounted() {
        tinymce.init({});
    },
    methods: {
        //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
        //需要什么事件可以自己增加
        onClick(e) {
            this.$emit("onClick", e, tinymce);
        },
        clear() {
            this.myValue = "";
        },
    },
    watch: {
        value(newValue) {
            this.myValue = newValue;
        },
        myValue(newValue) {
            this.$emit("input", newValue);
        },
    },
};
</script>
<style scoped></style>