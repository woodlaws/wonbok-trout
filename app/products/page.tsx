import { HowTo, ProductList, Subhero } from '../sections';

export const metadata = { title: '송어·액젓' };

export default function Page() {
  return <><Subhero title="송어·액젓" file="farm.jpg"/><ProductList/><HowTo/></>;
}
