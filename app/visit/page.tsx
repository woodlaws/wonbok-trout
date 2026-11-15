import { contact, links } from '../site';
import { Out, Subhero, Visit } from '../sections';

export const metadata = { title: '오시는 길' };

export default function Page() {
  return <><Subhero title="오시는 길" file="sign.jpg"/><Visit/><section><div className="wrap"><h2 className="h2">자주 묻는 질문</h2>
    <div className="faq"><details><summary>휴무일은 언제인가요?</summary><p>{contact.closed}</p></details><details><summary>주차나 단체 이용이 가능한가요?</summary><p>{contact.amenities}</p></details><details><summary>어디로 문의하면 되나요?</summary><Out className="btn btn-line" href={links.kakao}>카카오톡 문의 ↗</Out></details></div>
  </div></section></>;
}
