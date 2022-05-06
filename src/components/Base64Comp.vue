<template>
  <a-textarea v-if="type === 'decode' || type === 'encode'" v-model:value="textValue" style="height: 100%;"></a-textarea>
</template>

<script>
export default {
  name: "Base64Comp",
  props:{
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'decode'
    }
  },
  data(){
    return {
      textValue: this.text
    }
  },
  computed:{
    // result(){
    //   if (this.type == 'encode'){
    //     return atob(this.textValue)
    //   }
    //   return this.textValue
    // }
  },
  watch: {
    type(){
    }
  },
  methods: {
    change(type, value){
      if (type == 'encode'){
        this.textValue = btoa(value)
      }
      if (type == 'decode'){
        this.textValue = atob(value)
      }
    }
  }
}
</script>

<style scoped>

</style>
