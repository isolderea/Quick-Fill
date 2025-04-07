fetch('testData.json')
  .then((response) => response.json())
  .then((data) => {
    const popup = document.body;
    for (const category in data) {
      const categoryDiv = document.createElement('div');
      categoryDiv.innerHTML = `<h3>${category}</h3>`;
      data[category].forEach((testString) => {
        const button = document.createElement('button');
        button.textContent = testString;
        button.addEventListener('click', () => {
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'injectString',
              value: testString,
            });
          });
        });
        categoryDiv.appendChild(button);
      });
      popup.appendChild(categoryDiv);
    }

    // Add Faker.js buttons
    const fakerDiv = document.createElement('div');
    fakerDiv.innerHTML = '<h3>Faker.js</h3>';

    const nameButton = document.createElement('button');
    nameButton.textContent = 'Name';
    nameButton.addEventListener('click', () => injectFakerData(faker.name.findName()));
    fakerDiv.appendChild(nameButton);

    const emailButton = document.createElement('button');
    emailButton.textContent = 'Email';
    emailButton.addEventListener('click', () => injectFakerData(faker.internet.email()));
    fakerDiv.appendChild(emailButton);

    const loremButton = document.createElement('button');
    loremButton.textContent = 'Lorem';
    loremButton.addEventListener('click', () => injectFakerData(faker.lorem.sentence()));
    fakerDiv.appendChild(loremButton);

    popup.appendChild(fakerDiv);
  });

function injectFakerData(data) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'injectString',
      value: data,
    });
  });
}