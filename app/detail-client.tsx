'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export type Field = { name: string; label: string; placeholder?: string; type?: string; options?: string[]; required?: boolean };

export function InquiryForm({ fields, consent, label, kakao, openChat = false }: { fields: Field[]; consent?: string; label: string; kakao: string; openChat?: boolean }) {
  const [validated, setValidated] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(전송방식 확정 후): 상담 전송을 연결한다.
    setValidated(true);
    if (openChat) window.open(kakao, '_blank', 'noopener');
  }
  return <form className="detail-form" onSubmit={submit}>
    {fields.map(field => field.options ? <fieldset key={field.name}><legend>{field.label}</legend><div className="choice-row">{field.options.map(option => <label key={option}><input type={field.type === 'chips' ? 'checkbox' : 'radio'} name={field.name} value={option} required={field.type !== 'chips' && field.required}/><span>{option}</span></label>)}</div></fieldset> :
    <label key={field.name}>{field.label}{field.required && ' *'}{field.type === 'textarea' ? <textarea name={field.name} placeholder={field.placeholder} required={field.required} rows={4}/> : <input name={field.name} type={field.type ?? 'text'} required={field.required} placeholder={field.placeholder} pattern={field.type==='tel' ? '[0-9]{2,3}[ \\-]?[0-9]{3,4}[ \\-]?[0-9]{4}' : undefined} min={field.type==='number' ? 1 : undefined}/>}</label>)}
    {consent && <label className="detail-consent"><input type="checkbox" required/> {consent}</label>}
    <button className="btn btn-salmon" type="submit">{label}</button>
    {validated && <p role="status">온라인 접수 준비 중입니다. <a href={kakao} target="_blank" rel="noopener">카카오톡으로 문의해 주세요.</a></p>}
  </form>;
}

export function CopyAddress({ address }: { address: string }) {
  const [status, setStatus] = useState('');
  return <><button type="button" className="btn btn-line" onClick={async () => { try { await navigator.clipboard.writeText(address); setStatus('주소를 복사했습니다.'); } catch { setStatus('주소를 선택해 복사해 주세요.'); } }}>주소 복사</button><span role="status">{status}</span></>;
}
