import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 for(const mobile of(process.argv.includes("--mobile")?[true]:[false,true])){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1100,height:800},isMobile:mobile,hasTouch:mobile});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/Luma.html');await page.locator('#start:not([disabled])').click();await context.setOffline(true);
  await page.locator('#journal').click();await page.locator('[data-toy="forky"]').click();
  const before=await page.evaluate(()=>__luma.snapshot());
  await page.locator('#part-choice').selectOption('mouth');await page.getByRole('button',{name:'Move right',exact:true}).click();await page.locator('#rotate-part').click();
  assert.deepEqual(await page.evaluate(()=>__luma.snapshot().parts.forky.mouth),[52,49,15,true]);
  await page.locator('#part-choice').selectOption('eye2');const board=page.locator('#parts');await board.scrollIntoViewIfNeeded();const bounds=await board.boundingBox();
  const tx=bounds.x+bounds.width*.6,ty=bounds.y+bounds.height*.6;
  await page.evaluate(()=>{window.touchTrace=[];for(const type of['pointerdown','pointerup','pointercancel','touchstart','touchend','click'])window.addEventListener(type,e=>touchTrace.push({type,target:e.target.id||e.target.dataset?.part||e.target.tagName,x:e.clientX,y:e.clientY,pointerType:e.pointerType}),true)});
  if(mobile)await page.touchscreen.tap(tx,ty);else await page.mouse.click(tx,ty);await page.waitForTimeout(500);
  const placed=await page.evaluate(()=>__luma.snapshot().parts.forky.eye2);await page.screenshot({path:'/tmp/forky-tap-check.png'});assert.ok(Math.abs(placed[0]-60)<1&&Math.abs(placed[1]-60)<1,JSON.stringify({mobile,placed,bounds,target:[tx,ty],hit:await page.evaluate(([x,y])=>({tag:document.elementFromPoint(x,y)?.outerHTML.slice(0,250),viewport:[innerWidth,innerHeight],scroll:[scrollX,scrollY],trace:touchTrace,choice:document.querySelector('#part-choice').value}),[tx,ty])}));
  const eye=page.locator('[data-part="eye1"]');await eye.scrollIntoViewIfNeeded();const e=await eye.boundingBox();
  if(mobile){const cd=await context.newCDPSession(page);await cd.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:e.x+e.width/2,y:e.y+e.height/2,id:1}]});await cd.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:e.x+e.width/2-24,y:e.y+e.height/2+20,id:1}]});await cd.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
  else{await page.mouse.move(e.x+e.width/2,e.y+e.height/2);await page.mouse.down();await page.mouse.move(e.x+e.width/2-24,e.y+e.height/2+20,{steps:4});await page.mouse.up();}
  const moved=await page.evaluate(()=>__luma.snapshot());assert.ok(moved.parts.forky.eye1[0]<44);assert.ok(moved.parts.forky.eye1[1]>35);assert.equal(moved.x,before.x);assert.equal(moved.z,before.z);assert.equal(moved.yaw,before.yaw);
  await page.waitForTimeout(250);assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('luma-restored-v3')).parts.forky),moved.parts.forky);
  await page.screenshot({path:`/tmp/forky-fixed-${mobile?'touch':'desktop'}.png`});
  await page.locator('#original').click();assert.deepEqual(await page.evaluate(()=>__luma.snapshot().parts.forky.eye1),[44,35,0,true]);
  await page.locator('[data-toys]').click();await page.locator('[data-toy="potato"]').click();await page.locator('#apart').click();assert.ok(await page.evaluate(()=>Object.values(__luma.snapshot().parts.potato).every(p=>!p[3])));await page.locator('#original').click();assert.ok(await page.evaluate(()=>Object.values(__luma.snapshot().parts.potato).every(p=>p[3])));
  assert.deepEqual(errors,[]);console.log(JSON.stringify({mobile,controls:true,tapToPlace:true,drag:true,reset:true,saved:true,worldInputIsolated:true,potato:true,offline:true,errors}));
  await context.close();
 }
}finally{await browser.close()}
