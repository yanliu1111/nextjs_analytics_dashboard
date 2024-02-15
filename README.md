# 📊 Simple time series Next.js Analytics Dashboard

## 📝 Description:

- Build a analytics system user tracking, time series dashboard, which can be located in any admin page for User management. This is my second data plateform dashboard, the different is I am using Nextjs and typescripts.

- In this project, I understand metadata and namespace for making the data retrieval faster.

## 🛠 Tech Stack:

- Next.js
- Node v20.10.0
- Upstash Redis
- date-fns
- @tremor/react-charts (https://www.tremor.so/) for graphing

## Structure:

- Model: responsible for fetching data from Redis, this is analytics provider.
- Controller: responsible for processing data, like ('pageviews', 2) in page.tsx
- View: responsible for rendering whatever the controller has processed, AnalyticsDashboard component.
