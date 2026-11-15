import { data } from '../site';
import { Experience, Subhero } from '../sections';

export const metadata = { title: '평창사랑 체험' };

export default function Page() {
  return <><Subhero title="평창사랑 체험" file="apple.jpg" text={data.experience.slogan}/><Experience/></>;
}
