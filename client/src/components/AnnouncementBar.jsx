import { getCurrentSeason, getSeasonDetails } from '../utils/season';

const AnnouncementBar = () => {
  const season = getCurrentSeason();
  const details = getSeasonDetails(season);

  return (
    <div className={`${details.bgAccent} text-white px-4 py-2 text-center text-sm font-medium tracking-wide shadow-sm`}>
      {details.greeting} | Get 10% off on first order!
    </div>
  );
};

export default AnnouncementBar;
