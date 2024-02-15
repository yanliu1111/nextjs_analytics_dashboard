'use client';

import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { BarChart, Card } from '@tremor/react';

import ReactCountryFlag from 'react-country-flag';
import { analytics } from '@/utils/analytics';

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string; // toFixed(1) so there is string
  amtVisitorsToday: number;
  timeSeriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}
const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeSeriesPageviews,
  topCountries,
}: AnalyticsDashboardProps) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6'>
        <Card className='w-fiull mx-auto max-w-xs'>
          <p className='text-tremor-default text-dark-tremor-content'>
            Avg. visitors/day
          </p>
          <p className='text-3xl text-dark-tremor-content-strong font-semibold'>
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className='w-fiull mx-auto max-w-xs'>
          <p className='text-tremor-default text-dark-tremor-content'>
            Vistor Today
          </p>
          <p className='text-3xl text-dark-tremor-content-strong font-semibold'>
            {amtVisitorsToday}
          </p>
        </Card>
      </div>

      <Card className='flex flex-col sm:grid grid-cols-4 gap-6'>
        <h2 className='w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl'>
          This weeks top visitors:
        </h2>
        <div className='col-span-3 flex items-center justify-between flex-wrap gap-8'>
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div
                key={countryCode}
                className='flex items-center gap-3 text-dark-tremor-content-strong'
              >
                <p className='hidden sm:block text-tremor-content'>
                  {countryCode}
                </p>
                <ReactCountryFlag
                  className='text-5xl sm:text-3xl'
                  svg
                  countryCode={countryCode}
                />

                <p className='text-tremor-content sm:text-dark-tremor-content-strong'>
                  {number}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        {timeSeriesPageviews ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeSeriesPageviews.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            categories={['Visitors']}
            index='name'
          />
        ) : null}
      </Card>
    </div>
  );
};
export default AnalyticsDashboard;
