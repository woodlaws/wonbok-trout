import { brand } from '../site';
import { Press, Story, Subhero } from '../sections';

export const metadata = { title: '원복송어 이야기' };

export default function Page() {
  return <><Subhero title="원복송어 이야기" file="stream2.jpg" text={brand.tagline}/><Story full/><section><div className="wrap"><h2 className="h2">언론보도</h2><Press/></div></section></>;
}
