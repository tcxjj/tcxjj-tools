import {createRouter, createWebHashHistory} from 'vue-router'
import LayoutContainer from "@/components/LayoutContainer";
import Pdf2Img from "@/components/Pdf2Img";
import TextTransform from "@/components/TextTransform";
import Base64Encode from "@/components/Base64Encode";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/pdf/img',
            name: 'LayoutContainer',
            component: LayoutContainer,
            children: [
                {
                    path: '/pdf/img',
                    name: 'pdf',
                    component: Pdf2Img,
                }, {
                    path: '/text/transform',
                    name: 'text-transform',
                    component: TextTransform,
                }, {
                    path: '/encode/url',
                    name: 'encode-url',
                    component: TextTransform,
                }, {
                    path: '/encode/base64',
                    name: 'encode-base64',
                    component: Base64Encode,
                }
            ]
        }
    ]
})


export default router
