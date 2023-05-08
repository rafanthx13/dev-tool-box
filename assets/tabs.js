fetch('https://raw.githubusercontent.com/rafanthx13/dev-tool-box/main/assets/tabs.json')
    .then(response => response.json())
    .then(data => createTabs(data))
    .catch(error => console.error('Erro ao carregar os dados:', error));

function createTabs(data) {
    const tabList = document.getElementById('tabList');
    const tabContent = document.getElementById('tabContent');

    // Itera sobre cada objeto no array de dados
    data.forEach(item => {
        // Cria uma nova aba
        const tab = document.createElement('li');
        tab.classList.add('nav-item');

        // Cria o link da aba
        const link = document.createElement('a');
        link.classList.add('nav-link');
        link.setAttribute('id', item.key + '-tab');
        link.setAttribute('data-toggle', 'tab');
        link.setAttribute('href', '#' + item.key);
        link.setAttribute('role', 'tab');
        link.setAttribute('aria-controls', item.key);
        link.setAttribute('aria-selected', 'false');
        link.innerText = item.value;

        tab.appendChild(link);
        tabList.appendChild(tab);

        // Cria o conteúdo da aba
        const tabPane = document.createElement('div');
        tabPane.classList.add('tab-pane', 'fade');
        tabPane.setAttribute('id', item.key);
        tabPane.setAttribute('role', 'tabpanel');
        tabPane.setAttribute('aria-labelledby', item.key + '-tab');
        tabPane.innerText = 'Conteúdo da aba ' + item.value;

        tabContent.appendChild(tabPane);
    });
}

