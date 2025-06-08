# 使用 Ollama 本地运行部署大模型

本教程以 Mac M 系列芯片为例，介绍 Ollama 部署 Qwen3 系列模型的全流程。大部分指令同样适用于其他 macOS、Linux 及 Windows（WSL）环境。

## 1. 本地部署大模型有什么用以及好处？

在个人设备上本地运行大模型，可以充分利用设备算力，在保障隐私的同时，灵活地构建个性化的 AI 应用环境。

- 数据隐私和安全: 在本地运行模型可确保数据保留在自己的设备上，不会发送到任何云服务商，这对于处理敏感信息至关重要。

- 完全控制和定制化: 可以完全控制模型的配置、更新和使用方式。可以根据特定需求对模型进行微调，使其更符合使用场景。

- 离线可用性: 本地模型无需联网即可使用。在断网环境或网络受限场景下，依然可以照常与模型交互。这对于需要长期离线运行的应用非常关键。

## 2. Ollama 详解：安装与基础操作

### 2.1 Ollama 简介

Ollama 是一个轻量级、跨平台的本地大模型运行框架，专为简化大模型的本地部署而设计。它支持多种主流模型（如 Llama 3, Qwen 等），提供简洁的命令行界面和 RESTful API，使得用户可以像运行普通应用程序一样轻松地部署和使用 LLM。Ollama 的出现，极大地降低了用户在本地运行 LLM 的门槛，这种“开箱即用”的特性，是 Ollama 广受欢迎的关键原因之一。

### 2.2 安装 Ollama

#### 方法一：官网下载 (推荐)

1. 访问 Ollama 官方网站：https://ollama.com (原 ollama.ai) 。
2. 点击 “Download” 按钮下载适用于 macOS 的安装包。
3. 下载完成后，解压缩并打开安装程序，按照屏幕提示将 Ollama 应用程序移动到“应用程序”文件夹中。
4. 从“应用程序”文件夹中启动 Ollama。启动后，您会在菜单栏看到一个羊驼图标，表示 Ollama 正在后台运行。

#### 方法二：Homebrew 安装

```bash
brew install ollama
```

#### 方法三：命令行安装

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2.3 验证安装

打开终端，输入以下命令查看 Ollama 版本，确认安装成功 ：

```bash
ollama --version
```

如果看到类似 `Ollama version is 0.x.x` 的输出，说明安装成功。

### 2.4 Ollama 常用命令

Ollama 主要通过命令行进行交互和管理。其命令设计借鉴了 Docker 的语法，对于熟悉 Docker 的用户会感到非常亲切 。以下是一些核心命令:

| 命令分类       | 命令                                  | 功能描述              | 示例                                    |
| -------------- | ------------------------------------- | --------------------- | --------------------------------------- |
| **模型管理**   | `ollama pull <model>`                 | 下载模型              | `ollama pull qwen3:14b`                 |
|                | `ollama list`                         | 列出本地模型          | `ollama list`                           |
|                | `ollama rm <model>`                   | 删除模型              | `ollama rm qwen3:14b`                   |
|                | `ollama show <model>`                 | 显示模型信息          | `ollama show qwen3:14b`                 |
| **模型运行**   | `ollama run <model>`                  | 运行模型进行对话      | `ollama run qwen3:14b`                  |
|                | `ollama run <model> "<prompt>"`       | 单次问答              | `ollama run qwen3:14b "你好"`           |
| **服务管理**   | `ollama ps`                           | 查看运行中的模型      | `ollama ps`                             |
| **自定义模型** | `ollama create <name> -f <modelfile>` | 从 Modelfile 创建模型 | `ollama create my-model -f ./Modelfile` |

## 3. 模型获取与管理

### 3.1 使用 Ollama Pull 获取模型

从 Ollama 官方模型库拉取模型是最直接的方式。Ollama 模型库中包含了许多预先转换和优化过的流行开源模型。可以先在 [Ollama Models](https://ollama.com/search)查看模型列表

命令格式：`ollama pull <model_name:tag>`

- `<model_name>`：模型系列名称，如 qwen、llama3、mistral。
- `<tag>`：用于指定模型的特定版本、参数大小、是否为指令微调版或特定的量化级别。

```bash
# 下载最新版本
ollama pull qwen3:14b

# 查看可用模型
ollama list
```

![images](/images/blog/ollama-local-llm-tutorial/b8e3f2a1-4c7d-4f89-b2e6-3a8c9d1e5f42.png)

### 3.2 从 Hugging Face 获取量化模型

#### 使用 ollama pull 在线拉取

Ollama 集成了对 Hugging Face 等模型仓库的支持，可以直接通过命令从网上拉取模型。例如，我们以 Qwen3-14B 模型为例，执行

```bash
ollama pull hf.co/Qwen/Qwen3-14B-GGUF:Q8_0
```

![images](/images/blog/ollama-local-llm-tutorial/d7f4e8b2-6a9c-4d51-8e7f-2b5c8a3d6f91.png)

#### 手动下载 Hugging Face 模型包

有时希望手动获取模型文件（例如网络限制或需要离线转移模型）。此时可以直接在 Hugging Face 网站上找到目标模型仓库（如 [Qwen/Qwen3-14B-GGUF](https://huggingface.co/Qwen/Qwen3-14B-GGUF)），下载所需量化等级的 `.gguf` 模型文件到本地。例如下载 Qwen3-14B-Q6_K.gguf。下载完成后，Ollama 通过 Modelfile 来导入本地 GGUF 模型文件。

![images](/images/blog/ollama-local-llm-tutorial/c9a2b5e3-8f1d-4c76-9a4e-7d2f5b8c1a64.png)

#### 导入到 Ollama

1. 新建一个文本文件命名为 Modelfile，内容只需一行，用来表示要基于指定路径的 GGUF 文件创建模型：

```bash
FROM ./Qwen3-14B-Q6_K.gguf
```

2. 执行命令将其导入：

```bash
ollama create qwen3-local -f Modelfile
```

### 3.3 自定义模型量化 (使用 llama.cpp)

从 Hugging Face 下载原始的 FP16/BF16 模型，并自行进行 GGUF 量化，可以使用 llama.cpp 工具集。这能让你更精细地控制模型大小/性能与准确度之间的平衡，或者量化一些尚未提供 GGUF 格式的模型。

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make # 或者使用 cmake 等方式编译，确保编译出 quantize 等工具

# 示例：将模型量化为 Q4_K_M
./quantize ./models/my_model/ggml-model-f16.gguf ./models/my_model/ggml-model-Q4_K_M.gguf Q4_K_M
```

### 3.4 不同量化版本对比（Qwen2.5-14B）

| 量化方案                    | 模型文件大小（≈） | 建议内存预算    | 特点说明                                                                                                                                                                   |
| --------------------------- | ----------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4-bit** (`Q4_K_M`)        | 9 GB              | ≥ 12-16 GB 内存 | 权重用 4 比特存储，模型体积最小，运行内存占用最低。相应地生成结果较 8-bit 模型有一定质量下降，但能在有限内存机器上运行。由于内存带宽压力小，4-bit 模型推理速度通常也最快。 |
| **5-bit** (`Q5_0`/`Q5_K_M`) | \~10-10.5 GB      | ≥ 16 GB 内存    | 5 比特量化提供比 4-bit 略高的精度，模型大小稍增大一些。属于在质量和资源之间折中的方案。                                                                                    |
| **6-bit** (`Q6_K`)          | 12.1 GB           | ≥ 16 GB 内存    | 6 比特进一步提高了精度，模型文件更大。生成结果更接近全精度，尤其适合有足够内存又希望提升准确率的情况。                                                                     |
| **8-bit** (`Q8_0`)          | 15.7 GB           | ≥ 16 GB 内存    | 8 比特量化几乎保留了原始模型的大部分信息，生成质量最佳，接近 FP16 全精度。但模型文件和内存需求也接近原始规模。                                                             |

## 4. Modelfile 详解与自定义模型创建

### 4.1 Modelfile 基础概念

Ollama 引入了 Modelfile 概念来方便地创建和分享自定义模型配置。Modelfile 本质上是一个文本配置文件，可以在其中指定模型的基础、参数、系统提示等信息，相当于模型的“配方”或蓝图。通过编写 Modelfile 可以基于已有模型调整其行为，或者将多个组件组合成新模型，然后用 ollama create 命令生成自定义模型实例。

### 4.2 Modelfile 语法结构

```dockerfile
# 基础模型
FROM <model_path_or_name>

# 模型参数
PARAMETER <parameter_name> <value>

# 对话模板
TEMPLATE """<template_content>"""

# 系统提示
SYSTEM """<system_message>"""

# 适配器（可选）
ADAPTER <adapter_path>
```

### 4.3 详细配置说明

#### FROM 指令

```dockerfile
# 从本地 GGUF 文件
FROM ./Qwen3-14B-Q6_K.gguf
```

#### PARAMETER 指令

Ollama 的 `PARAMETER` 指令用于设定模型在运行时的各种默认参数，这些参数会影响模型的生成行为和性能。

```dockerfile
# 温度参数 (0.0-2.0)，控制输出的随机性。较低的值（如 0.2）使输出更确定、专注和保守，较高的值（如 0.8-1.0）更具创造性、多样性，但可能不那么连贯。默认通常为 0.8。
PARAMETER temperature 0.7

# Top-p 采样 (0.0-1.0)，也称为核心采样 (nucleus sampling)。模型在生成下一个词元时，会从概率总和刚好达到 top_p 的最小词元集合中进行采样。例如，top_p 为 0.9 表示只考虑概率最高的、累积概率达到 90% 的那些词元。这有助于排除低概率的长尾词元，生成更合理、更集中的文本。设置为 1.0 则禁用 Top-p 采样。默认通常为 0.9。
PARAMETER top_p 0.9

# Top-k 采样 (整数 > 0)。模型在生成下一个词元时，仅从概率最高的 k 个词元中进行采样。例如，top_k 为 40 表示只考虑概率最高的 40 个词元。这可以防止模型选择过于罕见或不相关的词元。设置为 0 则禁用 Top-k 采样。默认通常为 40。
PARAMETER top_k 40

# 重复惩罚 (通常为 1.0-2.0)。用于控制模型生成重复内容的倾向。较高的值（如 1.1 或 1.2）会降低已生成词元的概率，从而减少重复。设置为 1.0 表示不进行惩罚。默认通常为 1.1。
PARAMETER repeat_penalty 1.1

# 上下文窗口大小 (整数)。定义模型在生成响应时能够“记住”或考虑的最大词元数量（包括提示和已生成的响应）。更大的上下文窗口允许模型处理更长的输入并保持更长对话的连贯性，但也会增加内存消耗和计算时间。需要根据模型本身支持的最大上下文长度进行设置。例如，Qwen3-14B 支持高达 32k (32768) 的上下文。
PARAMETER num_ctx 4096

# 停止词 (字符串)。指定一个或多个在模型生成时遇到即停止输出的词元序列。这对于控制生成长度或在特定标记处结束响应非常有用。可以多次使用 PARAMETER stop 来定义多个停止词。
PARAMETER stop "<|im_end|>"
PARAMETER stop "<|endoftext|>"
PARAMETER stop "用户："
```

**参数选择建议:**

- **`temperature`, `top_p`, `top_k`**: 这三个参数共同影响模型输出的随机性和多样性。通常不需要同时调整所有三个。
  - 对于需要创造性输出的任务（如故事生成、头脑风暴），可以尝试较高的 `temperature` (如 0.7-1.0) 和适中的 `top_p` (如 0.9)。
  - 对于需要精确、事实性输出的任务（如代码生成、问答），可以尝试较低的 `temperature` (如 0.2-0.5)，并可能结合 `top_k` 或 `top_p` 来限制选择范围。
  - Ollama 通常建议优先调整 `temperature`，如果效果不佳再尝试 `top_p`。`top_k` 的使用相对较少，但也可以作为一种补充。
- **`repeat_penalty`**: 如果发现模型输出内容重复较多，可以适当提高此值。
- **`num_ctx`**: 根据你的硬件资源和应用场景选择合适的大小。如果处理长文档或需要长对话历史，应尽可能设置大一些（不超过模型上限）。

#### TEMPLATE 指令

```dockerfile
TEMPLATE """{{ if .System }}<|im_start|>system
{{ .System }}<|im_end|>
{{ end }}{{ if .Prompt }}<|im_start|>user
{{ .Prompt }}<|im_end|>
{{ end }}<|im_start|>assistant
{{ .Response }}<|im_end|>
"""
```

#### SYSTEM 指令

```dockerfile
SYSTEM """你是一个有用的 AI 助手，名叫 Qwen。你总是用中文回答问题，回答要准确、有用且简洁。"""
```

### 4.4 实际案例：创建定制化模型

创建一个专门用于代码生成的 Qwen 模型：

```dockerfile
# Modelfile
FROM ./Qwen3-14B-Q6_K.gguf

# 优化代码生成的参数
PARAMETER temperature 0.2
PARAMETER top_p 0.95
PARAMETER repeat_penalty 1.05
PARAMETER num_ctx 8192

# 代码生成专用模板
TEMPLATE """{{ if .System }}<|im_start|>system
{{ .System }}<|im_end|>
{{ end }}{{ if .Prompt }}<|im_start|>user
{{ .Prompt }}<|im_end|>
{{ end }}<|im_start|>assistant
{{ .Response }}<|im_end|>
"""

# 代码生成专用系统提示
SYSTEM """你是一个专业的编程助手。你的任务是：
1. 生成高质量、可运行的代码
2. 提供清晰的代码注释
3. 遵循最佳编程实践
4. 优先考虑代码的可读性和可维护性
5. 如有必要，提供使用示例

请始终用中文解释代码，但代码本身使用英文编写。"""
```

创建模型：

```bash
ollama create qwen -f Modelfile
```

验证模型：

```bash
ollama run qwen "写一个Python快速排序算法"
```

## 5. 模型的运行与对话

### 5.1 基础对话

#### 启动交互式对话

```bash
ollama run qwen
```

![image](/images/blog/ollama-local-llm-tutorial/f5d8c3a6-2e7b-4f94-b8c1-6a9d2e5f8b37.gif)

### 5.2 对话控制命令

在交互模式下，可以使用以下控制命令：

| 命令                     | 功能         | 示例                   |
| ------------------------ | ------------ | ---------------------- |
| `/bye`                   | 退出对话     | `/bye`                 |
| `/clear`                 | 清除对话历史 | `/clear`               |
| `/set parameter <value>` | 设置参数     | `/set temperature 0.5` |

## 6. API 接口使用

### 6.1 Ollama API 概览

Ollama 不仅提供命令行交互，更强大的是它在后台运行一个 REST API 服务，默认监听在 http://localhost:11434，常用的 API 方法：

| 接口            | 方法   | 功能                                                                                                                                |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/api/generate` | POST   | 用于基于单个、非对话式提示生成文本补全。适合文本扩展、简单翻译、快速代码片段等任务。                                                |
| `/api/chat`     | POST   | 专为对话式交互设计。接受一个消息列表（messages），每条消息包含角色（system, user, assistant）和内容，使模型能保持多轮对话的上下文。 |
| `/api/tags`     | GET    | 获取本地 Ollama 存储中所有可用模型的列表                                                                                            |
| `/api/show`     | POST   | 获取特定本地模型的详细信息                                                                                                          |
| `/api/pull`     | POST   | 从 Ollama 模型库下载模型                                                                                                            |
| `/api/create`   | POST   | 基于提供的 Modelfile 内容创建新模型                                                                                                 |
| `/api/delete`   | DELETE | 从本地存储中删除指定模型                                                                                                            |

### 6.2 Python API 调用示例

#### 流式返回对话示例

```python
import requests
import json

def chat_with_ollama_stream(prompt, model="qwen"):
    """
    与 Ollama 模型进行流式对话
    """
    url = "http://localhost:11434/api/generate"

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": True
    }

    try:
        response = requests.post(url, json=payload, stream=True)
        response.raise_for_status()

        print("AI回复: ", end="", flush=True)

        for line in response.iter_lines():
            if line:
                data = json.loads(line.decode('utf-8'))
                if 'response' in data:
                    print(data['response'], end="", flush=True)

                # 检查是否完成
                if data.get('done', False):
                    print("\n")
                    break

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

# 使用示例
if __name__ == "__main__":
    question = "写一个计算斐波那契数列的Python函数"
    print(f"问题: {question}")
    chat_with_ollama_stream(question)
```

#### 多轮对话示例

```python
import requests
import json

class OllamaChat:
    def __init__(self, model="qwen", base_url="http://localhost:11434"):
        self.model = model
        self.base_url = base_url
        self.conversation_history = []

    def send_message(self, message, stream=True):
        """
        发送消息并返回回复
        """
        url = f"{self.base_url}/api/chat"

        # 添加用户消息到历史
        self.conversation_history.append({
            "role": "user",
            "content": message
        })

        payload = {
            "model": self.model,
            "messages": self.conversation_history,
            "stream": stream
        }

        try:
            response = requests.post(url, json=payload, stream=stream)
            response.raise_for_status()

            if stream:
                return self._handle_stream_response(response)
            else:
                result = response.json()
                assistant_message = result["message"]["content"]
                self.conversation_history.append({
                    "role": "assistant",
                    "content": assistant_message
                })
                return assistant_message

        except requests.exceptions.RequestException as e:
            return f"Error: {e}"

    def _handle_stream_response(self, response):
        """
        处理流式响应
        """
        full_response = ""
        print("AI: ", end="", flush=True)

        for line in response.iter_lines():
            if line:
                data = json.loads(line.decode('utf-8'))
                if 'message' in data and 'content' in data['message']:
                    content = data['message']['content']
                    print(content, end="", flush=True)
                    full_response += content

                if data.get('done', False):
                    print("\n")
                    break

        # 添加助手回复到历史
        self.conversation_history.append({
            "role": "assistant",
            "content": full_response
        })

        return full_response

    def clear_history(self):
        """
        清除对话历史
        """
        self.conversation_history = []

    def get_history(self):
        """
        获取对话历史
        """
        return self.conversation_history

# 使用示例
if __name__ == "__main__":
    chat = OllamaChat()

    print("开始与 AI 对话（输入 'quit' 退出，'clear' 清除历史）:")

    while True:
        user_input = input("\n你: ")

        if user_input.lower() == 'quit':
            break
        elif user_input.lower() == 'clear':
            chat.clear_history()
            print("对话历史已清除")
            continue

        chat.send_message(user_input)
```

## 7. 多维应用与生态扩展

Ollama 作为强大的本地大模型运行引擎，不仅能满足基本的对话需求，更能拓展至多样化的应用场景，并与丰富的生态工具无缝集成，构建更复杂、更智能的解决方案。

### 7.1 探索 Ollama 的应用潜力

Ollama 的本地化特性使其在多种场景下都极具价值：

- **代码生成与辅助**：使用针对编码优化的模型（如 `CodeLlama`、`DeepSeek-Coder`、`Phi-3` 等）通过 `Ollama` 在本地进行代码编写、解释和调试，提升开发效率。
- **文本摘要、翻译与数据分析**：利用大模型强大的自然语言理解能力，在本地安全地处理和分析各类文本数据，进行快速摘要、多语言翻译或信息提取。
- **创意写作与头脑风暴**：作为个人写作助手，Ollama 可以提供灵感、生成草稿、润色文字或进行头脑风暴，激发创作潜能。
- **隐私保护的研究与文档分析**：在不泄露敏感信息的前提下，对本地存储的私密文档、研究资料进行深入分析和洞察提取，确保数据安全。
- **个性化学习与知识问答**：结合特定领域的知识库，通过 Ollama 构建个性化的学习和问答系统，满足特定学习需求。

### 7.2 便捷交互：图形化界面工具

虽然 Ollama 提供了强大的命令行工具，但对于许多用户而言，图形化界面 (GUI) 能够提供更直观、便捷的交互体验。社区中优秀的 Ollama WebUI 项目：

- **[`Open WebUI`](https://github.com/open-webui/open-webui)**：功能非常全面且流行的 WebUI，支持多用户、多模型对话、RAG 功能、模型管理等，界面美观，适合日常使用和团队协作。
- **[`ollama-webui`](https://github.com/ollama-webui/ollama-webui)**：一个轻量级的 Web 前端，专注于提供简洁的多模型切换、对话历史管理和基本的模型交互功能。
- **[`Chatbox`](https://github.com/Bin-Huang/chatbox)**：一款跨平台的桌面应用，支持 Ollama 及多种其他 LLM 服务，界面简洁，注重隐私，适合快速体验和管理多个模型提供商。

这些工具通常易于安装和配置，能够让用户更专注于与模型进行高质量的互动。

### 7.3 构建高级应用：集成开发框架

对于希望将 Ollama 集成到更复杂应用程序或工作流中的开发者而言，与主流的 LLM 开发框架集成是关键。LangChain 和 LlamaIndex 是两个广泛采用的框架，它们都提供了对 Ollama 的良好支持。

#### 与 LangChain 集成

`LangChain` 是一个功能强大的框架，旨在简化 LLM 应用的开发，包括构建聊天机器人、问答系统、代理 (Agents) 等。通过 `langchain_community.llms.Ollama` 模块，可以轻松在 LangChain 应用中调用本地运行的 Ollama 模型。

**集成示例：**

```python
from langchain_community.llms import Ollama

# 初始化 Ollama LLM，指定模型
llm = Ollama(model="qwen3")

# 发起调用
prompt = "用 Python 实现一个简单的冒泡排序算法，并解释其工作原理。"
response = llm.invoke(prompt)
print(response)
```

更多用法和高级功能，请参考 [LangChain Ollama 官方文档](https://python.langchain.com/docs/integrations/llms/ollama/)。

#### 与 LlamaIndex 集成

`LlamaIndex` (前身为 GPT Index) 是一个专注于将自定义数据源连接到大型语言模型的框架，特别擅长构建基于私有数据的检索增强生成 (RAG) 应用。通过 `llama_index.llms.ollama` 模块，可以将 Ollama 作为 LLM 后端，对本地知识库进行索引和查询。

**集成示例：**

```python
from llama_index.llms.ollama import Ollama

# 初始化 Ollama LLM
llm = Ollama(model="qwen", request_timeout=120.0) # 可选：增加超时时间

# 发起调用
prompt = "简单介绍一下 LlamaIndex 的核心作用和主要应用场景。"
response = llm.complete(prompt)
print(response)
```

详细用法和构建 RAG 应用的指南，请参考 [LlamaIndex Ollama 集成文档](https://docs.llamaindex.ai/en/stable/examples/llms/Ollama/)。

---

## 8. 参考资料 / 延伸阅读

- [Ollama 官方文档](https://docs.ollama.com/)
- [Ollama GitHub 主页](https://github.com/ollama)
- [LangChain 文档](https://python.langchain.com/docs/)
- [LlamaIndex 文档](https://docs.llamaindex.ai/en/stable/)
