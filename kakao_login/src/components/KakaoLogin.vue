<script setup>

</script>

<template>

  <div>
    <a v-if="!user.email" @click="kakaoLogin">
      <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
      />
    </a>
    <div v-else>
      <p>nickname: {{ user.name }}</p>
      <button type="button" @click="kakaoLogout">카카오 로그아웃</button>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref({});
const router = useRouter();

// onMounted(() => {
//   Kakao.init('20bdb1709c3cfacd425f98594dfdb63c'); // 사용하려는 앱의 JavaScript 키 입력
//   handleRedirect();
// });

onMounted(() => {
  // `kakao.min.js` 동적으로 로드
  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
  script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'; // 올바른 해시 값
  script.crossOrigin = 'anonymous';
  script.onload = () => {
    window.Kakao.init('c836f1ec791943ceace9388fca7692d1'); // JavaScript 키 입력
    handleRedirect();
  };
  document.head.appendChild(script);
});

// 로그인
const kakaoLogin = () => {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:8080/kakaologin',
  });
};

// 리다이렉트 후 토큰 처리
const handleRedirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('code')) {
    const code = urlParams.get('code');
    setKakaoToken(code);
  } else {
    displayToken();
  }
};

// 토큰 발급 및 사용자 정보 가져오기
const setKakaoToken = async (code) => {
  try {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: 'c836f1ec791943ceace9388fca7692d1', // REST API 키
        redirect_uri: 'http://localhost:8080/kakaologin',
        code: code,
      }).toString(),
    });
    const data = await response.json();
    Kakao.Auth.setAccessToken(data.access_token);
    await fetchUserInfo();
    router.push({ path: '/' }); // 로그인 후 홈으로 리다이렉트
  } catch (error) {
    console.error(error);
  }
};

// 사용자 정보 가져오기
const fetchUserInfo = async () => {
  try {
    const res = await Kakao.API.request({ url: '/v2/user/me' });
    user.value = {
      name: res.kakao_account.profile.nickname
    };
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃
const kakaoLogout = () => {
  Kakao.Auth.logout(() => {
    user.value = {};
  });
};

// 토큰이 있을 경우 자동 로그인 처리
const displayToken = () => {
  const token = getCookie('authorize-access-token');
  if (token) {
    Kakao.Auth.setAccessToken(token);
    fetchUserInfo();
  }
};

// 쿠키에서 토큰 가져오기
const getCookie = (name) => {
  const parts = document.cookie.split(`${name}=`);
  if (parts.length === 2) return parts[1].split(';')[0];
};
</script>


<style scoped>

</style>