<template>
    <a-layout style="height: 100%;">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo" />
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">
                    <router-link to="/pdf/img">PDF转图片</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/text/transform">文本转换</router-link>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>编码与解码</template>
<!--                    <a-menu-item-group title="Item 1">-->
<!--                        <a-menu-item key="setting:1">Option 1</a-menu-item>-->
<!--                        <a-menu-item key="setting:2">Option 2</a-menu-item>-->
<!--                    </a-menu-item-group>-->
                    <a-menu-item key="3">URL编码/解码</a-menu-item>
                    <a-menu-item key="4">
                      <router-link to="/encode/base64">Base64编码/解码</router-link>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '24px', marginTop: '64px', height: '100%' }">
            <!--        <a-breadcrumb :style="{ margin: '16px 0' }">-->
            <!--          <a-breadcrumb-item>Home</a-breadcrumb-item>-->
            <!--          <a-breadcrumb-item>List</a-breadcrumb-item>-->
            <!--          <a-breadcrumb-item>App</a-breadcrumb-item>-->
            <!--        </a-breadcrumb>-->
            <!--        <div :style="{ background: '#fff', padding: '24px', height: 'calc(100% - 64px)' }">Content</div>-->
            <!--        <pdf2-img/>-->
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
</template>

<script>
    export default {
        name: "LayoutContainer"
    }
</script>

<style scoped>

</style>
