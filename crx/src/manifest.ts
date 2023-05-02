import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'CreativeCollective',
  description: 'Support your favorite creators with a single click.',
  version: '0.0.0',
  manifest_version: 3,
  icons: {
    '48': 'img/icon-48.png',
    '128': 'img/icon-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/icon-48.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/icon-48.png', 'img/icon-128.png'],
      matches: [],
    },
  ],
  externally_connectable: {
    "ids": ["*"],
    "matches": ["*://localhost/*"]
  },
  permissions: [
    'storage',
    'activeTab',
    'scripting',
  ],
  key: "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDsaSSjGaWBjc70Red0Pijo5bSZh1lNsZ1eqneE/rjkURc/Yiq0SXxn1AkDXobXt6fiaCC6yRnn1qkitnbneLWaPNW1aOpPW9UWbIyVp+N7iZeJqnFB/D2i89Ax/T+emVxvHmiZrjg0KdoafbcU8NZ/fL8adWPv8CKs02RYEE/4vFVS/YVCemjUMbmantwIl3OYuHHpxB/6iz225WNq844gcLCA8uVcZo8bAonpsVt6ZIcpPzwCZAJaUBOdpZ+qZ+VfrykTvKOuWzxZqo6kPyMByNkZPDXVBneu+2H7kLOKMB0WhGOWKUSsasmKzf+JR6C5ObDKcXcZAG2Z64axaNX5AgMBAAECggEAF3NLNTs0iHgtbgaccb0+vUdtKt4wVL1zFkeuM7eOqzst+qq9VgUvaB8yG67zN4+vVrfXKKANHUr/m61iIw4oDsTNEBci8udG6QKweUyI4KFih5SBcoxXqC6A2YySPyRdn7oc9xg/LqbIzIrphRQUutsAG9rxea9QyThDglwaiq93BIDnq9iMe02V5LQz4g+5qTdk6723aHWAIrOed3qQrx5ZIC7J9zSdXV0c2cUD1/zCEP+2Wb/QTjEHGV3oTc95VLD5JOtDIN417aqoxkG3ByAZlNfT/klQUvXH+ra61sS/vYW6j0YYRjoH49e47cHw3pP/6TJd8YVMNgkFqzYChwKBgQD5SDBdwhWqfixnV840MpkG1ZhtfBm3W3098KKo3LVFun6+AkY4r7tVI/OH/thTghXUTM3J07234bwtTYmlpvPK0mlyYp1I558UwFtRjtrABgaY1Df0vjBgOaigQ5oyHlsp51jj1HL3lFspqhY/T3Pt70zuWbugpCu+ep5vEwrnbwKBgQDyyCeObFxAOOPwfWUbSVG3jYirboorrlt0eyCm945eLKjhyJY1jTAzr1Rixqt4mG1i6RRfLTFPzoYNiFYj29wMDbx2b2veApknffu0KFWJMchTubBPXclDPoC1X5E2cU1Yls4WZYS6GNs2WHXF2fS57cj7zv5lRwDQGJqfYjUlFwKBgCncCmskFTlM+K3d271+JZ41LeRsq3DTxyMojlfmv/XWjEPh4+LO95kjcViL3c2gEYRV5VSX3srK+CtvUsbjUxri3Fwd3SWJ53e3mV4HrAoEuQTe1gqeCUePRxaqY3E5EbvmolGXsjqKyggkDJpTADebMILxxIUELGhO9N3YB8O3AoGADfz6Snpz1j9w4qpW6PuQecLt3PLBg0LIgi2V9AjPax2nnVqxTOSVomS3t/k6Z/hgVRKY2eMAtFhx4NW6INbKFueztB83V9NOf7gCiJ7KTt1PbYOFZQ1CS12OjOS0uS5OBoyp0yCGRTKpbrgqEPw93XiV2+xRPASbR2IjhotiBIECgYB3SI/ZcCACl7r92sjjhs4bfPm3kwQ7YUy0QU7b9jfqy8vdFJQubM4aByV9gg6/iCRYPsml8DnKCn/8hBXGfMoCmL6LObP0p9IyuMFRIvR/PpIlE14PN18tTqlPM4nGAQbis/Y6xyFVbBNh9mc5XywDC4Nqk4oSki25M+KcyqW8+A=="
})
