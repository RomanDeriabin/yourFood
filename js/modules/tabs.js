function tabs() {

  const tabContainer = document.querySelector('.tabcontainer');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  
  function hideTab() {
    tabsContent.forEach(tabBlock => {
      tabBlock.style.display = 'none';
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    })
  };

  function showTab(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTab();
  showTab();

  tabContainer.addEventListener('click', (event) => {
    let target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTab();
          showTab(i);
        }
      })
    };
  });
}

module.exports = tabs;