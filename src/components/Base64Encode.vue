<template>
  <div style="height: 100%">
    <a-row style="height: 100%">
      <a-col :span="10" style="height: 100%">
        <base64-comp ref="leftComp" :type="leftType" :text="leftText" />
      </a-col>
      <a-col :span="4">
        <div class="t-auto" style="margin-top: 24px;">
          <a-button type="primary" @click="encode('leftComp','rightComp')">编码 ></a-button>
          <a-button type="primary" @click="encode('rightComp','leftComp')">&lt; 编码</a-button>
        </div>
        <div class="t-auto" style="margin-top: 24px;">
          <a-button type="primary" @click="decode('leftComp','rightComp')">解码 ></a-button>
          <a-button type="primary" @click="decode('rightComp','leftComp')">&lt; 解码</a-button>
        </div>
      </a-col>
      <a-col :span="10">
        <base64-comp ref="rightComp" :type="rightType" :text="rightText" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Base64Comp from "@/components/Base64Comp";
export default {
  name: "Base64Encode",
  components: {Base64Comp},
  data(){
    return{
      leftText: '',
      rightText: '',
      leftType: 'decode',
      rightType: 'decode',
    }
  },
  methods: {
    encode(target,source){
      // this.rightType = "encode"
      // this.rightText = this.$refs.leftComp.textValue
      this.$refs[source].change('encode', this.$refs[target].textValue)
    },
    decode(target,source){
      // this.rightType = "decode"
      // this.rightText = this.$refs.leftComp.textValue
      this.$refs[source].change('decode', this.$refs[target].textValue)
    }
  }
}
</script>

<style scoped>
  .t-auto{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
</style>
