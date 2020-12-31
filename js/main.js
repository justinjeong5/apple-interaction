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
        ],
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
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
        ],
        videoImageInfo: {
          count: 300,
          sequence: { src: 0, dst: 299 },
          opacity: { src: 1, dst: 0, range: { src: 0.9, dst: 1 } },
        }
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
        container: document.querySelector('#scroll-section-2'),
        messageItem: [
          document.querySelector('#scroll-section-2 .item-0'),
          document.querySelector('#scroll-section-2 .item-1'),
          document.querySelector('#scroll-section-2 .item-2'),
        ],
        pin: [
          null,
          document.querySelector('#scroll-section-2 .item-1 .pin'),
          document.querySelector('#scroll-section-2 .item-0 .pin'),
        ],
        canvas: document.querySelector('#video-canvas-2'),
        context: document.querySelector('#video-canvas-2').getContext('2d'),
        videoImages: [],
      },
      scrollValues: {

        messageItem: [
          {// 0
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.15, dst: 0.2 } },
              out: { src: 1, dst: 0, range: { src: 0.3, dst: 0.35 } }
            },
            translateY: {
              in: { src: 20, dst: 0, range: { src: 0.05, dst: 0.1 } },
              out: { src: 0, dst: -20, range: { src: 0.3, dst: 0.35 } }
            }
          },
          {// 1
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.5, dst: 0.55 } },
              out: { src: 1, dst: 0, range: { src: 0.58, dst: 0.63 } }
            },
            translateY: {
              in: { src: 30, dst: 0, range: { src: 0.5, dst: 0.55 } },
              out: { src: 0, dst: -20, range: { src: 0.58, dst: 0.63 } }
            }
          },
          {// 2
            opacity: {
              in: { src: 0, dst: 1, range: { src: 0.77, dst: 0.82 } },
              out: { src: 1, dst: 0, range: { src: 0.85, dst: 0.9 } }
            },
            translateY: {
              in: { src: 30, dst: 0, range: { src: 0.77, dst: 0.82 } },
              out: { src: 0, dst: -20, range: { src: 0.85, dst: 0.9 } }
            }
          }
        ],
        pin: [
          null,
          {
            scaleY: {
              in: { src: 0.5, dst: 1, range: { src: 0.6, dst: 0.65 } }
            }
          },
          {
            scaleY: {
              in: { src: 0.5, dst: 1, range: { src: 0.87, dst: 0.92 } }
            }
          }
        ],
        videoImageInfo: {
          count: 960,
          sequence: { src: 0, dst: 959 },
          opacity: {
            in: { src: 0, dst: 1, range: { src: 0, dst: 0.1 } },
            out: { src: 1, dst: 0, range: { src: 0.85, dst: 0.95 } }
          },
        }
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        images: []
      },
      scrollValues: {
        imageInfo: {
          count: 2,
          imagePath: [
            '/images/blend-image-1.jpg',
            '/images/blend-image-2.jpg'
          ],
        },
        rectStartingY: 0,
        rectLeftX: { src: 0, dst: 0, range: { src: 0, dst: 0 } },
        rectRightX: { src: 0, dst: 0, range: { src: 0, dst: 0 } },
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

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  const setCanvasLayout = () => {
    const SIZ = sceneInfo[0].scrollValues.videoImageInfo.count
    sceneInfo[0].objs.videoImages = Array.from(Array(SIZ)).map((value, index) => {
      const imageElem = new Image();
      imageElem.src = `/video/001/IMG_${6726 + index}.JPG`;
      return imageElem;
    })
    // console.log(sceneInfo[0].objs.videoImages)
    const SIZ2 = sceneInfo[2].scrollValues.videoImageInfo.count
    sceneInfo[2].objs.videoImages = Array.from(Array(SIZ2)).map((value, index) => {
      const imageElem = new Image();
      imageElem.src = `/video/002/IMG_${7027 + index}.JPG`;
      return imageElem;
    })
    // console.log(sceneInfo[2].objs.videoImages)
    sceneInfo[3].objs.images = sceneInfo[3].scrollValues.imageInfo.imagePath.map((path) => {
      const imageElem = new Image();
      imageElem.src = path;
      return imageElem;
    })
    // console.log(sceneInfo[3].objs.images)
  }
  setCanvasLayout();

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
    let imageSequence;

    switch (currentScene) {
      case 0:
        imageSequence = Math.round(calcScrollValues(scrollValues.videoImageInfo.sequence));
        objs.context.drawImage(objs.videoImages[imageSequence], 0, 0)
        objs.canvas.style.opacity = calcScrollValues(scrollValues.videoImageInfo.opacity);

        for (let index = 0; index < scrollValues.messageItem.length; index++) {
          const criteria = (scrollValues.messageItem[index].opacity.out.range.src + scrollValues.messageItem[index].opacity.in.range.dst) / 2;
          if (scrollRatio <= criteria) {
            objs.messageItem[index].style.opacity = calcScrollValues(scrollValues.messageItem[index].opacity.in);
            objs.messageItem[index].style.transform = `translate3d(0, ${calcScrollValues(scrollValues.messageItem[index].translateY.in)}%, 0)`;
          } else {
            objs.messageItem[index].style.opacity = calcScrollValues(scrollValues.messageItem[index].opacity.out);
            objs.messageItem[index].style.transform = `translate3d(0, ${calcScrollValues(scrollValues.messageItem[index].translateY.out)}%, 0)`;
          }
        }
        break;

      case 1:
        //  Do Nothing Here Since it is Normal Section.
        break;

      case 2:
        imageSequence = Math.round(calcScrollValues(scrollValues.videoImageInfo.sequence));
        objs.context.drawImage(objs.videoImages[imageSequence], 0, 0)
        const criteria = (scrollValues.videoImageInfo.opacity.in.range.dst + scrollValues.videoImageInfo.opacity.out.range.src) / 2;
        if (scrollRatio < criteria) {
          objs.canvas.style.opacity = calcScrollValues(scrollValues.videoImageInfo.opacity.in);
        } else {
          objs.canvas.style.opacity = calcScrollValues(scrollValues.videoImageInfo.opacity.out);
        }

        for (let index = 0; index < scrollValues.messageItem.length; index++) {
          const criteria = (scrollValues.messageItem[index].opacity.out.range.src + scrollValues.messageItem[index].opacity.in.range.dst) / 2;
          if (scrollRatio <= criteria) {
            objs.messageItem[index].style.opacity = calcScrollValues(scrollValues.messageItem[index].opacity.in);
            objs.messageItem[index].style.transform = `translate3d(0, ${calcScrollValues(scrollValues.messageItem[index].translateY.in)}%, 0)`;
            if (objs.pin[index])
              objs.pin[index].style.transform = `scaleY(${calcScrollValues(scrollValues.pin[index].scaleY)})`;
          } else {
            objs.messageItem[index].style.opacity = calcScrollValues(scrollValues.messageItem[index].opacity.out);
            objs.messageItem[index].style.transform = `translate3d(0, ${calcScrollValues(scrollValues.messageItem[index].translateY.out)}%, 0)`;
            if (objs.pin[index])
              objs.pin[index].style.transform = `scaleY(${calcScrollValues(scrollValues.pin[index].scaleY)})`;
          }
        }
        if (scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const scrollValues = sceneInfo[3].scrollValues
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          widthRatio > heightRatio ? canvasScaleRatio = widthRatio : canvasScaleRatio = heightRatio;
          objs.canvas.style.transform = `scale(${canvasScaleRatio})`
          objs.context.fillStyle = 'white';
          objs.context.drawImage(objs.images[0], 0, 0);

          const revisedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const whiteRectWidth = revisedInnerWidth * 0.15
          scrollValues.rectLeftX.src = (objs.canvas.width - revisedInnerWidth) / 2;
          scrollValues.rectLeftX.dst = scrollValues.rectLeftX.src - whiteRectWidth;
          scrollValues.rectRightX.src = scrollValues.rectLeftX.src + revisedInnerWidth - whiteRectWidth;
          scrollValues.rectRightX.dst = scrollValues.rectRightX.src + whiteRectWidth;

          objs.context.fillRect(scrollValues.rectLeftX.src, 0, parseInt(whiteRectWidth), objs.canvas.height);
          objs.context.fillRect(scrollValues.rectRightX.src, 0, parseInt(whiteRectWidth), objs.canvas.height);
        }
        break;

      case 3:
        // to fit tightly for width, height
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;
        widthRatio > heightRatio ? canvasScaleRatio = widthRatio : canvasScaleRatio = heightRatio;
        // console.log(widthRatio, heightRatio, canvasScaleRatio)
        objs.canvas.style.transform = `scale(${canvasScaleRatio})`
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0);

        if (!scrollValues.rectStartingY) {
          // scrollValues.rectStartingY = objs.canvas.getBoundingClientRect().top
          scrollValues.rectStartingY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          // console.log(scrollValues.rectStartingY)
          scrollValues.rectLeftX.range.src = (window.innerHeight / 2) / scrollHeight;
          scrollValues.rectRightX.range.src = (window.innerHeight / 2) / scrollHeight;
          scrollValues.rectLeftX.range.dst = scrollValues.rectStartingY / scrollHeight;
          scrollValues.rectRightX.range.dst = scrollValues.rectStartingY / scrollHeight;
        }

        const revisedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        // console.log(revisedInnerWidth)
        const whiteRectWidth = revisedInnerWidth * 0.15
        scrollValues.rectLeftX.src = (objs.canvas.width - revisedInnerWidth) / 2;
        scrollValues.rectLeftX.dst = scrollValues.rectLeftX.src - whiteRectWidth;
        scrollValues.rectRightX.src = scrollValues.rectLeftX.src + revisedInnerWidth - whiteRectWidth;
        scrollValues.rectRightX.dst = scrollValues.rectRightX.src + whiteRectWidth;
        // console.log(scrollValues.rectLeftX, scrollValues.rectRightX)

        objs.context.fillRect(calcScrollValues(scrollValues.rectLeftX), 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(calcScrollValues(scrollValues.rectRightX), 0, parseInt(whiteRectWidth), objs.canvas.height);
        break;

      default:
        console.error('current scene null pointer error!!')
        break;
    }
  }

  window.addEventListener('resize', setLayout);
  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0)
    sceneInfo[2].objs.context.drawImage(sceneInfo[2].objs.videoImages[0], 0, 0)
  });
  window.addEventListener('scroll', () => {
    scrollLoop();
    // console.log('currentScene: ', currentScene, ' prevScrollHeight: ', prevScrollHeight)
    if (!enterNewSectionFlag) playAnimation();
  });

})();