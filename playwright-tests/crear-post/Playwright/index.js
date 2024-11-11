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
    await page.screenshot({path:'./test1/logged in.png'})
    console.log('Successful logged in')
    
    await page.getByTitle("New post").click()
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test1/new post.png'})
    console.log('Creating a Post')


    await page.locator('[placeholder="Post title"]').fill('EP-009');
    await page.locator('[placeholder="Post title"]').press('Enter');
    await page.click('text = Publish');
    await new Promise(r => setTimeout(r, 1000));
    await page.click('text = Continue, final review →');
    await new Promise(r => setTimeout(r, 3000));
    await page.locator('[data-test-button="confirm-publish"]').click({force: true});
    await new Promise(r => setTimeout(r, 9000));
    await page.screenshot({path:'./test1/post_published.png'})
    console.log('Post created')
    await browser.close();
  }
  return;
})();//Llamado propio de la función