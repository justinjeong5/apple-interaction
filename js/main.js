(() => {
  let sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5,
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
    console.log(sceneInfo)
  }

  window.addEventListener('resize', setLayout);
  setLayout();
})();