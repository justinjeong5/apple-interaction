(() => {
  let prevScrollHeight = 0; // 지난 sections들의 height의 합
  let currentScene = 0; // 현재 보고잇는 scene의 순서번호
  let enterNewSectionFlag = false;  // section이 바뀌는 순간에는 currentSectionHeight가 음수가 되는 현상을 막는 flag

  let sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 실제 사용자가 보는 화면 높이의 5배를 설정
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageItem: [
          document.querySelector('#scroll-section-0 .main-message.item-0'),
          document.querySelector('#scroll-section-0 .main-message.item-1'),
          document.querySelector('#scroll-section-0 .main-message.item-2'),
          document.querySelector('#scroll-section-0 .main-message.item-3')
        ]
      },
      scrollValues: {
        messageItem: [
          {// 0
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.1, dst: 0.2 } },
              out: { src: 1, dst: 0, range: { src: 0.25, dst: 0.3 } }
            },
            translateY: {
              in: { src: 20, dst: 0, range: { src: 0.1, dst: 0.2 } },
              out: { src: 0, dst: -20, range: { src: 0.25, dst: 0.3 } }
            }
          },
          {// 1
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.3, dst: 0.4 } },
              out: { src: 1, dst: 0, range: { src: 0.45, dst: 0.5 } }
            },
            translateY: {
              in: { src: 20, dst: 0, range: { src: 0.3, dst: 0.4 } },
              out: { src: 0, dst: -20, range: { src: 0.45, dst: 0.5 } }
            }
          },
          {// 2
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.5, dst: 0.6 } },
              out: { src: 1, dst: 0, range: { src: 0.65, dst: 0.7 } }
            },
            translateY: {
              in: { src: 20, dst: 0, range: { src: 0.5, dst: 0.6 } },
              out: { src: 0, dst: -20, range: { src: 0.65, dst: 0.7 } }
            }
          },
          {// 3
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.7, dst: 0.8 } },
              out: { src: 1, dst: 0, range: { src: 0.85, dst: 0.9 } }
            },
            translateY: {
              in: { src: 20, dst: 0, range: { src: 0.7, dst: 0.8 } },
              out: { src: 0, dst: -20, range: { src: 0.85, dst: 0.9 } }
            }
          }
        ]

      }
    },
    {
      type: 'normal',
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
      if (value.type === 'sticky') {
        value.scrollHeight = value.heightNum * window.innerHeight;
      } else {
        value.scrollHeight = value.objs.container.offsetHeight;
      }
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

    enterNewSectionFlag = false;
    if (window.pageYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewSectionFlag = true;
      currentScene++;
      setCurrentSection();
    }
    if (window.pageYOffset < prevScrollHeight) {
      enterNewSectionFlag = true;
      currentScene--;
      setCurrentSection();
    }
  }

  const setCurrentSection = () => {
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  const calcScrollValues = (scrollValues) => {
    // console.log('curScene: ', currentScene)
    const currentYOffset = window.pageYOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    // console.log(scrollRatio)
    let convertedValues = scrollRatio * (scrollValues.dst - scrollValues.src) + scrollValues.src;
    if (scrollValues.range) {
      const partScrollSrc = scrollValues.range.src * scrollHeight;
      const partScrollDst = scrollValues.range.dst * scrollHeight;
      const partScrollHeight = partScrollDst - partScrollSrc;

      if (partScrollSrc > currentYOffset) {
        convertedValues = scrollValues.src;
      } else if (partScrollDst < currentYOffset) {
        convertedValues = scrollValues.dst;
      } else {
        convertedValues = (currentYOffset - partScrollSrc) / partScrollHeight
          * (scrollValues.dst - scrollValues.src) + scrollValues.src;
      }
    }
    // console.log('convertedValues: ', convertedValues)
    return convertedValues;
  }

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const scrollValues = sceneInfo[currentScene].scrollValues;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = (window.pageYOffset - prevScrollHeight) / scrollHeight;
    switch (currentScene) {
      case 0:
        for (let index = 0; index < sceneInfo.length; index++) {
          const criteria = (scrollValues.messageItem[index].opacity.out.range.src + scrollValues.messageItem[index].opacity.in.range.dst) / 2;
          if (scrollRatio <= criteria) {
            objs.messageItem[index].style.opacity = calcScrollValues(scrollValues.messageItem[index].opacity.in);
            objs.messageItem[index].style.transform = `translateY(${calcScrollValues(scrollValues.messageItem[index].translateY.in)}%)`;
          } else {
            objs.messageItem[index].style.opacity = calcScrollValues(scrollValues.messageItem[index].opacity.out);
            objs.messageItem[index].style.transform = `translateY(${calcScrollValues(scrollValues.messageItem[index].translateY.out)}%)`;
          }
        }
        break;

      case 1:
        // Todo
        break;

      case 2:
        // Todo
        break;

      case 3:
        // Todo
        break;

      default:
        console.error('current scene null pointer error!!')
        break;
    }
  }

  window.addEventListener('resize', setLayout);
  window.addEventListener('load', setLayout);
  window.addEventListener('scroll', () => {
    scrollLoop();
    // console.log('currentScene: ', currentScene, ' prevScrollHeight: ', prevScrollHeight)
    if (!enterNewSectionFlag) playAnimation();
  });

})();