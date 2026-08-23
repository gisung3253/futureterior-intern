// PART 12. Slack Bot Prototype
// 블록 타입: sub · fip · proposal(label 옵션) · figures(이미지) · persona · profile · funnel · callout · table · p · summary · ref · steps
// 인라인: **굵게**, `코드`, \n (줄바꿈)
// 이미지는 public/ 폴더에 두고 '/파일명'으로 참조

const part12 = {
  lead: "Slack 무료 플랜에서 실제로 쓸 수 있는 알림 봇, **'대표님 봇'**을 만들었습니다. \n업무 향상과 개인 업무 관리를 함께 잡는 것이 목표입니다.",
  sections: [
    {
      title: '왜 만들었는가',
      blocks: [
        {
          type: 'p',
          text: '슬랙 봇에 어떤 것들이 있는지 찾아보니 종류가 다양했습니다. 대화를 단순히 정리해 주는 봇, 업무 향상을 위한 응원 봇, 팀 내 내기를 위한 룰렛 돌리기 봇 등이 있었습니다.',
        },
        {
          type: 'callout',
          text: "그래서 저는 **업무 향상과 개인 업무 관리를 함께 잡는 '대표님 봇'**을 만들었습니다.",
        },
      ],
    },
    {
      title: '무엇을 하는가',
      blocks: [
        {
          type: 'proposal',
          label: 'Feature',
          title: '대표님 말투로 알림이 옵니다',
          text: '모두가 그렇겠지만, 폰을 켰을 때 대표님에게 "이거 해주세요" 하는 메시지가 떠 있으면 순간적으로 긴장 상태에 놓이게 됩니다. \n이 효과로 끊임없는 마음의 부스터 효과를 낼 수 있습니다.',
        },
        {
          type: 'proposal',
          label: 'Feature',
          title: '팀 내 모든 채널의 내용이 내 봇에 한 번 더 정리됩니다',
          text: '여러 채널에 흩어진 내용을 재차 한 번 더 확인할 수 있게 됩니다.',
        },
        {
          type: 'proposal',
          label: 'Feature',
          title: '구글 캘린더와 연동됩니다',
          text: '"~일까지 ~~ 하는 거 알고 있죠? 해주세요" 하는 메시지를 보내게 하여, 내 일정을 재차 한 번 더 강요받을 수 있습니다.',
        },
      ],
    },
    {
      title: '실제 화면',
      blocks: [
        {
          type: 'figures',
          items: [
            {
              src: '/app_info.png',
              alt: "Slack 앱 프로필 — 대표님 APP: '팀 채널의 할 일을 대표님 말투로 나에게 DM'",
              caption: "Slack 앱 프로필 — '팀 채널의 할 일을 대표님 말투로 나에게 DM'",
            },
            {
              src: '/mobile-noti.jpg',
              alt: '잠금화면에 도착한 대표님(봇) 알림 — "기성씨, 이거 보세요. > 슬랙봇 다 만들어졌죠?"',
              caption: 'Slack에 올라온 글이 대표님 말투로 내 폰에 DM으로 도착',
              maxHeight: '560px',
            },
          ],
        },
        {
          type: 'p',
          text: '자세한 부분은 시연으로 보이겠습니다.',
        },
      ],
    },
  ],
}

export default part12
