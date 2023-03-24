function cards() {
  
  const menuCardContainer = document.querySelector('.menu__field .container');

  menuCardContainer.innerHTML = '';

  class MenuCard {
    constructor (img, altimg, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = parentSelector;
      this.classes = classes;
    }
    showCard() {
      const menuCardItem = document.createElement('div');
      this.classes.forEach(className => menuCardItem.classList.add(className));
      this.parentSelector.append(menuCardItem);
      menuCardItem.insertAdjacentHTML('beforeend', `
        <img src=${this.img} alt="vegy">
        <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`);
    }
  }

  // CARDS
  
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
     throw new Error(`Could not fetch ${url}, with status ${res.status}`);
    }
    return await res.json();
  }

  getResource('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, menuCardContainer, 'menu__item').showCard()
    });
  });
}
export default cards;