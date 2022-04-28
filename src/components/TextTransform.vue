<template>
    <div>
        <a-textarea v-model:value="text" :rows="20"></a-textarea>
        <div>
            <a-button v-for="p in programs" type="primary" :key="p.label" style="margin-right: 24px;margin-top: 24px;"
                      @click="p.method">
                {{p.label}}
            </a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TextTransform",
        data() {
            return {
                text: '',
                program: null,
                programs: [
                    {
                        label: '转大写',
                        value: 'toUpperCase',
                        method: this.toUpperCase
                    }, {
                        label: '转小写',
                        value: 'toLowerCase',
                        method: this.toLowerCase
                    }, {
                        label: '短横线转小驼峰',
                        value: 'lowerCamelCase',
                        method: this.lowerCamelCase
                    }, {
                        label: '短横线转大驼峰',
                        value: 'upperCamelCase',
                        method: this.upperCamelCase
                    }
                ]
            }
        },
        methods: {
            toUpperCase() {
                console.log('toUpperCase')
                this.text = this.text.toUpperCase()
            },
            toLowerCase() {
                console.log('toLowerCase')
                this.text = this.text.toLowerCase()
            },
            lowerCamelCase() {
                const strArr = this.text.split('-');
                for (let i = 1; i < strArr.length; i++) {
                    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
                }
                this.text =  strArr.join('');
            },
            upperCamelCase() {
                const strArr = this.text.split('-');
                for (let i = 0; i < strArr.length; i++) {
                    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
                }
                this.text =  strArr.join('');
            }
        }
    }
</script>

<style scoped>

</style>
