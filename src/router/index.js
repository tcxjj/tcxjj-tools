import {createRouter, createWebHashHistory} from 'vue-router'
import LayoutContainer from "@/components/LayoutContainer";
import Pdf2Img from "@/components/Pdf2Img";
import TextTransform from "@/components/TextTransform";

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
                    path: '/decode/url',
                    name: 'decode-url',
                    component: TextTransform,
                }
            ]
        }
    ]
})


export default router
