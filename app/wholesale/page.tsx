import { links } from '../site';
import { Out, Subhero, Wholesale } from '../sections';

export const metadata = { title: '식당·납품' };

export default function Page() {
  return <><Subhero title="식당·납품" file="sorting.jpg"/><Wholesale/>
    <section id="inquiry"><div className="wrap"><h2 className="h2">납품 상담</h2>
      <p className="lead">상담은 카카오톡으로 문의해 주세요.</p>
      {/* TODO(전송방식 확정 후): 전송 서비스와 개인정보 수집 안내를 연결한다. */}
      <form className="inquiry" aria-label="납품 상담 양식" autoComplete="off">
        <div className="form-grid">{['업체명', '담당자', '연락처', '지역', '월 예상 수량'].map(label => <label key={label}>{label}<input type={label === '연락처' ? 'tel' : 'text'}/></label>)}</div>
        <fieldset><legend>품목</legend><div className="actions">{['활송어', '손질송어', '송어액젓', '기타'].map(item => <label key={item}><input type="checkbox"/> {item}</label>)}</div></fieldset>
        <label>문의 내용<textarea rows={5}/></label><label className="consent"><input type="checkbox"/> 개인정보 수집 동의</label>
      </form><Out className="btn btn-ink" href={links.kakao}>카카오톡 문의 ↗</Out>
    </div></section>
  </>;
}
