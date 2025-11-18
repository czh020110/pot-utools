const { exec } = require("child_process");
const http = require("http"); // 1. 新增 http 模块的引入

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
        exec(
          "where /r D:\\Software\\Pot\\ pot.exe",
          (error, stdout, stderr) => {
            if (error) {
              console.error(`执行命令出错: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`命令执行错误: ${stderr}`);
              return;
            }
            const potExePath = stdout.trim();
            // 在这里使用 potExePath，原有的 replace 是有问题的，直接使用即可
            exec(`start "" "${potExePath}"`, (error) => {
              if (error) {
                console.error(`启动 pot.exe 失败: ${error}`);
                return;
              }
            });
            exec(`curl -s ${ocrUrl}`);
          }
        );
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
function potSelect() {
  Fun("/selection_translate");
}

// pot-OCR识别功能
function potO() {
  Fun("/ocr_recognize");
}

// pot-OCR翻译功能
function potOT() {
  Fun("/ocr_translate");
}

// pot-设置
function potsetting() {
  Fun("/config");
}

// 3. utools输入框使用pot翻译 (函数被重写)
function Translate_text(text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    // 如果没有有效文本，则直接退出插件
    utools.outPlugin();
    return;
  }

  utools.hideMainWindow();

  // 定义一个发送请求的函数，方便复用
  const sendRequest = () => {
    const postData = text;
    const options = {
      hostname: "127.0.0.1",
      port: 60828,
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Length": Buffer.byteLength(postData, "utf8"),
      },
    };

    const req = http.request(options);
    // 错误处理是可选的，但建议加上
    req.on("error", (e) => {
      console.error(`请求 pot 服务失败: ${e.message}`);
      // 错误通常意味着 pot 未启动，下面的逻辑会处理启动
    });
    req.write(postData);
    req.end();
  };

  // 检查并启动 pot 程序的逻辑
  if (utools.isWindows()) {
    exec('tasklist | find /i "pot.exe"', (error, stdout, stderr) => {
      if (stdout.trim()) {
        // Pot 正在运行，直接发送请求
        sendRequest();
      } else {
        // Pot 未运行，先启动它
        exec(
          "where /r D:\\Software\\Pot\\ pot.exe",
          (findError, findStdout) => {
            if (findError || !findStdout.trim()) {
              console.error(`未找到 pot.exe: ${findError}`);
              utools.showNotification("启动 Pot 失败：未找到程序");
              return;
            }
            const potExePath = findStdout.trim();
            exec(`start "" "${potExePath}"`, (startError) => {
              if (startError) {
                console.error(`启动 pot.exe 失败: ${startError}`);
                return;
              }
              // 等待一下，给 pot 启动时间
              setTimeout(sendRequest, 1500);
            });
          }
        );
      }
    });
  } else {
    // macOS / Linux 逻辑
    exec('ps aux | grep "[p]ot"', (error, stdout, stderr) => {
      if (stdout.trim()) {
        // Pot 正在运行
        sendRequest();
      } else {
        // Pot 未运行
        exec(
          "find /Applications -name 'pot' -type f",
          (findError, findStdout) => {
            if (findError || !findStdout.trim()) {
              console.error(`未找到 pot: ${findError}`);
              utools.showNotification("启动 Pot 失败：未找到程序");
              return;
            }
            const potPath = findStdout.trim();
            exec(`open "${potPath}"`, (startError) => {
              if (startError) {
                console.error(`启动 pot 失败: ${startError}`);
                return;
              }
              // 等待一下，给 pot 启动时间
              setTimeout(sendRequest, 1500);
            });
          }
        );
      }
    });
  }
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
          t: "如何使用?",
          d: "请看教程→",
          p: "index.html", //页面, 只能是相对路径
        },
      ],
      // 子输入框为空时的占位符,默认为字符串"搜索"
      placeholder: "Pot翻译、OCR",
    },
  },
  // 2. 修改这里的 enter 函数
  "translate-text": {
    mode: "none",
    args: {
      enter: (action) => {
        // 直接传递 action.payload，不再需要任何字符串替换！
        Translate_text(action.payload);
      },
    },
  },
  "pot-select": {
    mode: "none",
    args: {
      enter: (action) => {
        potSelect();
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
  "pot-ot": {
    mode: "none",
    args: {
      enter: (action) => {
        potOT();
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
