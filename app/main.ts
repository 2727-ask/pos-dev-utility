import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ipcMain } from 'electron/main';
import * as express from 'express';
import * as cors from 'cors';
import * as detect from 'detect-port';
import { Proxy } from './interfaces/proxy';
import { Message } from './interfaces/message';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

function reportmessage(isError: boolean, msg: string) {
  return { isError: isError, msg: msg };
}

let servers: Map<number, any> = new Map();

ipcMain.handle('startProxyService', async (event, query: Proxy) => {
  let isProxyStarted = false;
  try {
    console.log('Starting Proxy Service');
    const app = express();
    app.use(cors());
    app.use(
      '',
      createProxyMiddleware({
        target: query.url,
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        },
      })
    );

    try {
      console.log('Query Port is', query.port);
      let port = await detect(query.port);
      console.log('Detected port is', port);
      if (port == query.port) {
        console.log('PORT FOUND');
        const server = app.listen(port);
        servers.set(port, server);
        return reportmessage(false, 'Proxy started sucessfully');
      } else {
        return reportmessage(true, 'Port not available');
      }
    } catch (error) {
      console.log(error);
      return reportmessage(true, `${error}`);
    }
  } catch (error) {
    console.log('Error', error);
    return reportmessage(true, `${error}`);
  }
});

ipcMain.handle('stopProxyServer', async (event, query: number) => {
  const server = servers.get(Number(query));
  console.log("Running servers are", servers);
  console.log("PORT is", query);
  console.log("Attempting to stop",server);
  if (server) {
    server.close(() => {
      console.log('Server has been stopped');
      servers.delete(query);
    });
    return reportmessage(false, 'Proxy stopped sucessfully.');
  }else{
    return reportmessage(true, `Proxy server not found.`);
  }
});
