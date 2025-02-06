import { ElMessage } from 'element-plus'

export const $message = ElMessage

export const fctypes = [
  { label: '内置运行时', value: 'event' },
  { label: '自定义运行时', value: 'web' },
  { label: '任务函数', value: 'task' },
  { label: 'GPU函数', value: 'gpu' },
]

export const regions = [
  {
    label: '亚太-中国',
    children: [
      { label: '华东1（杭州）', value: 'cn-hangzhou' },
      { label: '华东2（上海）', value: 'cn-shanghai' },
      { label: '华北1（青岛）', value: 'cn-qingdao' },
      { label: '华北2（北京）', value: 'cn-beijing' },
      { label: '华北3（张家口）', value: 'cn-zhangjiakou' },
      { label: '华北5（呼和浩特）', value: 'cn-huhehaote' },
      { label: '华北6（乌兰察布）', value: 'cn-wulanchabu' },
      { label: '华南1（深圳）', value: 'cn-shenzhen' },
      { label: '西南1（成都）', value: 'cn-chengdu' },
      { label: '中国香港', value: 'cn-hongkong' },
    ],
  },
  {
    label: '亚太-其它',
    children: [
      { label: '日本（东京）', value: 'ap-northeast-1' },
      { label: '韩国（首尔）', value: 'ap-northeast-2' },
      { label: '新加坡（新加坡）', value: 'ap-southeast-1' },
      { label: '澳大利亚（悉尼）关停中', value: 'ap-southeast-2' },
      { label: '马来西亚（吉隆坡）', value: 'ap-southeast-3' },
      { label: '印尼（雅加达）', value: 'ap-southeast-5' },
      { label: '泰国（曼谷）', value: 'ap-southeast-7' },
      { label: '印度（孟买）关停中', value: 'ap-south-1' },
    ],
  },
  {
    label: '欧洲与美洲',
    children: [
      { label: '德国（法兰克福）', value: 'eu-central-1' },
      { label: '英国（伦敦）', value: 'eu-west-1' },
      { label: '美国（硅谷）', value: 'us-west-1' },
      { label: '美国（弗吉尼亚）', value: 'us-east-1' },
    ],
  },
]
// CPU
export const cpus = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.5, 0.75, 1, 1.5, 2, 4, 6, 8, 12, 16]
// 内存
export const memories = [
  { label: '128M', value: 128 },
  { label: '256M', value: 256 },
  { label: '512M', value: 512 },
  { label: '1G', value: 1024 },
  { label: '2G', value: 2048 },
  { label: '3G', value: 3072 },
  { label: '4G', value: 4096 },
  { label: '6G', value: 6144 },
  { label: '8G', value: 8192 },
  { label: '12G', value: 12288 },
  { label: '16G', value: 16384 },
]
// 运行时
export const runtimes = [
  {
    label: '内置运行时',
    value: 'builtin',
    children: [
      {
        label: 'Nodejs',
        value: 'nodejs',
        children: [
          { label: 'node.js 20', value: 'nodejs20' },
          { label: 'node.js 18', value: 'nodejs18' },
          { label: 'node.js 16', value: 'nodejs16' },
          { label: 'node.js 14', value: 'nodejs14' },
          { label: 'node.js 12', value: 'nodejs12' },
          { label: 'node.js 10', value: 'nodejs10' },
          { label: 'node.js 8', value: 'nodejs8' },

        ],
      },
      {
        label: 'Java',
        value: 'java',
        children: [
          { label: 'java 11', value: 'java.11' },
          { label: 'java 8', value: 'java8' },
        ],
      },
      {
        label: 'Python',
        value: 'python',
        children: [
          { label: 'python 3.12', value: 'python3.12' },
          { label: 'python 3.10', value: 'python3.10' },
          { label: 'python 3.9', value: 'python3.9' },
          { label: 'python 3.6', value: 'python3.6' },
        ],
      },
      {
        label: 'PHP',
        value: 'php',
        children: [
          { label: 'php 7.2', value: 'php7.2' },
        ],
      },
      {
        label: 'Golang',
        value: 'go',
        children: [
          { label: 'go 1', value: 'go1' },
        ],
      },
      {
        label: '.NET',
        value: 'dotnet',
        children: [
          { label: '.NET Core 3.1', value: 'dotnet3.1' },
        ],
      },
    ],
  },
  {
    label: '自定义运行时',
    value: 'custom',
    children: [
      {
        label: 'Linux',
        value: 'linux',
        children: [
          { label: 'Debian 11', value: 'debian11' },
          { label: 'Debian 10', value: 'debian10' },
          { label: 'Debian 9', value: 'debian9' },
        ],
      },
      {
        label: 'Nodejs',
        value: 'nodejs',
        children: [
          { label: 'node.js 20 Debian10', value: 'nodejs20' },
          { label: 'node.js 18 Debian10', value: 'nodejs18' },
          { label: 'node.js 17 Debian10', value: 'nodejs17' },
          { label: 'node.js 16 Debian9', value: 'nodejs16' },

        ],
      },
      {
        label: 'Java',
        value: 'java',
        children: [
          { label: 'java 21 Debian10', value: 'java.21' },
          { label: 'java 17 Debian10', value: 'java.17' },
          { label: 'java 11 Debian10', value: 'java.11' },
          { label: 'java 8 Debian9', value: 'java8' },
        ],

      },
      {
        label: 'Python',
        value: 'python',
        children: [
          { label: 'python 3.10 Debian10', value: 'python3.10' },
          { label: 'python 3.9 Debian10', value: 'python3.9' },
          { label: 'python 3.8 Debian10', value: 'python3.8' },
          { label: 'python 3.8 Debian9', value: 'python3.8' },
          { label: 'python 3.7 Debian9', value: 'python3.7' },
          { label: 'python 3.6 Debian9', value: 'python3.6' },

        ],
      },
      {
        label: 'PHP',
        value: 'php',
        children: [
          { label: 'php 8.1 Debian10', value: 'php8.1' },
          { label: 'php 8.0 Debian10', value: 'php8.0' },
          { label: 'php 8.1 Debian9', value: 'php8.1' },
          { label: 'php 7.4 Debian9', value: 'php7.4' },
        ],

      },
      {
        label: 'Golang',
        value: 'go',
        children: [
          { label: 'Go 1 Debian10', value: 'go1' },
        ],

      },
      {
        label: '.NET',
        value: 'dotnet',
        children: [
          { label: '.NET 6.0 Debian10', value: 'dotnet6.0' },
        ],
      },
    ],
  },

]
// 硬盘
export const disks = [
  { label: '512M', value: 512 },
  { label: '10G', value: 10240 },
]
// 方法
export const methodsList = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT']
// 认证方式
export const authList = [
  { label: '无需认证', value: 'anonymous' },
  { label: '签名认证', value: 'signature' },
  { label: 'JWT认证', value: 'jwt' },
]

// 默认日志
export const defaultLog = {
  enable: true,
  auto: true,
  enableInstanceMetrics: true,
  enableRequestMetrics: true,
  logBeginRule: true,
  project: '',
  logstore: '',
}

// 默认运行时
export const defaultRuntime = {
  runtime: ['builtin', 'nodejs', 'nodejs18'],
  command: 'node ./index.js',
  port: 3000,
  timeout: 10,
  code: './',
  handler: 'index.handler',
  instanceConcurrency: 1,
}

// 默认基本信息
export const defaultBasic = {
  functionType: 'event',
  functionName: '',
  region: '',
  cpu: 0.05,
  memory: 128,
  disk: 512,
  description: '',
}
// 默认网络
export const defaultNetwork = {
  enable: true,
  auto: true,
  internetAccess: true,
  securityGroupId: '',
  vpcId: '',
  vSwitchIds: [],
}
