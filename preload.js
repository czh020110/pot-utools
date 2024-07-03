const { exec } = require("child_process");

// 定义pot应用程序的HTTP接口地址
const potBaseUrl = "http://127.0.0.1:60828";

function Fun(endpoint) {
  if (utools.isWindows()) {
    const ocrUrl = potBaseUrl + endpoint;
    exec(`curl -s ${ocrUrl}`);
    exec('tasklist | find /i "pot.exe"', (error, stdout, stderr) => {
      if (stdout.trim()) {
        console.log("pot.exe 已启动");
      } else {
        exec("where /r D:\\pot\\ pot.exe", (error, stdout, stderr) => {
          if (error) {
            console.error(`执行命令出错: ${error}`);
            return;
          }
          if (stderr) {
            console.error(`命令执行错误: ${stderr}`);
            return;
          }
          const potExePath = stdout.trim();
          const fixedPath = potExePath.replace(/\\/g, "\\\\");
          // 在这里使用 fixedPath
          exec(`start "" "${fixedPath}"`, (error) => {
            if (error) {
              console.error(`启动 pot.exe 失败: ${error}`);
              return;
            }
          });
          exec(`curl -s ${ocrUrl}`);
        });
      }
    });
  } else {
    const ocrUrl = potBaseUrl + endpoint;
    exec(`curl -s ${ocrUrl}`);
    exec('ps aux | grep "[p]ot"', (error, stdout, stderr) => {
      if (stdout.trim()) {
        console.log("pot 已启动");
      } else {
        exec(
          "find /Applications -name 'pot' -type f",
          (error, stdout, stderr) => {
            if (error) {
              console.error(`执行命令出错: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`命令执行错误: ${stderr}`);
              return;
            }
            const potPath = stdout.trim();
            // 在这里使用 potPath
            exec(`open "${potPath}"`, (error) => {
              if (error) {
                console.error(`启动 pot 失败: ${error}`);
                return;
              }
            });
            exec(`curl -s ${ocrUrl}`);
          }
        );
      }
    });
  }

  utools.hideMainWindow();
  utools.outPlugin();
}

// pot-输入翻译
function potS() {
  Fun("/input_translate");
}

// pot-划词翻译功能
function potT() {
  Fun("/selection_translate");
}

// pot-OCR识别功能
function potO() {
  Fun("/ocr_recognize");
}

// pot-设置
function potsetting() {
  Fun("/config");
}
// utools输入框使用pot翻译
function Translate_text(text) {
  if (utools.isWindows()) {
    const command = `curl -X POST "http://127.0.0.1:60828/" -d "${text}"`;
    exec(command);
    exec('tasklist | find /i "pot.exe"', (error, stdout, stderr) => {
      if (stdout.trim()) {
        console.log("pot.exe 已启动");
      } else {
        exec("where /r D:\\pot\\ pot.exe", (error, stdout, stderr) => {
          if (error) {
            console.error(`执行命令出错: ${error}`);
            return;
          }
          if (stderr) {
            console.error(`命令执行错误: ${stderr}`);
            return;
          }
          const potExePath = stdout.trim();
          const fixedPath = potExePath.replace(/\\/g, "\\\\");
          // 在这里使用 fixedPath
          exec(`start "" "${fixedPath}"`, (error) => {
            if (error) {
              console.error(`启动 pot.exe 失败: ${error}`);
              return;
            }
          });
          exec(command);
        });
      }
    });
  } else {
    const command = `curl -X POST "http://127.0.0.1:60828/" -d "${text}"`;
    exec(command);
    exec('ps aux | grep "[p]ot"', (error, stdout, stderr) => {
      if (stdout.trim()) {
        console.log("pot 已启动");
      } else {
        exec(
          "find /Applications -name 'pot' -type f",
          (error, stdout, stderr) => {
            if (error) {
              console.error(`执行命令出错: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`命令执行错误: ${stderr}`);
              return;
            }
            const potPath = stdout.trim();
            // 在这里使用 potPath
            exec(`open "${potPath}"`, (error) => {
              if (error) {
                console.error(`启动 pot 失败: ${error}`);
                return;
              }
            });
            exec(command);
          }
        );
      }
    });
  }
  utools.hideMainWindow();
  utools.outPlugin();
}

// 导出功能
window.exports = {
  "pot-interface": {
    mode: "doc", // 文档模式
    args: {
      // 索引集合
      indexes: [
        {
          t: "如何使用？",
          d: "请看教程→",
          p: "index.html", //页面, 只能是相对路径
        },
      ],
      // 子输入框为空时的占位符，默认为字符串"搜索"
      placeholder: "Pot翻译、OCR",
    },
  },
  "translate-text": {
    mode: "none",
    args: {
      enter: (action) => {
        const { payload } = action;
        Translate_text(payload);
      },
    },
  },
  "pot-t": {
    mode: "none",
    args: {
      enter: (action) => {
        potT();
      },
    },
  },
  "pot-o": {
    mode: "none",
    args: {
      enter: (action) => {
        potO();
      },
    },
  },
  "pot-s": {
    mode: "none",
    args: {
      enter: (action) => {
        potS();
      },
    },
  },
  "pot-setting": {
    mode: "none",
    args: {
      enter: (action) => {
        potsetting();
      },
    },
  },
};
