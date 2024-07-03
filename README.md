# Pot (划词翻译和 OCR)

> 🌈 一个跨平台的划词翻译软件

## 声明

- 使用本插件前，请先[下载 Pot 划词翻译](https://pot-app.com/)，使用插件前请先打开软件（推荐开机自启）
- 本插件只是用来在 Utools 快速中启动 Pot 划词翻译及 OCR
- 该软件作者在[Github](https://github.com/pot-app/pot-desktop)上，若有软件方面疑问请在[项目的 Issues](https://github.com/pot-app/pot-desktop/issues)提交
- 本软件的翻译以及 OCR 均可调用 OpenAI 服务
  - OCR 需支持视觉识别的模型识别，如 gpt-4o（推荐）
  - 支持自定义 prompt 和 base_url
  - 需要自备 api，其中 ai 翻译可内置设置，ai OCR 需要下载[OpenAI 文字识别插件](https://github.com/pot-app/pot-app-recognize-plugin-openai)
  - 也可下载 pot 的[其他插件](https://pot-app.com/plugin.html)
- 软件的默认端口号不要修改
- 推荐将输入翻译和 OCR 识别加入超级面板
- 本插件支持 windows,macos
- 本插件[Github 仓库地址](https://github.com/czh020110/pot-utools)

## 插件功能关键词

<div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032021469.png" alt="202407032021469" width="60%" height="%"></div>

<center> 在 utools 种输入以上关键字可调用对应快捷方式</center>
<center> (推荐将需要的功能加入超级面板)</center>

## 软件及本插件功能

| 划词翻译                                                                                                                                                                                                                                                                                                                                                                | 输入翻译                                                                                                                                                                                                                                                                                                                                                                | utools 框输入翻译                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 鼠标选中需要翻译的文本，按下中间跳出超级面板选择 pot 翻译，或者按下设置的划词翻译快捷键                                                                                                                                                                                                                                                                                 | 在 utools 输入框输入 pots 可以快捷打开 pot 输入翻译，或按下输入翻译快捷键呼出翻译窗口，输入待翻译文本后按下 回车 翻译                                                                                                                                                                                                                                                   | 在 utools 中输入任意文字选择 pot 翻译即可快速调用                                                                                                                                                                                                                                                                                                                         |
| <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032000009.gif" alt="202407032000009" width="%" height="%"></div> <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032014673.png" alt="202407032014673" width="50%" height="%"></div> | <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032001741.gif" alt="202407032001741" width="%" height="%"></div> <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032017128.png" alt="202407032017128" width="40%" height="%"></div> | <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032007987.png" alt="202407032007987" width="60%" height="%"></div> <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032108781.png" alt="202407032108781" width="60%" height="%"></div> |

| 剪切板监听模式                                                                                                                                                                     | 截图 OCR                                                                                                                                                                           | 截图翻译                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 在任意翻译面板上点击左上角图标启动剪切板监听默认，复制文字即可完成翻译                                                                                                             | utools 中输入 poto 选择 pot 的 OCR，或按下截图 OCR 快捷键后框选需要识别区域即可完成识别                                                                                            | 按下截图翻译快捷键后框选需要识别区域即可完成翻译                                                                                                                                   |
| <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032002345.gif" alt="202407032002345" width="%" height="%"></div> | <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032003331.gif" alt="202407032003331" width="%" height="%"></div> | <div align=center><img src="https://mirror.ghproxy.com/raw.githubusercontent.com/czh020110/Mypic/image/imag/202407032003738.gif" alt="202407032003738" width="%" height="%"></div> |
