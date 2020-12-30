(() => {
  let prevScrollHeight = 0; // 지난 sections들의 height의 합
  let currentScene = 0; // 현재 보고잇는 scene의 순서번호

  let sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 실제 사용자가 보는 화면 높이의 5배를 설정
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  const setLayout = () => {
    sceneInfo = sceneInfo.map((value) => {
      value.scrollHeight = value.heightNum * window.innerHeight;
      value.objs.container.style.height = `${value.scrollHeight}px`;
      return value;
    })

    let totalScroll = 0;
    Array.from(sceneInfo).forEach((value, index, array) => {
      totalScroll += value.scrollHeight;
      if (totalScroll >= window.pageYOffset) {
        currentScene = index;
        array.splice(0);
      }
    })
    setCurrentSection()
  }

  const scrollLoop = () => {
    prevScrollHeight = sceneInfo.reduce((acc, value, index) => {
      if (index >= currentScene) return acc;
      return acc + value.scrollHeight
    }, 0)

    if (window.pageYOffset < 0) return;  // when browser bounced atmost upper page, currentScene should not go below zero.
    if (window.pageYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      setCurrentSection();
    }
    if (window.pageYOffset < prevScrollHeight) {
      currentScene--;
      setCurrentSection();
    }
  }

  const setCurrentSection = () => {
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  window.addEventListener('resize', setLayout);
  window.addEventListener('load', setLayout);
  window.addEventListener('scroll', () => {
    scrollLoop();
    console.log('currentScene: ', currentScene, ' prevScrollHeight: ', prevScrollHeight)
  });

})();