import subprocess

# 调用 Node.js 脚本，传递需要更新的 SVG 属性
svg_properties = {
    'cx': '60',
    'cy': '70',
    'r': '30',
    'fill': 'blue'
}

# 构建命令行参数
command_args = ['node', 'generate_image.js'] + [svg_properties.get(attr, '') for attr in ['cx', 'cy', 'r', 'fill']]

# 调用 Node.js 脚本并获取输出
result = subprocess.run(command_args, capture_output=True, text=True)

# 保存生成的图像到本地文件
with open('output.svg', 'w') as file:
    file.write(result.stdout)

print("Generated image saved to output.svg")
