import { News, Subhero } from '../sections';

export const metadata = { title: '소식' };

export default function Page() {
  return <><Subhero title="소식" file="farm.jpg"/><News/></>;
}
