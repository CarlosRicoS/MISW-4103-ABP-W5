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
    await page.screenshot({path:'./test4/logged in.png'})
    console.log('Successful logged in')
    
    await page.getByTitle("Published").click()
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test4/published_posts.png'})
    console.log('Published Posts')

    await page.locator('.gh-posts-list-item-group').first().click({force : true});
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test4/updating_post.png'})
    console.log('Updating Post')

    await page.locator('[placeholder="Post title"]').fill('EP-012');
    await page.locator('[placeholder="Post title"]').press('Enter');
    await page.click('text = Update');
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./test4/post_updated.png'})
    console.log('Post updated')


    await browser.close();
  }
  return;
})();//Llamado propio de la función