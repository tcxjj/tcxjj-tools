<template>
    <div class="container">
        <a-spin :spinning="spinning">
            <div style="height: 224px;padding-top: 24px">
                <a-upload-dragger
                        style="width: 600px;margin: auto;border-radius: 4px;"
                        accept=".pdf"
                        :beforeUpload="beforeUpload"
                        :showUploadList="false"
                >
                    <p class="ant-upload-drag-icon" style="margin-top: 30px;">
                        <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text" v-if="file">{{file.name}}</p>
                    <p class="ant-upload-text" v-else>点击或拖动PDF文件到此区域</p>
                </a-upload-dragger>
            </div>
            <div class="options-div">
                <span>生成图片dpi：</span>
                <a-radio-group v-model:value="imgDpi" button-style="solid"
                               @change="e => handleParamsChange({imgDpi: e.target.value})">
                    <a-radio-button value="120">120</a-radio-button>
                    <a-radio-button value="160">160</a-radio-button>
                    <a-radio-button value="180">180</a-radio-button>
                    <a-radio-button value="200">200</a-radio-button>
                    <a-radio-button value="240">240</a-radio-button>
                    <a-radio-button value="280">280</a-radio-button>
                    <a-radio-button value="300">300</a-radio-button>
                    <a-radio-button value="360">360</a-radio-button>
                </a-radio-group>
                <div style="font-size: small;color: #aaa;margin-left: 100px;">
                    dpi越大转换后越清晰，转换后的图片文件越大，相对转换速度越慢
                </div>
            </div>
            <div class="options-div">
                <span>生成图片格式：</span>
                <a-radio-group v-model:value="imgType" button-style="solid"
                               @change="e => handleParamsChange({imgType: e.target.value})">
                    <a-radio-button value="PNG">PNG</a-radio-button>
                    <a-radio-button value="JPG">JPG</a-radio-button>
                    <a-radio-button value="JPEG">JPEG</a-radio-button>
                    <a-radio-button value="GIF">GIF</a-radio-button>
                    <a-radio-button value="BMP">BMP</a-radio-button>
                    <a-radio-button value="WBMP">WBMP</a-radio-button>
                </a-radio-group>
                <div style="font-size: small;color: #aaa;margin-left: 100px;">
                    支持以上主流图片文件格式
                </div>
            </div>
            <div class="options-div">
                <span>生成文件名称：</span>
                <a-input v-model:value="fileName" style="max-width: 400px;" placeholder="请输入生成的文件名称，默认为pdf文件名称"/>
                <sync-outlined @click="getFileName" style="width: 40px;color: #aaa;"/>
            </div>
        </a-spin>
        <div style="margin-top: 24px;" align="center">
            <a-button type="primary" @click="handleConvert" :loading="spinning">{{spinning?'转换中':'开始转换'}}</a-button>
        </div>
<!--        <iframe :src="{...file}" width="800px" height="800px"></iframe>-->
    </div>

</template>

<script>
    import {InboxOutlined, SyncOutlined} from '@ant-design/icons-vue';
    import axios from 'axios'

    export default {
        name: "Pdf2Img",
        components: {
            InboxOutlined, SyncOutlined
        },
        data() {
            return {
                imgDpi: '120',
                imgType: 'PNG',
                fileName: '',
                spinning: false,
                file: null
            }
        },
        created() {
            const convertParms = JSON.parse(localStorage.getItem("convertParms"))
            if (convertParms) {
                this.imgDpi = convertParms.imgDpi || '120'
                this.imgType = convertParms.imgType || 'PNG'
            }
        },
        methods: {
            handleParamsChange(params) {
                const convertParms = JSON.parse(localStorage.getItem("convertParms"))
                localStorage.setItem("convertParms", JSON.stringify({...convertParms, ...params}))
            },
            getFileName() {
                this.fileName = this.file?.name.substring(0, this.file.name.length - 4)
            },
            beforeUpload(file) {
                console.log(file)
                if (!file.name.endsWith('.pdf')) {
                    this.file = null
                    this.$message.error('请选择PDF文件！')
                    return false
                }
                this.file = file
                if (!this.fileName) {
                    this.fileName = file.name.substring(0, file.name.length - 4)
                }
                return false
            },
            handleConvert() {
                if (!this.file) {
                    this.$message.error('请先选择一个pdf文件')
                    return
                }
                this.spinning = true
                const convertParms = {
                    imgDpi: this.imgDpi,
                    imgType: this.imgType
                }
                localStorage.setItem("convertParms", JSON.stringify(convertParms))
                console.log(this.file)
                let formData = new FormData();
                formData.append("imgType", this.imgType);
                formData.append("imgDpi", this.imgDpi);
                formData.append("fileName", this.fileName);
                formData.append("file", this.file);
                axios({
                    method: 'post',
                    url: '/api/pdf/img',
                    data: formData,
                    responseType: 'blob',
                    "Content-Type": "multipart/form-data",
                    timeout: 120000,
                    maxBodyLength: 100000000,
                    maxContentLength: 100000000
                }).then(res => {
                    console.log(res)
                    this.convertRes2Blob(res)
                }).catch(e => {
                    console.error(e)
                    this.$message.error('转换失败！')
                }).finally(() => {
                    this.spinning = false
                })
            },
            convertRes2Blob(response) {

                // 提取文件名
                const fileName = response.headers['content-disposition'].match(/filename=(.*)/)[1]
                // 将二进制流转为blob
                const blob = new Blob([response.data])
                if ('download' in document.createElement('a')) {
                    // 创建新的URL并指向File对象或者Blob对象的地址
                    const blobURL = window.URL.createObjectURL(blob)
                    // 创建a标签，用于跳转至下载链接
                    const tempLink = document.createElement('a')
                    tempLink.style.display = 'none'
                    tempLink.href = blobURL
                    tempLink.setAttribute('download', decodeURI(fileName))
                    // 兼容：某些浏览器不支持HTML5的download属性
                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank')
                    }
                    // 挂载a标签
                    document.body.appendChild(tempLink)
                    tempLink.click()
                    document.body.removeChild(tempLink)
                    // 释放blob URL地址
                    window.URL.revokeObjectURL(blobURL)
                } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
                    window.navigator.msSaveBlob(blob, decodeURI(fileName))
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        background-color: #fff;
        height: 100%;
    }

    .options-div {
        margin-top: 24px;
        margin-left: 30%;

        span {
            display: inline-block;
            width: 100px;
        }
    }
</style>
