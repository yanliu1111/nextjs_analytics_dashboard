import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { analytics } from '@/utils/analytics';
import { getDate } from '@/utils';

const Page = async () => {
  const TRACKING_DAYS = 7;
  // you can define the type of pageviews, like contact-me, purchase-product, etc.
  const pageviews = await analytics.retrieveDays('pageview', TRACKING_DAYS);
  const totalPageviews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1); //toFixed(1) so there is only 1 decimal place
  const amtVisitorsToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);
  return (
    <div className='min-h-screen w-full py-12 flex justify-center items-center'>
      <div className='relative w-full max-w-6xl mx-auto text-white'>
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          amtVisitorsToday={amtVisitorsToday}
          timeSeriesPageviews={pageviews}
        />
      </div>
    </div>
  );
};
export default Page;
