# API 集成文档

## 已集成的 API

### 1. Fear & Greed Index API ✅

**用途**: 获取加密货币市场情绪指数

#### Endpoints

- **GET `/api/fear-greed`** - 获取当前指数
  ```typescript
  const data = await fetchCurrentFearGreed();
  // Returns: { value: "40", value_classification: "Fear", timestamp: "..." }
  ```

- **POST `/api/fear-greed`** - 获取历史数据
  ```typescript
  const history = await fetchFearGreedHistory(30);
  // Body: { days: number }
  ```

#### 数据更新频率
- 每天更新一次
- 包含未来更新倒计时

---

### 2. Ticker API ✅

**用途**: 获取加密货币实时价格和市场数据

#### Endpoint

- **GET `/api/ticker?limit=10`** - 获取Top加密货币
  ```typescript
  const cryptos = await fetchTopCryptos(10);
  ```

#### 返回数据
```json
{
  "1": {
    "id": "1",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": "1",
    "price_usd": "43210.50",
    "percent_change_24h": "2.34",
    "percent_change_7d": "5.67",
    "market_cap_usd": "843210000000",
    "24h_volume_usd": "25000000000"
  }
}
```

#### 可用参数
- `limit`: 返回数量 (默认: 10)
- `convert`: 转换货币 (默认: USD)

#### 数据更新频率
- 每 5 分钟更新一次

---

### 3. Global Market API ✅

**用途**: 获取全球市场概览数据

#### Endpoint

- **GET `/api/global`** - 获取全球市场数据
  ```typescript
  const global = await fetchGlobalMarket();
  ```

#### 返回数据
```json
{
  "active_cryptocurrencies": 8943,
  "active_markets": 42156,
  "bitcoin_percentage_of_market_cap": 45.23,
  "total_market_cap_usd": 1850000000000,
  "total_24h_volume_usd": 75000000000
}
```

---

## 使用示例

### 在服务端组件中使用（推荐）

```typescript
// app/page.tsx
export default async function HomePage() {
  // 获取 Fear & Greed Index
  const historyData = await fetchFearGreedHistory(30);

  // 获取热门币种
  const topCryptos = await fetchTopCryptos(6);

  // 获取全球市场数据
  const globalMarket = await fetchGlobalMarket();

  return <Dashboard data={{historyData, topCryptos, globalMarket}} />;
}
```

### 在客户端组件中使用

```typescript
"use client";

import { useEffect, useState } from 'react';
import { fetchTopCryptos } from '@/lib/api';

export function CryptoList() {
  const [cryptos, setCryptos] = useState({});

  useEffect(() => {
    fetchTopCryptos(10).then(setCryptos);
  }, []);

  return <div>{/* 渲染币种列表 */}</div>;
}
```

---

## API 限制

- **速率限制**: 60 请求/分钟
- **时间窗口**: 10 分钟
- **无需 API Key**: 完全免费使用

---

## 支持的货币

### 法定货币
USD, EUR, GBP, RUB, JPY, CAD, KRW, PLN

### 加密货币
BTC, ETH, XRP, LTC, BCH

---

## 数据归属要求

根据 Alternative.me 的使用条款：
- ✅ 允许商业使用
- ⚠️ 必须注明数据来源
- ⚠️ 数据展示旁需显著标注出处
- ❌ 不得冒充或混淆服务来源

### 推荐归属文本
```
Data provided by Alternative.me
```

---

## 未来可扩展功能

1. **缓存优化** - 添加 Redis 缓存减少 API 调用
2. **数据聚合** - 结合多个 API 创建综合指标
3. **实时更新** - WebSocket 推送最新数据
4. **历史分析** - 长期趋势分析和预测
5. **自定义指标** - 基于多维度数据的自定义情绪指数

---

## 故障处理

所有 API 函数都包含错误处理和降级逻辑：

```typescript
try {
  const data = await fetchTopCryptos();
} catch (error) {
  // 降级到 mock 数据或显示错误提示
  console.error('API failed:', error);
}
```

---

## 当前集成状态

- [x] Fear & Greed Index - **已集成到首页**
- [x] Ticker API - **API 已就绪，可用于替换 Hot Coins**
- [x] Global Market API - **API 已就绪，可用于替换 Market Overview**
- [ ] 币种详情页集成
- [ ] 新闻 API 集成（如需要）

---

## 下一步

如需将 Ticker 和 Global Market API 集成到首页，可以：

1. 更新首页获取真实币种数据
2. 替换 Market Overview 的 mock 指标
3. 添加实时价格更新
4. 实现币种详情页的真实数据

需要我立即实现这些集成吗？
