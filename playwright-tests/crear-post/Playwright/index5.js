//Importar Playwright
const playwright = require('playwright');

const url = 'http://localhost:2368/ghost/';

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './test1/pagina.png'})
    console.log('Project loaded')


    //Interactuar con la aplicación web
    await page.locator('[placeholder="jamie@example.com"]').fill('s.gomezp2345@uniandes.edu.co');
    await page.locator('[placeholder="•••••••••••••••"]').fill('Miso1000929441*');
    await page.click('text = Sign in →')
    await new Promise(r => setTimeout(r, 9000));
    await page.screenshot({path:'./test5/logged in.png'})
    console.log('Successful logged in')
    
    await page.getByTitle("Drafts").click()
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test5/drafts.png'})
    console.log('Drafts')

    await page.locator('.gh-posts-list-item-group').first().click({force : true});
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test5/first_draft.png'})
    console.log('in a draft')

    await page.getByTitle("Settings").click()

    await page.locator('.settings-menu-delete-button').first().click({force : true});
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test5/deleting_draft.png'})
    console.log('deleting a draft')

    await page.locator('[data-test-button="delete-post-confirm"]').click()
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test5/draft deleted.png'})
    console.log('draft deleted')

    await browser.close();
  }
  return;
})();//Llamado propio de la función