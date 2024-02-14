import { analytics } from '@/utils/analytics';

const Page = async () => {
  const pageview = await analytics.retrieve('pageview', '');
  return (
    <div>
      <h1>Analytics</h1>
    </div>
  );
};
export default Page;
