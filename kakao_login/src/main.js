import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

createApp(App).use(router).mount('#app');
//
// window.Kakao.init("20bdb1709c3cfacd425f98594dfdb63c");

const script = document.createElement('script');
script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'; // 올바른 해시 값
script.crossOrigin = 'anonymous';
script.onload = () => {
    // `Kakao` 객체가 로드된 후에 `init`을 호출합니다.
    window.Kakao.init('c836f1ec791943ceace9388fca7692d1'); // JavaScript 키 입력
    app.mount('#app');
};
document.head.appendChild(script);
