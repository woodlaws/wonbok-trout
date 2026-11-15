import { Experience, Subhero, Travel } from '../sections';

export const metadata = { title: '평창 여행' };

export default function Page() {
  return <><Subhero title="평창 여행" file="stream.jpg"/><nav className="tabs"><div className="wrap tab-links"><a href="#near">양식장 근처</a><a href="#famous">평창 명소</a><a href="#food">먹거리</a><a href="#course">체험 코스</a></div></nav><Travel/><Experience home/></>;
}
